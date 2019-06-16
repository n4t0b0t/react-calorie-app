import React from "react";
import MealSelector from "./MealSelector";
import DailyLog from "./DailyLog";
import ManualAdd from "./ManualAdd";
import fetchApiData from "../funcs/Fetch";
import FoodSearchInput from "./FoodSearchInput";
import SearchResults from "./SearchResults";

class Tracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: "",
      dailyLog: [],
      foodSearch: "",
      manFood: "",
      manCalorie: "",
      mealSelect: "Breakfast"
    };
  }

  // when clicked, updates state with user's input and fetches data
  handleClick = () => {
    this.setState({
      inputText: this.state.foodSearch,
      fetching: "ongoing"
    });
    this.fetchData();
  };

  // when clicked, updates state with element to be added to the daily log
  handleAdd = element => {
    let newItem = {
      meal: this.state.mealSelect,
      type: element.label,
      calorie: element.calorie
    };
    this.setState({ dailyLog: [...this.state.dailyLog, newItem] });
  };

  // updates state.[id] with changes to input fields
  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  // updates state.[id] with selected meal type
  handleSelect = e => {
    this.setState({ mealSelect: e.target.value });
  };

  // fetches API data - any errors return empty array (tells user no results found)
  fetchData = async () => {
    try {
      const response = await fetchApiData(this.state.foodSearch);

      if (!response.ok) {
        throw new Error("Something bad happened!");
      }
      const results = await response.json();
      this.setState({
        results: [...results.parsed, ...results.hints],
        fetching: "completed"
      });
    } catch (err) {
      this.setState({ results: [], fetching: "completed" });
    }
  };

  render() {
    return (
      <React.Fragment>
        <main data-testid="tracker-screen">
          <p>
            Hello{" "}
            {this.props.userName
              ? this.props.userName
              : "Visitor, you may want to consider adding your information and goals for better results"}
            !
          </p>
          <h3>Search and log food here:</h3>
          <MealSelector
            mealSelect={this.state.mealSelect}
            handleSelect={this.handleSelect}
          />
          <FoodSearchInput
            handleChange={this.handleChange}
            handleClick={this.handleClick}
          />
          <SearchResults
            results={this.state.results}
            fetching={this.state.fetching}
            inputText={this.state.inputText}
            handleAdd={this.handleAdd}
          />
          <ManualAdd
            inputText={this.state.inputText}
            results={this.state.results}
            handleChange={this.handleChange}
            handleAdd={this.handleAdd}
            manFood={this.state.manFood}
            manCalorie={this.state.manCalorie}
          />
        </main>
        <div className="log">
          <h2>Today's Food Log</h2>
          <DailyLog log={this.state.dailyLog} />
        </div>
      </React.Fragment>
    );
  }
}

export default Tracker;
