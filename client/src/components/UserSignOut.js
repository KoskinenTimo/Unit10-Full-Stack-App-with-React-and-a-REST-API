import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';


/**
 * Logs user out and redirects to the front page.
 * 
 * @param {props} context values/actions from "Context.js" 
 * @returns 
 */
export default function UserSignOut ({ context }) {
  useEffect(() => {
    context.actions.signOut();
  });
  
  return (
    <Redirect to="/" />
  );
}