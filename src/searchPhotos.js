import React, {useState} from 'react';
import Unsplash, { toJson } from 'unsplash-js';
// toJson is a helper function in the unsplash-js library that is used

const unsplash = new Unsplash({accessKey: process.env.REACT_APP_UNSPLASH_API_KEY})

export default function SearchPhotos(){
  // query stores the current state of component, setQuery is called to update the state
  const [query,setQuery] = useState("");
  // console.log(query);

  // state pics will store image response we get from unsplash api

  // all the responses will be stored as object inside this state
  const [pics, setPics] = useState([]);

  const searchPhotos = async (e)=>{
    e.preventDefault();
    // console.log('submitting the form');
    unsplash.search.photos(query, 1, 50)
    .then(toJson)
    .then((json)=>{
      // console.log(json);
      setPics(json.results);
    })
  }

  return (
    // form for input value 
    <>
    <form className="form" onSubmit={searchPhotos}>
      <label className="label" htmlFor="query">
      {" "}
      📷
      </label>
      <input type="text" name="query" className="input" placeholder={`Try 'dog' or 'mountain'`} value={query} onChange={(e)=> setQuery(e.target.value)} />
      <button type="submit" className="button">Search</button>
    </form>

    {/* map through the state and display the id of the image */}
    <div className="card_list">
      {
        pics.map((pic)=>
          <div className="card" key={pic.id}>
            <img className="card_image"
            alt={pic.alt_description}
            src={pic.urls.full}
            width="50%"
            height="50%">
            </img>
          </div>)
      }
    </div>
    </>
  );
}
