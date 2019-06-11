import React from "react";
import logo from "../assets/logo.svg";
import "../styles/App.css";
import PropTypes from "prop-types"; // figure out where to add proptypes later!

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
      text: this.state.foodSearch
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

        <label>
          Select Meal:
          <select defaultValue="Breakfast" onChange={this.handleSelect}>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snack">Snack</option>
          </select>
        </label>

        <input
          id="food-search"
          type="text"
          placeholder="Search for food item here"
          onChange={this.handleChange("foodSearch")}
        />
        <button onClick={this.handleClick}>Search</button>
        <h2>Search results for {this.state.text ? this.state.text : "..."}</h2>
        <ul>{this.searchResults()}</ul>
        <div>
          <h1>Daily Log</h1>
          <h2>{Date()}</h2>
          <ul>
            <AddtoLog log={this.state.dailyLog} />
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

// creates daily log output based on state.dailyLog
function AddtoLog(props) {
  let currentLog = props.log;
  if (currentLog.length > 0) {
    return (
      <div>
        {currentLog.map((element, index) => (
          <li key={index}>
            Meal: {element.meal}, Type: {element.type}, Calorie:{" "}
            {element.calorie}
          </li>
        ))}
        <h1>
          Calorie Total:
          {currentLog.reduce((acc, curVal) => acc + curVal.calorie, 0)}
        </h1>
      </div>
    );
  } else return <h3>No items</h3>;
}
export default App;
