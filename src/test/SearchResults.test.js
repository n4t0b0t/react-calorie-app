import React from "react";
import Tracker from "../components/Tracker";
import "@testing-library/react/cleanup-after-each";
import { render, fireEvent } from "@testing-library/react";
import "jest-dom/extend-expect";
import SearchResults from "../components/SearchResults";

jest.mock("../components/SearchResults");

it.skip("Search results can be added to daily log", () => {
  SearchResults.mockImplementation(props => {
    return (
      <div>
        <li>
          Durian<button onClick={props.handleAdd}>+</button>
        </li>
      </div>
    );
  });
  const { getByText, getByTestId, debug } = render(<Tracker />);
  const button = getByText("+");
  const lunchLog = getByTestId(/lunch/i);
  fireEvent.click(button);
  debug();
  expect(lunchLog).toHaveTextContent(/durian/i);
});
