import axios from 'axios';
import React, { Component } from 'react';


/**
 * A Component to show confirmation page for deleting a course.
 */
export default class DeleteCourse extends Component {

  /**
   * Checks if the course exists, if not, redirects to '/notfound'. If authenticated
   * user is not the owner of the course, redirect to '/forbidden'. If there's an
   * unexpected error, redirects to '/error'.
   */
  componentDidMount() {
    const id = this.props.match.params.id;
    axios.get(`http://localhost:5000/api/courses/${id}`)
      .then(response => {
        if (response.data === null) {
          this.props.history.push('/notfound')
         
        } else if (response.data.teacher.id !== this.props.context.authUser.id) {
            this.props.history.push('/forbidden');
        }
      })
      .catch(err => {
        if (err.response.status === 500) {
          this.props.history.push('/error')
        } 
      });
  }

  /**
   * When a submit button is clicked, course delete API request is made. If succesful,
   * redirects to front page. If there's an unexpected error, redirects to '/error'.
   * @param {event} e 
   */
  submit = (e) => {
    e.preventDefault();
    const { id } = this.props.match.params;
    const { encodedCredentials } = this.props.context;
    axios.delete(`http://localhost:5000/api/courses/${id}`,
      { headers: {'Authorization': `Basic ${encodedCredentials}`} })
      .then(response => {
        if (response.status === 204) {
          this.props.history.push('/');
        }
      })
      .catch(err => {
        if (err.response.status === 500) {
          this.props.history.push('/error')
        } 
      });
  }

  /**
   * When cancel button is clicked, no changes are made and user is redirected to the
   * front page.
   * 
   * @param {event} e 
   */
  cancel = (e) => {
    e.preventDefault();
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="wrap">
        <h2>Are you sure you want to delete this course?</h2>
        <button className="button" type="submit" onClick={this.submit}>Delete</button>
        <button className="button button-secondary" onClick={this.cancel}>Cancel</button>
      </div>
    );
  }
}