import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';


const Context = React.createContext();

export class Provider extends Component {
  state = {
    authUser: Cookies.getJSON('authUser') || null,
    encodedCredentials: Cookies.getJSON('encodedCredentials') || null
  }

  signIn = async (encodedCredentials) => {
    let authUser;
    await axios.get("http://localhost:5000/api/users", { headers: {'Authorization': `Basic ${encodedCredentials}`} })
      .then(response => {
        authUser = response.data;
        this.setState({ authUser, encodedCredentials });
        const cookieOptions = { expires: 1 }
        Cookies.set('authUser', JSON.stringify(authUser),cookieOptions);
        Cookies.set('encodedCredentials', JSON.stringify(encodedCredentials),cookieOptions);
      })
      .catch(err => {        
        console.error(err);
      });
    return authUser;
    
  }

  signOut = async () => {
    this.setState(() => {
      return { authUser: null, encodedCredentials: null }
    });
    Cookies.remove('authUser');
    Cookies.remove('encodedCredentials');
  }
  
  render() {
    const { authUser,encodedCredentials } = this.state;
    const value = {
      authUser,
      encodedCredentials,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut
      }
    };

    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    )
  }
}