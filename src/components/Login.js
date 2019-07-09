import React from "react";
import { Redirect } from "react-router-dom";

function Login(props) {
  if (props.isLoggedIn) {
    return <Redirect to="/" />;
  }
  return (
    <React.Fragment>
      <div className="welcome" data-testid="welcome-screen">
        <h2>User Login:</h2>
        <br />
        {!props.failSignIn ? null : (
          <p>Failed sign-in! Please check your username and password.</p>
        )}
        {!props.successSignup ? null : <p>{props.signupMessage}</p>}
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
          />{" "}
          <button onClick={props.loginUser}>Login</button>
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

export default Login;
