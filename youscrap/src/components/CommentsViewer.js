
import axios from "axios";
import React, { useState } from 'react';
import "./CommentsViewer.css";

function CommentsViewer() {
  const [url, setUrl] = useState("");
  const [respond, setRespond] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitForm = async (e) => {
    e.preventDefault(); // stop page reload
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/scrape/', { url });
      setRespond(response.data);
     // alert("The URL has been submitted");
    } catch (error) {
      console.error(error);
    }finally{
      setLoading(false);
    }
    console.log(url);
  };

  const handleCopy = () => {
    if (!respond || !respond.comments) return;
    const text = respond.comments.map(c => `${c.likes || 0} 👍 — ${c.text}`).join("\n");
    navigator.clipboard.writeText(text);
  }

  const handleDownload = (type) =>{
    if(!respond || !respond.comments) return;
    const text = respond.comments.map(c => `${c.likes || 0} 👍 — ${c.text}`).join("\n");

    if(type === "txt"){
      const blob = new Blob([text], {type: "text/plain"});
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "comments.txt";
      link.click();
    }
  }

  return (
    <div >
      <div className="urlForm">
        <h3> Enter the YouTube video link and press Start </h3>
        <form onSubmit={submitForm}>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="paste the URL"
          />
          <button type="submit">Start</button>
        </form>
      </div>

      {
        loading &&(
          <div className="loader-container">
            <div className="loader"> </div>
            <p> Loading Comments ... </p>
          </div>
        )
      }

      <div >
        {respond && (
          <div className="CommentsViewField">
            <h2>{respond.title}</h2>

            <textarea
              value={respond.comments.map(c => `${c.likes || 0} 👍 — ${c.text}`).join("\n")}
              readOnly
              rows={15}
              style={{ width: '100%', resize: 'vertical' }}
            />

            {/* the copy button */}
            <button className= "copyButton" onClick={handleCopy}>copy comments</button>
            {/* save comments */}
            <button className="downloadButton" onClick={() => handleDownload("txt")} style={{ marginLeft: 10 }}>Download as TXT</button>
          
          </div>
        )}
      </div>
    </div>
  );
}

export default CommentsViewer;
