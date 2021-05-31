import axios from 'axios';
import React, { Component } from 'react';
import Validation from './Validation';


/**
 * A Component to display form page for creating a new course.
 */
export default class CreateCourse extends Component {
  
  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    errors: []
  }

  /**
   * If the 'Cancel' button is clicked, not course is created and user is redirected to 
   * the front page.
   * 
   * @param {event} e 
   */
  cancel = (e) => {
    e.preventDefault();
    this.props.history.push('/');
  }

  /**
   * Keeps track of all the change in form fields and updates the state values.
   * 
   * @param {event} e 
   */
  change = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    this.setState(() => {
      return {
        [name]: value
      }
    });
  }

  /**
   * When the submit button is clicked, make a API POST request. If succesful and status
   * is 201, redirects the user to given location header from the API to view the created
   * course details. If there's a validation error, displays errors above the form.
   * If there's an unpexpected error from the api, status 500, redirects to '/error'.
   * 
   * @param {event} e 
   */
  submit = (e) => {
    e.preventDefault();
    const { title, description, estimatedTime, materialsNeeded } = this.state; 
    const { encodedCredentials, authUser } = this.props.context;
    const course = { title, description, estimatedTime, materialsNeeded };
    course.userId = authUser.id;

    axios.post("http://localhost:5000/api/courses", 
    course,
    { headers: {'Authorization': `Basic ${encodedCredentials}`} })
      .then(response => {
        if(response.status === 201) {
          this.props.history.push(response.headers.location);
        }
      })
      .catch(err => {
        const errors = err.response.data;
        this.setState({ errors });
        if (err.response.status === 500) {
          this.props.history.push('/error')
        }        
      });
  }

  render() {
    const { firstName, lastName } = this.props.context.authUser;
    return (
      <main>
        <div className="wrap">
          <h2>Create Course</h2>
          <Validation errors={this.state.errors}/>

          <form onSubmit={this.submit}>
            <div className="main--flex">
              <div>
                <label htmlFor="title">Course Title</label>
                <input id="title" name="title" type="text" onChange={this.change}/>

                <p>By {`${firstName} ${lastName}`}</p>

                <label htmlFor="description">Course Description</label>
                <textarea id="description" name="description" onChange={this.change} ></textarea>
              </div>
              <div>
                <label htmlFor="estimatedTime">Estimated Time</label>
                <input id="estimatedTime" name="estimatedTime" type="text" onChange={this.change} />

                <label htmlFor="materialsNeeded">Materials Needed</label>
                <textarea id="materialsNeeded" name="materialsNeeded" onChange={this.change}></textarea>
              </div>
            </div>
            <button className="button" type="submit">Create Course</button>
            <button className="button button-secondary" onClick={this.cancel}>Cancel</button>
          </form>
        </div>
      </main>
    )
  }
}