import axios from 'axios';
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';


/**
 * A Component to view specific course details. Update and Delete buttons visible
 * to course owner only.
 */
export default class CourseDetail extends Component {

  state = {
    course: null
  };

  /**
   * Loads the course data from the API. If the course data is empty, 
   * redirects to '/notfound'. If there's an error with status 500,
   * redirects to '/error'.
   */
  componentDidMount() {
    const courseId = this.props.match.params.id;
    axios.get(`http://localhost:5000/api/courses/${courseId}`)
      .then(response => {
        const course = response.data;        
        this.setState({ course });
        if (course === null) {
          this.props.history.push('/notfound');
        }
      })
      .catch(err => {
        if (err.response.status === 500) {
          this.props.history.push('/error')
        }
      });
  }

  render() {
    if (!this.state.course) {
      return null;
    }
    const { title, estimatedTime, id } = this.state.course;
    const { firstName, lastName } = this.state.course.teacher;
    
    let authId = null;
    if (this.props.context.authUser
        && this.state.course.teacher.id === this.props.context.authUser.id) {
          authId = this.state.course.teacher.id
    }   
    
    return (
      <main>
        <div className="actions--bar">
          <div className="wrap">
            {authId ?
              <Fragment>
                <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
                <Link className="button" to={`/courses/${id}/delete`}>Delete Course</Link>
              </Fragment>
            : null}
            <Link className="button" to="/">Return to List</Link>
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
                {<ReactMarkdown children={this.state.course.description} />}
              </div>
              <div>
                <h3 className="course--detail--title">Estimated Time</h3>
                <p>{estimatedTime}</p>
                <h3 className="course--detail--title">Materials Needed</h3>
                <ul className="course--detail--list">
                  {<ReactMarkdown children={this.state.course.materialsNeeded} />}
                </ul>
              </div>
            </div>
          </form>
        </div>
      </main>
    )
  }
}