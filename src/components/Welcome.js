import React from "react";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";

function Welcome(props) {
  return (
    <React.Fragment>
      <div>
        <p>
          Welcome to My Calorie Tracker! Please share with us some of your goals
          so that we can better help you reach them!
        </p>
        <div className="user-input">
          <label>Name:</label>
          <input
            id="name"
            placeholder="name"
            type="text"
            onChange={props.handleChange}
          />
          <label>Current Weight:</label>
          <input
            id="weight"
            placeholder="current weight"
            type="text"
            onChange={props.handleChange}
          />
          <label>Weight Target:</label>
          <input
            id="weightTarget"
            placeholder="weight target"
            type="text"
            onChange={props.handleChange}
          />
          <label>Time Horizon:</label>
          <input
            id="time"
            placeholder="time in weeks"
            type="text"
            onChange={props.handleChange}
          />
          <button>
            <Link to="/tracker">Submit</Link>
          </button>
          {/* <button onClick={props.handleClick}>Submit</button> */}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Welcome;
