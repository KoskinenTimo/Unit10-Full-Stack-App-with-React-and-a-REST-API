import React from 'react';
import { Redirect, Route } from 'react-router';
import { Consumer } from './Context';

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