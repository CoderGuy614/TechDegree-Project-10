import config from "./config";
// Data component containes async functions used to send requests to the API, and handle the different responses
export default class Data {
  api(
    path,
    method = "GET",
    body = null,
    requiresAuth = false,
    credentials = null
  ) {
    const url = config.apiBaseUrl + path;

    const options = {
      method,
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }
    if (requiresAuth) {
      const encodedCredentials = btoa(
        `${credentials.emailAddress}:${credentials.password}`
      );
      options.headers["Authorization"] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
  }

  async getUser(emailAddress, password) {
    const response = await this.api(`/users`, "GET", null, true, {
      emailAddress,
      password
    });
    if (response.status === 200) {
      return response.json().then(data => data);
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }

  async createUser(user) {
    const response = await this.api("/users", "POST", user);
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

// create new courses
async createCourse(course, emailAddress, password){
const response = await this.api('/courses', 'POST', course, true, { emailAddress, password });
if (response.status === 201) {
    return response.status
} else if (response.status === 400) {
    return response.json().then(data => {
       return data.errors;
        
    });
} else {
    throw new Error();
}
}
//update courses
async updateCourse(course, emailAddress, password) {
const response = await this.api(`/courses/${course.id}`, 'PUT', course, true, { emailAddress, password });
if(response.status === 403) {
  return response.status
} else if (response.status === 204) {
    return response.status;
} else if (response.status === 400) {
    return response.json().then(data => {
        return data;
    });
} else {
    throw new Error();
}
}
//delete courses
async deleteCourse(courseId, emailAddress, password) {
const response = await this.api(`/courses/${courseId}`, 'DELETE', null, true, { emailAddress, password });
if (response.status === 403) {
  return response.status
} else if (response.status === 204) {
    return response.status
} else if (response.status === 401) {
    return response.json().then(data => data);
} else {
    throw new Error();
}
}    
}