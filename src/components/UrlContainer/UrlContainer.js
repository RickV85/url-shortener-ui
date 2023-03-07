import React, { useEffect, useState } from 'react';
import './UrlContainer.css';

const UrlContainer = ({ urls }) => {
  const [urlsDisplay, setUrlsDisplay] = useState([])

  useEffect(() => {
    if (urls.length <= 0) return;
    const urlEls = urls.map(url => {
      return (
        <div className="url" key={url.id} >
          <h3>{url.title}</h3>
          <a href={url.short_url} target="blank">{url.short_url}</a>
          <p>{url.long_url}</p>
        </div>
      )
    });
    setUrlsDisplay(urlEls)
  }, [urls])

  return (
    <section>
      { urlsDisplay.length ? urlsDisplay : <p>No urls yet! Find some to shorten!</p> }
    </section>
  )
}

export default UrlContainer;
