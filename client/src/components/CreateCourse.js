import React, { Component } from 'react';

export default class CreateCourse extends Component {
  
  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: ''
  }

  cancel = (e) => {
    e.preventDefault();
    this.props.history.push('/');
  }

  change = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    this.setState(() => {
      return {
        [name]: value
      }
    });
  }

  submit = (e) => {
    e.preventDefault();
    const { title, description, estimatedTime, materialsNeeded } = this.state;
    const course = { title, description, estimatedTime, materialsNeeded };
    console.log(course);
    this.props.history.push('/');
  }

  render() {
    return (
      <main>
        <div className="wrap">
          <h2>Create Course</h2>
          <div className="validation--errors">
            <h3>Validation Errors</h3>
              <ul>
                <li>TEST</li>
                <li>TEST</li>
              </ul>
          </div>

          <form onSubmit={this.submit}>
            <div className="main--flex">
              <div>
                <label htmlFor="title">Course Title</label>
                <input id="title" name="title" type="text" onChange={this.change}/>

                <p>By TEST TEXT</p>

                <label htmlFor="description">Course Description</label>
                <textarea id="description" name="description"></textarea>
              </div>
              <div>
                <label htmlFor="estimatedTime">Estimated Time</label>
                <input id="estimatedTime" name="estimatedTime" type="text" />

                <label htmlFor="materialsNeeded">Materials Needed</label>
                <textarea id="materialsNeeded" name="materialsNeeded"></textarea>
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