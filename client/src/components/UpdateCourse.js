import React, { Component } from 'react';
import axios from 'axios';
import Validation from './Validation';

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

  componentDidMount() {
    const id = this.props.match.params.id;
    axios.get(`http://localhost:5000/api/courses/${id}`)
      .then(response => {
        const { title, description, estimatedTime, materialsNeeded } = response.data;
        const { firstName, lastName } = response.data.teacher;
        this.setState({ title, description, estimatedTime, materialsNeeded, firstName, lastName });
      })
      .catch(err => console.error(err));
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

  cancel = (e) => {
    e.preventDefault();
    this.props.history.push('/');
  }

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
        console.log(response);
        this.props.history.push('/');
      })
      .catch(err => {
        if (err.response.status === 400 ) {
          const { errors } = err.response.data;
          this.setState({ errors });
        } else {
          console.error(err);
        }
      });
  }

  showErrors = () => {   
    if (this.state.errors.length) {
      const errors = this.state.errors.map((error, index) => <li key={index}>{error}</li>);
      return (
        <div className="validation--errors">
          <h3>Validation Errors</h3>
          <ul>
            {errors}
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