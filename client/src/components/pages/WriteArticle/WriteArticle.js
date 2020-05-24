import React, { useState } from 'react';
import './WriteArticle.css';

function WriteArticle(props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  function onChangeContent(ev) {
    setContent(ev.target.value);
  }

  function onChangeTitle(ev) {
    setTitle(ev.target.value);
  }

  function submit() {
    const formData = {
      title: title,
      text: content,
    };
    // Can also be written:
    // const formData = {title, text: content};

    fetch('/api/mongodb/blogposts/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Got this back', data);

        // Redirect to blog
        props.history.push('/blog/');
      });
  }

  return (
    <div className="WriteArticle">
      <h1>Write an article</h1>
      <input
          name="title"
          placeholder="Title"
          value={title}
          onChange={onChangeTitle}
        />
      <br />

      <textarea
          name="content"
          placeholder="Contents"
          value={content}
          onChange={onChangeContent}
        />

      <br />

      <button onClick={submit}>Add to blog</button>
    </div>
  );
}

export default WriteArticle;
