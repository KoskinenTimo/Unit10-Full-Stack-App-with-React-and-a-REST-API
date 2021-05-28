import React from 'react';

export default class Header extends React.Component {
  render () {
    return (
      <header>
        <div className="wrap header--flex">
          <h1 className="header--logo"><a href="/">Courses</a></h1>
          <nav>
            <ul className="header--signedout">
              <li><a href="/signin">Sign in</a></li>
              <li><a href="#">Sign out</a></li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}