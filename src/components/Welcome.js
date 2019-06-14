import React from "react";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";

function Welcome(props) {
  return (
    <React.Fragment>
      <div data-testid="welcome-screen">
        <p>
          Welcome to My Calorie Tracker! Please share with us some of your goals
          so that we can better help you reach them!
        </p>
        <div className="user-input">
          <label htmlFor="userName">Name:</label>
          <input
            id="userName"
            placeholder="Name"
            type="text"
            value={props.userName}
            onChange={props.handleChange}
          />
          <label htmlFor="userWeight">Current Weight:</label>
          <input
            id="userWeight"
            placeholder="Current weight in kg"
            type="number"
            value={props.userWeight}
            onChange={props.handleChange}
          />
          <label htmlFor="weightTarget">Weight Target:</label>
          <input
            id="weightTarget"
            placeholder="Weight target in kg"
            type="number"
            value={props.weightTarget}
            onChange={props.handleChange}
          />
          <label htmlFor="time">Time Horizon:</label>
          <input
            id="time"
            placeholder="Time in weeks"
            type="number"
            value={props.time}
            onChange={props.handleChange}
          />

          <Link to="/tracker">
            <button>Submit</button>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Welcome;
