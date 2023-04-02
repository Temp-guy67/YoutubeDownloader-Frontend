import React, { useState } from "react";
import "./FastApifetch.css";

function FastApifetch() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [thumb, setThumb] = useState("");
  const [embeded, setEmbeded] = useState("");
  const [video, setVideo] = useState([]);
  const [audio, setAudio] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    await fetch(("http://127.0.0.1:8000/youtubedownload?link="+name))
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error occurred while making request: ' + response.statusText);
      }
    })
    .then(data => {
      setTitle(data.title);
      setThumb(data.pic);
      setEmbeded(data.embed);
      setVideo(data.video);
      setAudio(data.audio);
      console.log("DATA RECEIVED " + title);
    })
    .catch(error => console.error(error));
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <button type="submit">Submit</button>
        <p>
          <div>
            <iframe width="640" height="360" src={embeded} frameborder="0" allowfullscreen></iframe>
          </div>
          <div className="titlePad">
            <img src={thumb} alt="NOT GENERATED HALAR PO" />
            <h3>{title}</h3>

          </div>
          <h3>Video Section</h3>
          {
            video.map((ele ,index)=>(
              <li key={index}><a href={ele} target="_blank" download>DOWNLOAD</a></li>
            ))
          }
          <h3>Audio Section</h3>
          {
            audio.map((ele ,index)=>(
              <li key={index}><a href={ele} target="_blank" download>DOWNLOAD</a></li>
            ))
          }
        </p>
      </form>
    </div>
  );
}

export default FastApifetch;
