import React, { useState } from 'react';
import { postNewUrl } from '../../apiCalls';

function UrlForm({ setUrls, urls }) {
  const [title, setTitle] = useState('')
  const [urlToShorten, setUrlToShorten] = useState('')

  const handleNameChange = e => {
    setTitle(e.target.value);
  }

  const handleUrlChange = e => {
    setUrlToShorten(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (!(title && urlToShorten)) {
      alert('Please fill out all inputs before submission')
      return;
    }
    postNewUrl({'long_url': urlToShorten, 'title': title})
    .then(response => {
      console.log(response)
      setUrls([...urls, response])
    }).catch(error => {
      alert(error)
    })
   
    clearInputs();
  }

  const clearInputs = () => {
    setTitle('');
    setUrlToShorten('');
  }


  return (
    <form>
      <input
        type='text'
        placeholder='Title...'
        name='title'
        value={title}
        onChange={e => handleNameChange(e)}
      />

      <input
        type='text'
        placeholder='URL to Shorten...'
        name='url'
        value={urlToShorten}
        onChange={e => handleUrlChange(e)}
      />

      <button onClick={e => handleSubmit(e)}>
        Shorten Please!
      </button>
    </form>
  )

}

export default UrlForm;
