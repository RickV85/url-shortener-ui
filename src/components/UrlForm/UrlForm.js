import React, { useState } from 'react';

function UrlForm() {
  const [title, setTitle] = useState('')
  const [urlToShorten, setUrlToShorten] = useState('')
  // constructor(props) {
  //   super();
  //   this.props = props;
  //   this.state = {
  //     title: '',
  //     urlToShorten: ''
  //   };
  // }

  const handleNameChange = e => {
    setTitle(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    // Nothing being submitted here yet
    clearInputs();
  }

  const clearInputs = () => {
    // setState({title: '', urlToShorten: ''});
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
        name='title'
        value={title}
        onChange={e => handleNameChange(e)}
      />

      <button onClick={e => handleSubmit(e)}>
        Shorten Please!
      </button>
    </form>
  )

}

export default UrlForm;
