import React from 'react';
import { Link } from 'react-router-dom';


/**
 * A Header component to be displayed on all pages. If user is signed in, hides Sign up and 
 * Sign in, instead shows Welcome message and Sign out.
 */
export default class Header extends React.Component {

  render () {
    const { authUser } = this.props.context;
    if (authUser === null) {
      return (      
        <header>
          <div className="wrap header--flex">
            <h1 className="header--logo"><Link to="/" replace>Courses</Link></h1>
            <nav>
              <ul className="header--signedout">
                <li><Link to="/signup">Sign Up</Link></li>
                <li><Link to="/signin">Sign In</Link></li>
              </ul>
            </nav>
          </div>
        </header>
      );
    } else {
      const firstName = authUser.firstName[0].toUpperCase() + authUser.firstName.slice(1);
      const lastName = authUser.lastName[0].toUpperCase() + authUser.lastName.slice(1);;
      return (      
        <header>
          <div className="wrap header--flex">
            <h1 className="header--logo"><Link to="/">Courses</Link></h1>
            <nav>
              <ul className="header--signedout">
                <li>{`Welcome, ${firstName} ${lastName}!`}</li>
                <li><Link to="/signout">Sign Out</Link></li>
              </ul>
            </nav>
          </div>
        </header>
      );
    }

  }
}