import React, { Component } from 'react'
import axios from "axios"
import { Redirect } from "react-router-dom";
import withContext from "../Context"
import Header from "../components/Header"
import "../styles/global.css";
//Importing the header with context to render the current user
const HeaderWithContext = withContext(Header);
// Defining and exporting the class component
export default class UpdateCourse extends Component {
    state = {
      redirect: false,
      errors: [],
      course: {
        user: {}
      }
    }
    componentDidMount() {
      axios.get(`http://localhost:5000/api/courses/${this.props.match.params.id}`).then(course => {
        if(course.data){
          this.setState({course: course.data})
        } else {
          this.setState({redirect:true})
        }
          })      
  }

    handleChange = ({target: {name, value}}) => {
    this.setState(prevState => ({
        course: { ...prevState.course, [name]: value }
    }));
  }
    
    handleClear = e => {
      e.preventDefault()
      this.setState(prevState => {
        let course = { ...prevState.course };  
        course.title = '';
        course.description = '';
        course.estimatedTime = '';
        course.materialsNeeded = '';                                    
        return { course };                                 
    })
  }

      handleCancel = e => {
        e.preventDefault();
        this.setState({title:"", description:"", materialsNeeded:"", estimatedTime:""})
        this.props.history.push("/");
    }


    handleSubmit = e => {
      e.preventDefault();
      const {context} = this.props
      const authUser = context.authenticatedUser
      const email = authUser.emailAddress
      const pw = authUser.password
      const updatedCourse  = this.state.course
      if (this.state.title === "" || this.state.description === "") {
        this.setState({ errors: "Title and Description are Required" });
      } else {
        context.data.updateCourse(updatedCourse, email, pw)
        .then(response => {
                if(response === 403){
                  this.props.history.push("/forbidden")
                } else if(response === 204) {
                console.log(`Course #${updatedCourse.id} has been succesfully updated!`);
                this.props.history.push(`/courses/${updatedCourse.id}`);
                } else {
                  this.setState({errors: response.errors})
                }
        })
        .catch(err => {
          console.log(err)
          if( err.status === 500) {
            this.props.history.push('/error')
          } else {
            this.props.history.push('/notfound')
          }
        });
      }
    };
  
    render() {
      if(this.state.redirect){
        return <Redirect to ="/notfound" />
      } else {
        return (
    <div id="root">
    <div>
      <HeaderWithContext/>
      <div className="bounds course--detail">
        <h1>Update Course</h1>
        <div>
          <div>
          { this.state.errors &&
            <h3 className="validation-errors"> { this.state.errors.map( (err,i) => {
              return <ul key={i}>
                <li> {err.msg} </li>
              </ul>
            }) } </h3> }
            </div>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div><input defaultValue={this.state.course.title} onChange={this.handleChange.bind(this)} id="title" name="title" type="text" className="input-title course--title--input"
                    ></input></div>
                <p>{this.state.course.user.firstName} {this.state.course.user.lastName}</p>
              </div>
              <div className="course--description">
                <div><textarea defaultValue={this.state.course.description} onChange={this.handleChange} id="description" name="description" className=""></textarea></div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div><input onChange={this.handleChange} id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                        defaultValue={this.state.course.estimatedTime}></input></div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div><input defaultValue={this.state.course.materialsNeeded} onChange={this.handleChange} id="materialsNeeded" name="materialsNeeded" className=""></input></div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom"><button onSubmit={this.handleSubmit} className="button" type="submit">Update Course</button>
            <button className="button button-secondary" onClick={this.handleClear}>Clear Form</button>
            <button className="button button-secondary" onClick={this.handleCancel}>Cancel</button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  
        )
    }
  }
}
