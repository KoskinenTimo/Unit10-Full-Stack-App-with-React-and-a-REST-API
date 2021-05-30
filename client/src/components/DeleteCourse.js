import axios from 'axios';
import React, { Component } from 'react';

export default class DeleteCourse extends Component {

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
        console.error(err);
      });
  }

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