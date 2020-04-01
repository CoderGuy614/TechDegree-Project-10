import React, { Component } from 'react'
import withContext from "../Context"
import Header from "../components/Header"
import "../styles/global.css";
//Importing the header with context to render the current user
const HeaderWithContext = withContext(Header);
// Defining and exporting the class component
export default class CreateCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        userId: '',
        errors: []
    }
}   
  // Functions to handle inputs to the form 
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value})
      };
    
      handleClear = e => {
          e.preventDefault();
        this.setState({title:"", description:"", materialsNeeded:"", estimatedTime:""})
      }
      handleCancel = e => {
        e.preventDefault();
        this.setState({title:"", description:"", materialsNeeded:"", estimatedTime:""})
        this.props.history.push("/");
    }
    // Sumbitting the form checks that the user is logged in and sends a post request to the API via the createCourse context function
      handleSubmit = e => {
        e.preventDefault();
        const {context} = this.props
        const authUser = context.authenticatedUser
        const email = authUser.emailAddress
        const pw = authUser.password
        const newCourse = {
          title: this.state.title,
          description: this.state.description,
          estimatedTime: this.state.estimatedTime,
          materialsNeeded: this.state.materialsNeeded,
          userId: authUser.id
        }
        // Utilize context to access the createCourse function
          context.data.createCourse(newCourse,email,pw )
          .then(response => {
            if(response === 201){
                console.log(`User ${context.authenticatedUser.emailAddress} created this course: ${newCourse}`);
                this.props.history.push('/');
            } else {
              this.setState({errors: response})
            }
            })
          .catch(err => {
            console.log(err)
            this.props.history.push('/error');
          });
        
      };
      
    render() {
      const { context } = this.props;
      const authUser = context.authenticatedUser; 
        return (
    <div id="root">
    <div>
      <HeaderWithContext/>
      <div className="bounds course--detail">
        <h1>Create Course</h1>
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
                <div><input onChange={this.handleChange} id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                    value={this.state.title}></input></div>
                <p>By {`${authUser.firstName} ${authUser.lastName}`}</p>
              </div>
              <div className="course--description">
                <div><textarea value={this.state.description} onChange={this.handleChange} id="description" name="description" className="" placeholder="Course description..."></textarea></div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div><input onChange={this.handleChange} id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                        placeholder="Hours" value={this.state.estimatedTime}></input></div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div><input value={this.state.materialsNeeded} onChange={this.handleChange} id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..."></input></div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom"><button onSubmit={this.handleSubmit} className="button" type="submit">Create Course</button>
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
