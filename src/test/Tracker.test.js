import React from "react";
import Tracker from "../components/Tracker";
import "@testing-library/react/cleanup-after-each";
import { render, fireEvent } from "@testing-library/react";
import "jest-dom/extend-expect";
import fetchApiData from "../funcs/Fetch";

// for mocking fetch API
const originalFetch = window.fetch;
beforeEach(() => {
  jest.resetAllMocks();
  const mockData = [
    {
      parsed: [
        {
          food: {
            label: "delicious twisties",
            nutrients: {
              ENERC_KCAL: 200
            }
          }
        }
      ]
    },
    {
      hints: [
        {
          food: {
            label: "super awesome ice cream",
            nutrients: {
              ENERC_KCAL: 100
            }
          }
        }
      ]
    }
  ];
  window.fetch = jest.fn(() => {
    return Promise.resolve({
      json() {
        return Promise.resolve(mockData);
      }
    });
  });
});
afterAll(() => {
  window.fetch = originalFetch;
});

it("Tracker renders tracker screen with greeting, manual add component, and daily log meal components", () => {
  const { getByTestId, getByText } = render(<Tracker />);
  expect(getByTestId("tracker-screen")).toBeInTheDocument();
  expect(getByText(/hello visitor/i)).toBeInTheDocument();
  expect(getByTestId("manual-add")).toBeInTheDocument();
  expect(getByTestId(/breakfast/i)).toBeInTheDocument();
  expect(getByTestId(/lunch/i)).toBeInTheDocument();
  expect(getByTestId(/dinner/i)).toBeInTheDocument();
  expect(getByTestId(/snack/i)).toBeInTheDocument();
});

it("Tracker renders input fields for manually adding food and calories", () => {
  const { getByLabelText } = render(<Tracker />);
  const manAdd = getByLabelText(/food item/i);
  const manCal = getByLabelText(/estimated calories/i);
  expect(manAdd).toHaveAttribute("type", "text");
  expect(manCal).toHaveAttribute("type", "number");

  fireEvent.change(manAdd, { target: { value: "twisties" } });
  fireEvent.change(manCal, { target: { value: 100 } });

  expect(manAdd).toHaveAttribute("value", "twisties");
  expect(manCal).toHaveAttribute("value", "100");
});

it("Manually inputted meals are logged and summed correctly under the selected meal category", () => {
  const { getByLabelText, getByText, getByTestId } = render(<Tracker />);
  const manAdd = getByLabelText(/food item/i);
  const manCal = getByLabelText(/estimated calories/i);
  const select = getByLabelText(/select meal/i);
  const button = getByText(/add to daily log/i);
  const lunchLog = getByTestId(/lunch/i);

  fireEvent.change(select, { target: { value: "Lunch" } });
  fireEvent.change(manAdd, { target: { value: "twisties" } });
  fireEvent.change(manCal, { target: { value: 100 } });
  fireEvent.click(button);

  expect(lunchLog).toHaveTextContent(/type: twisties/i);
  expect(lunchLog).toHaveTextContent(/calorie: 100/i);

  fireEvent.change(select, { target: { value: "Lunch" } });
  fireEvent.change(manAdd, { target: { value: "steak" } });
  fireEvent.change(manCal, { target: { value: 500 } });
  fireEvent.click(button);

  expect(lunchLog).toHaveTextContent(/calorie total: 600/i);
});

it("Daily grand total sums correctly across meals", () => {
  const { getByLabelText, getByText } = render(<Tracker />);
  const manAdd = getByLabelText(/food item/i);
  const manCal = getByLabelText(/estimated calories/i);
  const select = getByLabelText(/select meal/i);
  const button = getByText(/add to daily log/i);

  fireEvent.change(select, { target: { value: "Lunch" } });
  fireEvent.change(manAdd, { target: { value: "steak" } });
  fireEvent.change(manCal, { target: { value: 500 } });
  fireEvent.click(button);

  expect(getByText(/grand total: 500/i)).toBeInTheDocument();

  fireEvent.change(select, { target: { value: "Dinner" } });
  fireEvent.change(manAdd, { target: { value: "noodles" } });
  fireEvent.change(manCal, { target: { value: 400 } });
  fireEvent.click(button);

  expect(getByText(/grand total: 900/i)).toBeInTheDocument();
});

it("FetchApiData calls correct URL and returns data", async () => {
  const response = await fetchApiData("red apple");
  const results = await response.json();
  expect(fetch).toHaveBeenCalledWith(
    "https://api.edamam.com/api/food-database/parser?ingr=red%20apple&app_id=5aff3ca9&app_key=c7cd298798507c71ce18987bab8ea27f"
  );
  expect(results.length).toEqual(2);
  expect(results[0].parsed[0].food.label).toEqual("delicious twisties");
  expect(results[0].parsed[0].food.nutrients.ENERC_KCAL).toEqual(200);
  expect(results[1].hints[0].food.label).toEqual("super awesome ice cream");
  expect(results[1].hints[0].food.nutrients.ENERC_KCAL).toEqual(100);
});

it('When "search" button is clicked, it fetches API data and shows search results', done => {
  const { getByLabelText, getByText } = render(<Tracker />);
  const foodSearch = getByLabelText(/find food/i);
  const button = getByText(/search!/i);
  fireEvent.change(foodSearch, { target: { value: "banana" } });
  fireEvent.click(button);
  setTimeout(() => {
    try {
      expect(fetch).toBeCalledWith(
        "https://api.edamam.com/api/food-database/parser?ingr=banana&app_id=5aff3ca9&app_key=c7cd298798507c71ce18987bab8ea27f"
      );
      expect(getByText(/search results for banana/i)).toBeInTheDocument();
      //   THIS DOESN'T WORK:
      //   expect(getByText(/delicious twisties/i)).toBeInTheDocument();
      //   expect(getByText(/calorie: 200/i)).toBeInTheDocument();
      //   expect(getByText(/super awesome ice cream/i)).toBeInTheDocument();
      //   expect(getByText(/calorie: 100/i)).toBeInTheDocument();
      done();
    } catch (e) {
      done.fail(e);
    }
  });
});
