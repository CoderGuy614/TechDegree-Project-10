import React from 'react'
import { Link } from "react-router-dom";
// Stateless functional component that displays text content depending on if a user is logged in or not
export default function Header(props) {
  const { context } = props;
  const authUser = context.authenticatedUser;
    return (
        <div className="header">
        <div className="bounds">
          <h1 className="header--logo">Courses</h1>
          <nav>
  {authUser ?
    <React.Fragment>
      <span>Welcome, {authUser.firstName}!</span>
      <Link className="signout" to="/signout">Sign Out</Link>
    </React.Fragment>
  :    
    <React.Fragment>
      <Link className="signup" to="/signup">Sign Up</Link>
      <Link className="signin" to="/signin">Sign In</Link>
    </React.Fragment>
  }
</nav>
        </div>
      </div>
    )
}
