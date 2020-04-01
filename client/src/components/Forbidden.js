import React from 'react'
import withContext from "../Context"
import Header from "./Header"
const HeaderWithContext = withContext(Header);
// Stateless functional component - displayed when unauthorized user tries to delete or update courses
export default function Forbidden() {
        return (
      <div id="root">
        <div>
          <HeaderWithContext />
          <div className="bounds">
          <h1>Forbidden</h1>
          <p>Oh oh! You can't access this page.</p>
      </div>
    </div>
  </div>
        )
    }

