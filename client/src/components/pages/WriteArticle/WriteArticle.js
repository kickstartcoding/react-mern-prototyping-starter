import React, { Component } from 'react';
import './WriteArticle.css';

class WriteArticle extends Component {
  state = {
    title: '',
    text: '',
  }

  onChangeContent = (ev) => {
    this.setState({
      text: ev.target.value,
    });
  }

  onChangeTitle = (ev) => {
    this.setState({
      title: ev.target.value,
    });
  }

  submit = () => {
    const formData = {
      title: this.state.title,
      text: this.state.text,
    };

    fetch('/api/mongodb/blogposts/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Got this back', data);

        // Redirect to blog
        this.props.history.push('/blog/');
      });
  }


  render() {
    return (
      <div className="WriteArticle">
        <h1>Write an article</h1>
        <input
            name="title"
            placeholder="Title"
            value={this.state.title}
            onChange={this.onChangeTitle}
          />
        <br />

        <textarea
            name="content"
            placeholder="Contents"
            value={this.state.details}
            onChange={this.onChangeContent}
          />

        <br />

        <button onClick={this.submit}>Add to blog</button>
      </div>

    );
  }
}

export default WriteArticle;
