import React, { Component } from 'react';
import axios from 'axios';
import Validation from './Validation';


/**
 * A component to update course details.
 */
export default class UpdateCourse extends Component {
  
  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    firstName: '',
    lastName: '',
    errors: []
  }

  /**
   * Loads the course, if it doesn't exist, redirects to '/notfound'. If the authenticated
   * user is not the owner of the course, redirects to '/forbidden'. If there's an 
   * unexpected error, redirects to '/error'. If everything is ok, sets the state values 
   * with provided course details.
   */
  componentDidMount() {
    const id = this.props.match.params.id;
    axios.get(`http://localhost:5000/api/courses/${id}`)
      .then(response => {
        if (response.data === null) {
          this.props.history.push('/notfound')
         
        } else if (response.data.teacher.id !== this.props.context.authUser.id) {
            this.props.history.push('/forbidden');
        } else {           
          const { title, description, estimatedTime, materialsNeeded } = response.data;
          const { firstName, lastName } = response.data.teacher;
          this.setState({ title, description, estimatedTime, materialsNeeded, firstName, lastName });
        }
      })
      .catch(err => {
        if (err.response.status === 500) {
          this.props.history.push('/error')
        } 
      });
  }

  /**
   * Keeps track of all the changes in form fields and updates the state values.
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
   * If the cancel button is clicked, no changes to course are made and user is redirected to the
   * course details page.
   * 
   * @param {event} e 
   */
  cancel = (e) => {
    e.preventDefault();
    const id = this.props.match.params.id;
    this.props.history.push(`/courses/${id}`);
  }

  /**
   * When submit button is clicked, update call is made to the API. If succesfull, redirects to 
   * the front page. If there's an error with status 400, Validation component displays the errors
   * above the form. If there's an unexpected error with status 500, user is redirected to '/error'.
   * 
   * @param {event} e 
   */
  submit = (e) => {
    e.preventDefault();
    const id = this.props.match.params.id;
    const { encodedCredentials } = this.props.context;
    const { title, description, estimatedTime, materialsNeeded } = this.state;
    const course = { title, description, estimatedTime, materialsNeeded };

    axios.put(`http://localhost:5000/api/courses/${id}`, 
    course,
    { headers: {'Authorization': `Basic ${encodedCredentials}`} })
      .then(response => {
        if (response.status === 204) {
          this.props.history.push(`/courses/${id}`);
        }        
      })
      .catch(err => {
        if (err.response.status === 400 ) {
          const { errors } = err.response.data;
          this.setState({ errors });
        } else if (err.response.status === 500) {
          this.props.history.push('/error')
        }  
      });
  }

  render() {
    return (
      <main>
        <div className="wrap">
          <h2>Update Course</h2>
          <Validation errors={this.state.errors}/>
          <form>
            <div className="main--flex">
              <div>
                <label htmlFor="title">Course Title</label>
                <input id="title" name="title" type="text" value={this.state.title} onChange={this.change} />

                <p>By {`${this.state.firstName} ${this.state.lastName}`}</p>

                <label htmlFor="description">Course Description</label>
                <textarea id="description" name="description" value={this.state.description} onChange={this.change}></textarea>
              </div>
              <div>
                <label htmlFor="estimatedTime">Estimated Time</label>
                <input id="estimatedTime" name="estimatedTime" type="text" value={this.state.estimatedTime} onChange={this.change} />
                <label htmlFor="materialsNeeded">Materials Needed</label>
                <textarea id="materialsNeeded" name="materialsNeeded" value={this.state.materialsNeeded} onChange={this.change}></textarea>         
              </div>              
            </div>
            <button className="button" type="submit" onClick={this.submit}>Update Course</button>
            <button className="button button-secondary" onClick={this.cancel}>Cancel</button>
          </form>
          
        </div>
      </main>
    );
  }
}