import React, { Component } from 'react';
import './Blog.css';


class Blog extends Component {
  state = {
    blogPosts: [],
  }

  componentDidMount() {
    console.log('doing thing');
    fetch('/api/mongodb/blogposts/')
      .then(response => response.json())
      .then(data => {
        console.log('Got data back', data);
        this.setState({
          blogPosts: data,
        });
      });
  }

  render() {
    return (
      <div className="Blog">
        <h1>Blog</h1>
        {
          this.state.blogPosts.map((post, index) => (
            <div className="Blog-article" key={post._id}>
              <h1>{post.title}</h1>
              <p>{post.text}</p>
            </div>
          ))
        }
      </div>
    );
  }
}

export default Blog;

