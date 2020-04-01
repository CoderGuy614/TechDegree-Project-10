import React, { Component } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import "../styles/global.css";
import withContext from "../Context"
import Header from "../components/Header"

const HeaderWithContext = withContext(Header);

export default class Courses extends Component {
    state = {
        courses: []
    };
    //Load all of the courses from the api (unprotected)
    componentDidMount() {
        axios.get('http://localhost:5000/api/courses').then(res => {
            this.setState({courses:res.data})
            })      
    }
    // Map over the courses that are set in the state and display a link for each course
    render() {
        return (
            <div id="root">
            <div>
             <HeaderWithContext />
              <div className="bounds">
              {this.state.courses.map( (c,i) => {
                  return (
                    <div key={c.id} className="grid-33">
                    <Link to={`/courses/${c.id}`} className="course--module course--link">
                    <h4 className="course--label">Course</h4>
                    <h3 className="course--title">{c.title}</h3>
                    </Link> 
                    </div>                 
                  )
              })}
                <div className="grid-33"><Link className="course--module course--add--module" to="create-course">
                    <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 13 13" className="add">
                        <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                      </svg>New Course</h3>
                  </Link></div>
              </div>
            </div>
          </div>
          
        )
    }
}
