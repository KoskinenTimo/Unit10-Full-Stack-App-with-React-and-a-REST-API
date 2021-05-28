import axios from 'axios';
import React, { Component } from 'react';

export default class CourseDetail extends Component {

  state = {
    course: null
  };

  componentDidMount() {
    const courseId = this.props.match.params.courseId;
    axios.get(`http://localhost:5000/api/courses/${courseId}`)
      .then(response => {
        const course = response.data;        
        this.setState({ course });
        //console.log(this.state.course);
      })
      .catch(err => console.error(err))
  }

  renderDescription() {
    if (this.state.course.description) {
      return this.state.course.description.split(/\r?\n/).map((line, index) => <p key={index}>{line}</p>);
    }
        
  }

  renderMaterials() {
    if (this.state.course.materialsNeeded) {
      return this.state.course.materialsNeeded.split('*').map((line, index) => {
        if (index > 0) {
          return <li key={index}>{line}</li>;
        } else {
          return null;
        }
      });
    }
    
  }

  render() {
    if (!this.state.course) {
      return null;
    }
    const { title, estimatedTime } = this.state.course;
    const { firstName, lastName } = this.state.course.teacher;
    return (
      <main>
        <div className="actions--bar">
          <div className="wrap">
            <a className="button" href="#">Update Course</a>
            <a className="button" href="#">Delete Course</a>
            <a className="button" href="/">Return to List</a>
          </div>
        </div>
        <div className="wrap">
          <h2>Course Detail</h2>
          <form>
            <div className="main--flex">
              <div>
                <h3 className="course--detail--title">Course</h3>
                <h4 className="course--name">{title}</h4>
                <p>By {firstName + " " + lastName}</p>
                {this.renderDescription()}
              </div>
              <div>
                <h3 className="course--detail--title">Estimated Time</h3>
                <p>{estimatedTime}</p>
                <h3 className="course--detail--title">Materials Needed</h3>
                <ul className="course--detail--list">
                  {this.renderMaterials()}
                </ul>
              </div>
            </div>
          </form>
        </div>
      </main>
    )
  }
}