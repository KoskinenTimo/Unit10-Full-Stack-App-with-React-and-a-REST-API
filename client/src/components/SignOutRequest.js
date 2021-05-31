import React from 'react';
import { Link } from 'react-router-dom';


/**
 * A Component to display page to request Signing out when user is trying to Sign Up
 * while logged in.
 */
export default function SignOutRequest() {
  return(
    <main>
      <div className="wrap">
          <h2>Already logged in!</h2>
          <p>Please log out before Sign Up.</p>
          <p><strong><Link to="/signout">Sign Out</Link></strong></p>
      </div>
    </main>
  )
}