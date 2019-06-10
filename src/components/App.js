import React from "react";
import logo from "../assets/logo.svg";
import "../styles/App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.foods = [
      { id: 1, type: "apple", calorie: 100 },
      { id: 2, type: "banana", calorie: 50 }
    ];
    this.state = {
      text: null
    };
  }

  handleClick = () => {
    this.setState({ text: document.body.querySelector("#food-search").value });
  };

  render() {
    return (
      <div>
        <h1>Calorie Tracker</h1>
        <input
          id="food-search"
          type="text"
          placeholder="Search for food item here"
        />
        <button onClick={this.handleClick}>Search</button>
        <h2>Search results for {this.state.text ? this.state.text : "..."}</h2>
        <SearchResults list={this.foods} searchInput={this.state.text} />
      </div>
    );
  }
}

function SearchResults(props) {
  let searchResults = props.list.filter(element =>
    element.type.includes(props.searchInput)
  );

  if (!props.searchInput || searchResults.length > 0) {
    return searchResults.map(element => (
      <li key={element.id}>
        {element.type} {element.calorie}
      </li>
    ));
  } else {
    return (
      <div>
        <h3>Item not found! You can manually add your item here:</h3>
        <input id="manual-food" type="text" placeholder="Add food item here" />
        <input
          id="manual-calorie"
          type="text"
          placeholder="Add estimated calorie here"
        />
        <button>Add to Daily Log</button>
      </div>
    );
  }
}

export default App;
