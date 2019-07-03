import React from "react";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";

function Welcome(props) {
  return (
    <React.Fragment>
      <div className="welcome" data-testid="welcome-screen">
        <h2>Welcome to My Calorie Tracker!</h2>
        <p>
          Please create an account and share your goals so that we can better
          help you reach them!
        </p>
        <br />
        <div className="user-input">
          <label>Username:</label>
          <input id="userUsername" type="text" />
        </div>
        <div className="user-input">
          <label>Password:</label>
          <input id="userPassword" type="text" />
        </div>
        <div className="user-input">
          <label>Email:</label>
          <input id="userEmail" type="text" />
        </div>
        <div className="user-input">
          <label htmlFor="userName">Name:</label>
          <input
            id="userName"
            placeholder="Name"
            type="text"
            value={props.userName}
            onChange={props.handleChange}
          />{" "}
        </div>
        <div className="user-input">
          <label htmlFor="userWeight">Current Weight:</label>
          <input
            id="userWeight"
            placeholder="Current weight in kg"
            type="number"
            value={props.userWeight}
            onChange={props.handleChange}
          />{" "}
        </div>
        <div className="user-input">
          <label htmlFor="weightTarget">Weight Target:</label>
          <input
            id="weightTarget"
            placeholder="Weight target in kg"
            type="number"
            value={props.weightTarget}
            onChange={props.handleChange}
          />{" "}
        </div>
        <div className="user-input">
          <label htmlFor="time">Time Horizon:</label>
          <input
            id="time"
            placeholder="Time in weeks"
            type="number"
            value={props.time}
            onChange={props.handleChange}
          />{" "}
          <Link to="/tracker">
            <button>Submit</button>
          </Link>
        </div>
      </div>
      <div className="faq">
        <h3>What is a calorie?</h3>
        <p>
          A calorie is a unit of energy. It is the amount of energy needed to
          increase 1kg of water by 1 degree Celsius, and is equal to 4184
          Joules.
        </p>
        <h3>How do calories relate to weight?</h3>
        <p>
          Gaining or losing one kg requires creating a calorie surplus or
          deficit of approximately 7,700 calories.
        </p>
      </div>
    </React.Fragment>
  );
}

export default Welcome;
