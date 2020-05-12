import React from 'react';
import { Link } from 'react-router-dom'

import './LandingPage.css';

function LandingPage() {
  return (
    <div className="LandingPage">
      <header className="LandingPage-header">
        <p>
          Kickstart Coding - Frontend React<br />
          MERN Starter Project
        </p>
        <Link to="/blog/">Blog</Link>
        <Link to="/write/">Write article</Link>
      </header>
    </div>
  );
}

export default LandingPage;
