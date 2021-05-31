import React, { Component } from 'react';
import Validation from './Validation';


/**
 * User Sign in form component.
 */
export default class UserSignIn extends Component {

  state = {
    emailAddress: '',
    password: '',
    errors: []
  }

  /**
   * If user is already logged in, redirects to the front page.
   */
  componentDidMount() {
    if (this.props.context.authUser) {
      this.props.history.push('/');
    }
  }

  /**
   * If user clicks cancel, redirects to the front page.
   * 
   * @param {event} e 
   */
  cancel = (e) => {
    e.preventDefault();
    this.props.history.push('/');
  }

  /**
   * Keeps track of changes in the form fields and updates the state values.
   * 
   * @param {event} e 
   */
  change = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(() => {
      return {
        [name]: value
      }
    })
  }

  /**
   * When submit is clicked, signs user in and redirects the user to the previous page 
   * before sign in route. If the login credentials are wrong, displays an error above
   * the form. If there's an unexpected error, redirects to '/error'.
   * 
   * @param {event} e 
   */
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
        if (err.response.status === 500) {
          this.props.history.push('/error')
        } 
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