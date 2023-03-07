import React, { useEffect, useState } from 'react';
import './App.css';
import { getUrls } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export function App() {
  const [urls, setUrls] = useState([])

  useEffect(() => {
    getUrls()
    .then(data => {
      if (!data) return;
      setUrls(data.urls)
    }).catch(error => {
      alert(error)
    })
  }, [])



  return (
    <main className="App">
      <header>
        <h1>URL Shortener</h1>
        <UrlForm setUrls={setUrls} urls={urls}/>
      </header>

      <UrlContainer urls={urls}/>
    </main>
  );

}

export default App;
