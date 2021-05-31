import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Validation from './Validation';


export default class UserSignUp extends Component {

  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
    errors: []
  }

  componentDidMount() {
    if (this.props.context.authUser) {
      this.props.history.push('/signuperror')
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
    });
  }

  submit = (e) => {
    e.preventDefault();
    const { firstName, lastName, emailAddress, password, confirmPassword } = this.state;
    const user = { firstName, lastName, emailAddress, password, confirmPassword };
    axios.post("http://localhost:5000/api/users", user )
      .then(response => {
        if (response.status === 201) {
          console.log("Account created succesfully!");
          this.props.history.push('/')
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