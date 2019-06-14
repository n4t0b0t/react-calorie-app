import React from "react";
import Mushroom from "../assets/Mushroom.svg";
import Cake from "../assets/Cake.svg";
import Hamburger from "../assets/Hamburger.svg";
import Orange from "../assets/Orange.svg";
import "../styles/App.css";
// import PropTypes from "prop-types"; // figure out where to add proptypes later!
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import Welcome from "./Welcome";
import Tracker from "./Tracker";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      userWeight: "",
      weightTarget: "",
      time: ""
    };
  }
  handleChange = e => {
    if (e.target.type === "number") {
      this.setState({ [e.target.id]: Number(e.target.value) });
    } else {
      this.setState({ [e.target.id]: e.target.value });
    }
  };

  handleClick() {}

  render() {
    return (
      <React.Fragment>
        <nav data-testid="nav-bar">
          <li>New User</li>
          <li>Calorie Tracker</li>
        </nav>
        <div className="container">
          <header data-testid="header">
            <div className="title">
              <h1>My Calorie Tracker</h1>
              <div className="icon-grid">
                <img className="icon" src={Mushroom} alt="Mushroom" />
                <img className="icon" src={Cake} alt="Cake" />
                <img className="icon" src={Hamburger} alt="Hamburger" />
                <img className="icon" src={Orange} alt="Orange" />
              </div>
            </div>
            <h3 className="calendar">{Date().slice(0, -44)}</h3>
          </header>
          <Router>
            <Route
              path="/"
              exact={true}
              render={() => (
                <Welcome
                  userName={this.state.userName}
                  userWeight={this.state.userWeight}
                  weightTarget={this.state.weightTarget}
                  time={this.state.time}
                  handleChange={this.handleChange}
                />
              )}
            />
            <Route
              path="/tracker"
              render={() => (
                <Tracker
                  userName={this.state.userName}
                  userWeight={this.state.userWeight}
                  weightTarget={this.state.weightTarget}
                  time={this.state.time}
                />
              )}
            />
          </Router>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
