import axios from "axios";

// Contains all the methods and also we need to use the create method of axios to build a new instance
class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL: "http://localhost:4000/api",
      withCredentials: true, // indicates whether or not cross-site Access-Control requests should be made using credentials
    });
  }

  // Method to use in our SignUp component
  signup = (username, password) => {
    return this.service
      .post("/signup", { username, password })
      .then((response) => response.data);
  };

  // Method to use in our Login component
  login = (username, password) => {
    return this.service
      .post("/login", { username, password })
      .then((response) => localStorage.setItem('user', JSON.stringify(response.data))) // setting a 'user' property in localStorage
  };

  // Method to use to see if user is authenticated
  isAuthenticated = () => {
    return this.service.get("/loggedin").then((response) => response.data);
  };

  // Method to use for logging our user out
  logout = () => {
    return this.service.post("/logout", {}).then((response) => localStorage.removeItem('user'));// removing 'user' property from localStorage
  };
}

export default AuthService;
