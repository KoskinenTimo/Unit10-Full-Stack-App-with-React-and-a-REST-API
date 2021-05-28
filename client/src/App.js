import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

// Component imports
import Header from './components/Header';
import NotFound from './components/NotFound';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';

function App() {

  return (
    <Router>
        <Header />

        <Switch>
          <Route exact path="/" component={Courses} />
          <Route exact path="/courses/create" component={CreateCourse} />
          <Route path="/courses/:courseId" component={CourseDetail}/>
          <Route exact path="/signup" component={UserSignUp} />
          <Route exact path="/signin" component={UserSignIn} />
          <Route component={NotFound} />
        </Switch>
      
    </Router>
  );
}

export default App;
