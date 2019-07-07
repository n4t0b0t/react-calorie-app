import React from "react";
import Mushroom from "../assets/Mushroom.svg";
import Cake from "../assets/Cake.svg";
import Hamburger from "../assets/Hamburger.svg";
import Orange from "../assets/Orange.svg";
import "../styles/App.css";
// import PropTypes from "prop-types"; // figure out where to add proptypes later!
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Home from "./Home";
import SignUp from "./SignUp";
import Login from "./Login";
import Logout from "./Logout";
import Tracker from "./Tracker";
import axios from "axios";
import HistoryLog from "./HistoryLog";

global.apiURI =
  process.env.NODE_ENV === "production"
    ? process.env.HEROKU_API
    : "http://localhost:3001";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sucessSignup: false,
      signupMessage: "",
      isLoggedIn: false,
      failSignIn: false,
      authUser: "",
      userUsername: "",
      userPassword: "",
      userEmail: "",
      userWeight: "",
      weightTarget: "",
      time: ""
    };
  }

  componentDidMount = async () => {
    let headers = {};
    const jwt = sessionStorage.getItem("jwt");
    if (jwt) {
      headers.Authorization = "Bearer " + jwt;
      await axios
        .get(`${global.apiURI}/secure`, { headers })
        .then(res =>
          this.setState({
            jwt: jwt,
            authUser: res.data.username,
            isLoggedIn: true
          })
        )
        .catch(err => this.setState({ isLoggedIn: false }));
    }
  };

  handleChange = e => {
    if (e.target.type === "number") {
      this.setState({ [e.target.id]: Number(e.target.value) });
    } else {
      this.setState({ [e.target.id]: e.target.value });
    }
  };

  handleClick() {}

  signupUser = async () => {
    const userSignup = {
      username: this.state.userUsername,
      password: this.state.userPassword,
      email: this.state.userEmail
    };

    await axios
      .post(`${global.apiURI}/signup`, userSignup)
      .then(res =>
        this.setState({ sucessSignup: true, signupMessage: res.data })
      )
      .catch(err => this.setState({ sucessSignup: false }));
  };

  loginUser = async () => {
    const userLogin = {
      username: this.state.userUsername,
      password: this.state.userPassword
    };

    await axios
      .post(`${global.apiURI}/login`, userLogin)
      .then(res => {
        this.setState({
          failSignIn: false,
          jwt: res.data.jwt,
          authUser: res.data.username,
          isLoggedIn: true
        });
        if (res.data.jwt) {
          sessionStorage.setItem("jwt", res.data.jwt);
        }
      })
      .catch(err => {
        this.setState({ failSignIn: true, isLoggedIn: false });
      });
  };

  logoutUser = () => {
    sessionStorage.removeItem("jwt");
    this.setState({
      jwt: "",
      authUser: "",
      isLoggedIn: false
    });
  };

  render() {
    return (
      <React.Fragment>
        <Router>
          <nav data-testid="nav-bar">
            <ul>
              <li>
                <Link className="link" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="link" to="/tracker">
                  Calorie Tracker
                </Link>
              </li>
              <li>
                <Link className="link" to="/history">
                  History
                </Link>
              </li>
              {!this.state.isLoggedIn ? (
                <li>
                  <Link className="link" to="/login">
                    Login
                  </Link>
                </li>
              ) : (
                <li>
                  <Link onClick={this.logoutUser} className="link" to="/logout">
                    Logout
                  </Link>
                </li>
              )}
            </ul>
          </nav>
          <div className="container">
            <header data-testid="header">
              <h2 className="day-count">{null}</h2>
              <div className="title">
                <h1>My Calorie Tracker</h1>
                <div className="icon-grid">
                  <img className="icon" src={Mushroom} alt="Mushroom" />
                  <img className="icon" src={Cake} alt="Cake" />
                  <img className="icon" src={Hamburger} alt="Hamburger" />
                  <img className="icon" src={Orange} alt="Orange" />
                </div>
              </div>
              <h2 className="calendar">{new Date().toLocaleDateString()}</h2>
            </header>
            <Route
              path="/"
              exact={true}
              render={() => (
                <React.Fragment>
                  <Home
                    isLoggedIn={this.state.isLoggedIn}
                    authUser={this.state.authUser}
                  />
                </React.Fragment>
              )}
            />
            <Route
              path="/signup"
              render={() => (
                <SignUp
                  successSignup={this.state.sucessSignup}
                  isLoggedIn={this.state.isLoggedIn}
                  userUsername={this.state.userUsername}
                  userPassword={this.state.userPassword}
                  userEmail={this.state.userEmail}
                  userWeight={this.state.userWeight}
                  weightTarget={this.state.weightTarget}
                  time={this.state.time}
                  handleChange={this.handleChange}
                  signupUser={this.signupUser}
                />
              )}
            />
            <Route
              path="/login"
              render={() => (
                <Login
                  successSignup={this.state.sucessSignup}
                  signupMessage={this.state.signupMessage}
                  failSignIn={this.state.failSignIn}
                  isLoggedIn={this.state.isLoggedIn}
                  userUsername={this.state.userUsername}
                  userPassword={this.state.userPassword}
                  handleChange={this.handleChange}
                  loginUser={this.loginUser}
                />
              )}
            />
            <Route
              path="/logout"
              render={() => <Logout logoutUser={this.logoutUser} />}
            />
            <Route
              path="/tracker"
              render={() => (
                <Tracker
                  jwt={this.state.jwt}
                  isLoggedIn={this.state.isLoggedIn}
                  authUser={this.state.authUser}
                  userWeight={this.state.userWeight}
                  weightTarget={this.state.weightTarget}
                  time={this.state.time}
                />
              )}
            />
            <Route
              path="/history"
              render={() => (
                <HistoryLog
                  jwt={this.state.jwt}
                  isLoggedIn={this.state.isLoggedIn}
                  authUser={this.state.authUser}
                  userWeight={this.state.userWeight}
                  weightTarget={this.state.weightTarget}
                  time={this.state.time}
                />
              )}
            />
          </div>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
