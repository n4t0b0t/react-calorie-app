import React from "react";
import ReactDOM from "react-dom";
import App from "../components/App";
import "@testing-library/react/cleanup-after-each";
import { render, fireEvent } from "@testing-library/react";
import { createMemoryHistory } from "history";
import "jest-dom/extend-expect";
import { Router } from "react-router-dom";

it("App renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("App renders nav-bar, header and welcome-screen", () => {
  const { getByTestId } = render(<App />);
  expect(getByTestId("nav-bar")).toBeInTheDocument();
  expect(getByTestId("header")).toBeInTheDocument();
  expect(getByTestId("welcome-screen")).toBeInTheDocument();
});

it("App renders Welcome screen with user profile input fields", () => {
  const { getByLabelText } = render(<App />);
  const userName = getByLabelText(/name/i);
  const userWeight = getByLabelText(/current weight/i);
  const weightTarget = getByLabelText(/weight target/i);
  const time = getByLabelText(/time horizon/i);

  fireEvent.change(userName, { target: { value: "Abel" } });
  fireEvent.change(userWeight, { target: { value: 70 } });
  fireEvent.change(weightTarget, { target: { value: 60 } });
  fireEvent.change(time, { target: { value: 12 } });

  expect(userName).toHaveAttribute("type", "text");
  expect(userName).toHaveAttribute("value", "Abel");
  expect(userWeight).toHaveAttribute("type", "number");
  expect(userWeight).toHaveAttribute("value", "70");
  expect(weightTarget).toHaveAttribute("type", "number");
  expect(weightTarget).toHaveAttribute("value", "60");
  expect(time).toHaveAttribute("type", "number");
  expect(time).toHaveAttribute("value", "12");
});

it("App renders Welcome and Tracker and I can navigate to Tracker from Welcome upon clicking submit button", () => {
  const history = createMemoryHistory({
    initialEntries: ["/"]
  });
  const { getByTestId, queryByTestId, getByText } = render(
    <Router history={history}>
      <App />
    </Router>
  );
  const button = getByText(/submit/i);

  expect(getByTestId("welcome-screen")).toBeInTheDocument();
  expect(queryByTestId("tracker-screen")).not.toBeInTheDocument();

  fireEvent.click(button);

  expect(queryByTestId("welcome-screen")).not.toBeInTheDocument();
  expect(getByTestId("tracker-screen")).toBeInTheDocument();
});
