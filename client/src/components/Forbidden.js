import React from 'react';


/**
 * A Component to display page when user is forbidden to view a route.
 */
export default function Forbidden(props) {
  return (
    <main>
      <div className="wrap">
          <h2>Forbidden</h2>
          <p>Oh oh! You can't access this page.</p>
      </div>
    </main>
  );  
}