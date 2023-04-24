import React, { useState } from "react";
import "./FastApifetch.css";
// import fetchUrl from "../Unknown/Proxy";

function FastApifetch() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [thumb, setThumb] = useState("");
  const [embeded, setEmbeded] = useState("");
  const [video, setVideo] = useState([]);
  const [audio, setAudio] = useState([]);
  const [show, setShow] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = "http://127.0.0.1:8000/youtubedownload?link=";

    // eslint-disable-next-line
    const liveUrl = "https://api_test-1-g2392944.deta.app/youtubedownload?link=";

    try {

      await fetch((url +name),{mode : 'no-cors'})
      .then(response => {
        console.log(" RESPONSE : " + JSON.stringify(response))
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
        setShow(true);
      })
    }
    catch(error)
    {
      console.error(error)
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div className="container">
      <div className="intro_part" >
        <h1>BEGINS</h1>
      </div>
      <div className="setup" >
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" value={name} onChange={handleNameChange} />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className={show ? "result" : "noResult"}   >
        <div>
          <div className="titlePad">
            <img src={thumb} alt="NOT GENERATED HALAR PO" />
            <h2>{title}</h2>
          </div>
          <div>
            <iframe width="640" height="360" src={embeded} title={title} frameBorder="0" allowFullScreen></iframe>
          </div>

          <h3>Video Section</h3>
          {
            video.map((ele ,index)=>(
              <div className="videoTab" key={index} >
                <li>{ele.resuloution}</li>
                <li>{ele.fps}</li>
                <li>{ele.filesize_mb}</li>
                <li ><a href={ele} target="_blank" rel="noreferrer" download>DOWNLOAD</a></li>
              </div>

            ))
          }
          <h3>Audio Section</h3>
          {
            audio.map((ele ,index)=>(
              <div className="videoTab" key={index} >
                <li>{ele.abr}</li>
                <li>{ele.filesize_mb}</li>
                <li ><a href={ele} target="_blank" rel="noreferrer" download>DOWNLOAD</a></li>
              </div>
            ))
          }
        </div>

      </div>
    </div>
  );
}

export default FastApifetch;
