import React, { useEffect, useState } from 'react';
import './App.css';
import { getUrls } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export function App() {
  const [urls, setUrls] = useState([])
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     urls: []
  //   }
  // }

  useEffect(() => {

    getUrls()
    .then(data => {
      console.log(data.urls)
      setUrls(data.urls)
    }).catch(error => {
      alert(error)
    })
  }, [])



  return (
    <main className="App">
      <header>
        <h1>URL Shortener</h1>
        <UrlForm />
      </header>

      <UrlContainer urls={urls}/>
    </main>
  );

}

export default App;
