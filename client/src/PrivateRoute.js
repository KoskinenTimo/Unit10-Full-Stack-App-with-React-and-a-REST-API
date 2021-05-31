import React from 'react';
import { Redirect, Route } from 'react-router';
import { Consumer } from './Context';

/**
 * Wraps a component in Private Route to check if user is logged in
 * when trying to render a specific route
 * 
 * @param {Component} Component to be wrapped
 * @param {...rest} props to be included
 * @returns 
 */
export default function PrivateRoute ({ component: Component, ...rest }) {
  return(
    <Consumer>
      {context => (
        <Route 
          {...rest}
          render={({ location, ...routeProps}) => context.authUser ? (
            <Component {...routeProps} />
          ) : (
            <Redirect to={{
              pathname: "/signin",
              state: { from: location }
              }}
            />
          )}
        />
      )}
    </Consumer>
 
  );
}