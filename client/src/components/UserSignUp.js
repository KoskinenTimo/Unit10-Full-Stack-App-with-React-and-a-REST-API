import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Validation from './Validation';


/**
 * User sign up form component
 */
export default class UserSignUp extends Component {

  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
    errors: []
  }

  /**
   * If user is already signed in, asks to log out before Sign up.
   */
  componentDidMount() {
    if (this.props.context.authUser) {
      this.props.history.push('/signuperror')
    }
  }

  /**
   * Redirects user to front page if cancel is clicked.
   * 
   * @param {event} e 
   */
  cancel = (e) => {
    e.preventDefault();
    this.props.history.push('/');
  }

  /**
   * Keeps track of all form changes and updates the state values.
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
    });
  }

  /**
   * Submits the form details when submit button is clicked. If succesful, redirects 
   * to front page. If validation fails, displays the validation errors, if unexpected
   * error, redirects to specific error page.
   * 
   * @param {event} e 
   */
  submit = (e) => {
    e.preventDefault();
    const { firstName, lastName, emailAddress, password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      const errors = ["Password and confirm password did not match."];
      this.setState({ errors });
    } else {      
      const user = { firstName, lastName, emailAddress, password, confirmPassword };
      axios.post("http://localhost:5000/api/users", user )
        .then(response => {
          if (response.status === 201) {
            console.log("Account created succesfully!");
            const authUser = this.props.context.actions.signIn(emailAddress,password);
            if (authUser) {
              this.props.history.push('/');
            } else {
              this.props.history.push('/error');
            }
            

          }      
        })
        .catch(err => {
          if (err.response.status === 400 ) {
            const errors = err.response.data;
            this.setState({ errors });
          } else if (err.response.status === 500) {
            this.props.history.push('/error')
          }         
        });
    }
  }

  render() {
    return (
      <main>
        <div className="form--centered">
          <h2>Sign up</h2>
          <Validation errors={this.state.errors} />
          <form onSubmit={this.submit}>
            <label htmlFor="firstName">First Name</label>
            <input id="firstName" name="firstName" type="text" onChange={this.change} />
            <label htmlFor="lastName">Last Name</label>
            <input id="lastName" name="lastName" type="text" onChange={this.change} />
            <label htmlFor="emailAddress">Email Address</label>
            <input id="emailAddress" name="emailAddress" type="email" onChange={this.change} />
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" onChange={this.change} />
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input id="confirmPassword" name="confirmPassword" type="password" onChange={this.change} />
            <button className="button" type="submit">Sign Up</button>
            <button className="button button-secondary" onClick={this.cancel}>Cancel</button>
          </form>
          <p>Already have a user account? Click here <Link to="/signin">Sign in</Link>!</p>
        </div>
      </main>
    );
  }
}