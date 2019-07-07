import React from "react";
import { Redirect } from "react-router-dom";

function Home(props) {
  if (!props.isLoggedIn) {
    return <Redirect to="/signup" />;
  }
  return (
    <main>
      <h2>Welcome, {props.authUser}!</h2>
      <p>
        Head over to Calorie Tracker to start tracking your food and make
        strides towards your goals now!
      </p>
    </main>
  );
}

export default Home;
