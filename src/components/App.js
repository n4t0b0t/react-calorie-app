import React from "react";
// import logo from "../assets/logo.svg";
import "../styles/App.css";
// import PropTypes from "prop-types"; // figure out where to add proptypes later!
import { MealSelector } from "./MealSelector";
import foodService from "../services/FoodService";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.inputValue = "";
    this.foods = [
      { id: 1, type: "apple", calorie: 100 },
      { id: 2, type: "banana", calorie: 50 }
    ];
    this.state = {
      text: null,
      dailyLog: [],
      foodSearch: null,
      manCalorie: null,
      value: "Breakfast"
    };
  }

  // when clicked, updates state.text with user's search input (from handleChange) -> this gets used in search results
  handleClick = () => {
    this.setState({
      text: this.state.foodSearch,
      result: foodService()
    });
  };

  // when clicked, updates state.dailyLog with element passed in
  handleAdd = element => {
    let newItem = {
      meal: this.state.value,
      type: element.type,
      calorie: Number(element.calorie)
    };
    this.setState({ dailyLog: [...this.state.dailyLog, newItem] });
  };

  // this updates state.[id] with changes to input fields
  handleChange = id => e => {
    this.setState({ [id]: e.target.value });
  };

  // this updates value in state with meal type
  handleSelect = e => {
    this.setState({ value: e.target.value });
  };

  // searches foods list based on state.text and populates results
  // if no results, displays fields for user to manually add item to daily log
  searchResults = () => {
    let searchResults = this.foods.filter(element =>
      element.type.includes(this.state.text)
    );

    if (!this.state.text || searchResults.length > 0) {
      return searchResults.map(element => (
        <li key={element.id}>
          Type: {element.type}, Calorie: {element.calorie}{" "}
          <button onClick={() => this.handleAdd(element)}>+</button>
        </li>
      ));
    } else {
      return (
        <div>
          <h3>Item not found! You can manually add your item here:</h3>
          <input
            id="manual-food"
            type="text"
            value={this.state.foodSearch}
            placeholder="Add food item here"
            onChange={this.handleChange("foodSearch")}
          />
          <input
            id="manual-calorie"
            type="text"
            placeholder="Add estimated calorie here"
            onChange={this.handleChange("manCalorie")}
          />
          <button
            onClick={() =>
              this.handleAdd({
                type: this.state.foodSearch,
                calorie: this.state.manCalorie
              })
            }
          >
            Add to Daily Log
          </button>
        </div>
      );
    }
  };

  render() {
    return (
      <React.Fragment>
        <h1>Calorie Tracker</h1>

        <MealSelector handleSelect={this.handleSelect} />

        <input
          id="food-search"
          type="text"
          placeholder="Search for food item here"
          onChange={this.handleChange("foodSearch")}
        />
        <button onClick={this.handleClick}>Search</button>
        <h2>Search results for {this.state.text ? this.state.text : "..."}</h2>
        {this.searchResults()}
        <div>
          <h1>Daily Log</h1>
          <h2>{Date()}</h2>
          <DailyLog log={this.state.dailyLog} />
        </div>
      </React.Fragment>
    );
  }
}

function DailyLog(props) {
  const mealArr = ["Breakfast", "Lunch", "Dinner", "Snack"];
  return mealArr.map(meal => (
    <MealLog
      key={Date() + meal}
      arr={props.log.filter(element => element.meal === meal)}
      meal={meal}
    />
  ));
}

function MealLog(props) {
  let mealLog = props.arr;
  let mealLogHasItems = mealLog.length > 0 ? true : false;

  return (
    <React.Fragment>
      <h1>{props.meal}</h1>
      {mealLogHasItems ? <ItemisedLog arr={mealLog} /> : <p>No Items</p>}
      <h2>
        Calorie Total:{" "}
        {mealLog.reduce((acc, curVal) => acc + curVal.calorie, 0)}
      </h2>
    </React.Fragment>
  );
}

function ItemisedLog(props) {
  let mealLog = props.arr;
  return mealLog.map((element, index) => (
    <li key={index}>
      Type: {element.type}, Calorie: {element.calorie}
    </li>
  ));
}

export default App;
