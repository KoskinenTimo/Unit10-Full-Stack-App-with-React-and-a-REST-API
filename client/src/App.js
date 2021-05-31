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
import UpdateCourse from './components/UpdateCourse';
import UserSignOut from './components/UserSignOut';
import DeleteCourse from './components/DeleteCourse'
import UnhandledError from './components/UnhandledError';
import Forbidden from './components/Forbidden';
import SignOutRequest from './components/SignOutRequest';

// Private Route wrapper
import PrivateRoute from './PrivateRoute';

// Context and wrapping with context
import withContext from './Context';

const UserSignOutWithContext = withContext(UserSignOut);
const UserSignInWithContext = withContext(UserSignIn);
const HeaderWithContext = withContext(Header);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse)
const UpdateCourseWithContext = withContext(UpdateCourse);
const DeleteCourseWithContext = withContext(DeleteCourse);
const UserSignUpWithContext = withContext(UserSignUp);


/**
 * Hold all only the Router Routes and controll context sharing.
 */
function App() {
  return (
    <Router>
        <Route component={HeaderWithContext} />

        <Switch>
          <Route exact path="/" component={Courses} />
          <PrivateRoute path="/courses/create" component={CreateCourseWithContext} />
          <Route exact path="/courses/:id" component={CourseDetailWithContext}/>
          <PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext} />
          <PrivateRoute path="/courses/:id/delete" component={DeleteCourseWithContext} />
          <Route exact path="/signup" component={UserSignUpWithContext} />
          <Route path="/signuperror" component={SignOutRequest} />
          <Route path="/signin" component={UserSignInWithContext} />
          <Route path="/signout" component={UserSignOutWithContext} />
          <Route path="/forbidden" component={Forbidden} />
          <Route path="/error" component={UnhandledError} />
          <Route component={NotFound} />
        </Switch>
      
    </Router>
  );
}

export default App;
