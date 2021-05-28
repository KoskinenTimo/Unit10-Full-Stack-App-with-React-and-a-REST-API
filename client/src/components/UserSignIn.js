import axios from 'axios';
import React, { Component } from 'react';

export default class UserSignIn extends Component {

  state = {
    emailAddress: '',
    password: '',
    error: null
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
    const encodedCredentials = btoa(`${emailAddress}:${password}`)
    
    axios.get("http://localhost:5000/api/users", { headers: {'Authorization': `Basic ${encodedCredentials}`} })
      .then(response => {
        console.log(response.data);
      })
      .catch(err => {
        const error = err.response.data.message;
        this.setState({ error });
        console.error(err.response.data);
      });
  }

  showErrors = () => {
    if (this.state.error) {      
      return (
        <div className="validation--errors">
          <h3>Validation Errors</h3>
          <ul>
              <li>{this.state.error}</li>
          </ul>
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <main>
        <div className="form--centered" >
          <h2>Sign In</h2>
          {this.showErrors()}
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