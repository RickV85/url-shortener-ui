import React, { useEffect, useState } from 'react';
import './App.css';
import { getUrls } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export function App() {
  const [urls, setUrls] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    getUrls()
    .then(data => {
      if (!data) return;
      setUrls(data.urls)
      setError('')
    }).catch(error => {
      setError(`${error}`)
    })
  }, [])


  return (
    <main className="App">
      <header>
        <h1>URL Shortener</h1>
        <UrlForm setUrls={setUrls} urls={urls} setError={setError}/>
      </header>
      {<p name='error' >{error}</p>}
      <UrlContainer urls={urls}/>
    </main>
  );

}

export default App;
