import React, { Component } from 'react';
import Validation from './Validation';


export default class UserSignIn extends Component {

  state = {
    emailAddress: '',
    password: '',
    errors: []
  }

  componentDidMount() {
    if (this.props.context.authUser) {
      this.props.history.push('/');
    }
  }

  cancel = (e) => {
    e.preventDefault();
    this.props.history.push('/');
  }

  change = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(() => {
      return {
        [name]: value
      }
    })
  }

  submit = (e) => {
    e.preventDefault();
    const { emailAddress, password } = this.state;
    const { from } = this.props.location.state || { from: { pathname: '/'} };
    const encodedCredentials = btoa(`${emailAddress}:${password}`);

    this.props.context.actions.signIn(encodedCredentials)
      .then(user => {
        
        if (user) {
          this.props.history.push(from);
        } else {
          const errors = ['Sign in was unsuccesful!'];
          this.setState({ errors });
        }
      })
      .catch(err => {
        console.error(err);
        console.log("test");
        this.props.history.push('/error')
      })
    
  }

  render() {
    return (
      <main>
        <div className="form--centered" >
          <h2>Sign In</h2>
          <Validation errors={this.state.errors} />
          <form onSubmit={this.submit} >
            <label htmlFor="emailAddress" >Email Address</label>
            <input id="emailAddress" name="emailAddress" type="email" onChange={this.change} />
            <label htmlFor="password" >Password</label>
            <input id="password" name="password" type="password" onChange={this.change} />
            <button className="button" type="submit" >Sign In</button>
            <button className="button button-secondary" onClick={this.cancel} >Cancel</button>
          </form>
        </div>
      </main>
    );
  }
}