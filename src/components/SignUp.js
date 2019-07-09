import React from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

function SignUp(props) {
  if (props.isLoggedIn) {
    return <Redirect to="/" />;
  }
  if (props.successSignup) {
    return <Redirect to="/login" />;
  }
  return (
    <React.Fragment>
      <div className="welcome" data-testid="welcome-screen">
        <h2>Welcome, new user!</h2>
        <p>
          Please create an account and share your goals so that we can better
          help you reach them!
        </p>
        <p>
          Existing User? <Link to="/login">Login</Link>
        </p>
        <br />
        <div className="user-input">
          <label htmlFor="userUsername">Username:</label>
          <input
            id="userUsername"
            placeholder="Username"
            type="text"
            value={props.userUsername}
            onChange={props.handleChange}
          />
        </div>
        <div className="user-input">
          <label htmlFor="userPassword">Password:</label>
          <input
            id="userPassword"
            placeholder="Password"
            type="text"
            value={props.userPassword}
            onChange={props.handleChange}
          />
        </div>
        <div className="user-input">
          <label htmlFor="userEmail">Email:</label>
          <input
            id="userEmail"
            placeholder="Email"
            type="text"
            value={props.userEmail}
            onChange={props.handleChange}
          />
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
          <button onClick={props.signupUser}>Submit</button>
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

export default SignUp;
