import React, { Component } from 'react';
import axios from 'axios';

export default class Courses extends Component {

  state = {
    courses: []
  }

  componentDidMount() {
    axios.get("http://localhost:5000/api/courses")
      .then(response => {
        const courses = response.data;
        this.setState({ courses });
      })
      .catch(err => console.error(err))
  }

  renderCourses() {
    return this.state.courses.map(course =>
      <a className="course--module course--link" href={`/courses/${course.id}`} key={course.id}>
        <h2 className="course--label">Course</h2>
        <h3 className="course--title">{course.title}</h3>
      </a>
      )
  }
  
  render() {
    return(
      <div className="wrap main--grid">
        {this.renderCourses()}
        <a className="course--module course--add--module" href="/courses/create">
          <span className="course--add--title">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
            New Course
          </span>
        </a>
      </div>
    )
  }
}