import React from "react";
import logo from "../assets/logo.svg";
import "../styles/App.css";
import PropTypes from "prop-types"; // figure out where to add proptypes!

class App extends React.Component {
  constructor(props) {
    super(props);
    this.foods = [
      { id: 1, type: "apple", calorie: 100 },
      { id: 2, type: "banana", calorie: 50 }
    ];
    this.state = {
      text: null,
      dailyLog: []
    };
  }

  // when clicked, updates text state with search input
  handleClick = () => {
    this.setState({ text: document.body.querySelector("#food-search").value });
  };

  // searches foods list for input and populates results
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
            placeholder="Add food item here"
          />
          <input
            id="manual-calorie"
            type="text"
            placeholder="Add estimated calorie here"
          />
          <button onClick={this.handleManualAdd}>Add to Daily Log</button>
        </div>
      );
    }
  };

  // when clicked, updates daily log state with element passed in
  handleAdd = element => {
    let newItem = {
      type: element.type,
      calorie: Number(element.calorie)
    };
    this.setState({ dailyLog: [...this.state.dailyLog, newItem] });
  };

  // when clicked, prepares element with manual input fields
  handleManualAdd = () => {
    let element = {
      type: document.body.querySelector("#manual-food").value,
      calorie: document.body.querySelector("#manual-calorie").value
    };
    this.handleAdd(element);
  };

  addToLog = () => {
    let currentLog = this.state.dailyLog;
    console.log("Log:", currentLog);
    if (currentLog.length > 0) {
      return (
        <div>
          {currentLog.map((element, index) => (
            <li key={index}>
              Type: {element.type}, Calorie: {element.calorie}
            </li>
          ))}
          <h1>
            Calorie Total:
            {currentLog.reduce((acc, curVal) => acc + curVal.calorie, 0)}
          </h1>
        </div>
      );
    } else return <h3>No items</h3>;
  };

  render() {
    return (
      <React.Fragment>
        <h1>Calorie Tracker</h1>
        <input
          id="food-search"
          type="text"
          placeholder="Search for food item here"
        />
        <button onClick={this.handleClick}>Search</button>
        <h2>Search results for {this.state.text ? this.state.text : "..."}</h2>
        <ul>{this.searchResults()}</ul>
        <div>
          <h1>Daily Log</h1>
          <h2>{Date()}</h2>
          <ul>{this.addToLog()}</ul>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
