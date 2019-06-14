import React from "react";
import MealSelector from "./MealSelector";
// import foodService from "../services/FoodService";
import DailyLog from "./DailyLog";
import ManualAdd from "./ManualAdd";
import round from "./Round";

class Tracker extends React.Component {
  constructor(props) {
    super(props);
    this.appId = "5aff3ca9";
    this.appKey = "c7cd298798507c71ce18987bab8ea27f";
    this.baseUrl = "https://api.edamam.com/api/food-database/parser?ingr=";
    this.defaultImage =
      "https://www.bennettig.com/wordpress/wp-content/uploads/2018/07/square-placeholder.jpg";
    this.state = {
      inputText: "",
      dailyLog: [],
      foodSearch: "",
      manFood: "",
      manCalorie: "",
      mealSelect: "Breakfast"
    };
  }

  // when clicked, updates state.text with user's search input (from handleChange) -> this gets used in search results
  handleClick = () => {
    this.setState({
      inputText: this.state.foodSearch,
      fetching: "ongoing"
    });
    this.fetchData();
  };

  // when clicked, updates state.dailyLog with element passed in
  handleAdd = element => {
    let newItem = {
      meal: this.state.mealSelect,
      type: element.label,
      calorie: element.calorie
    };
    this.setState({ dailyLog: [...this.state.dailyLog, newItem] });
  };

  // this updates state.[id] with changes to input fields
  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  // this updates state.[id] with selected meal type
  handleSelect = e => {
    this.setState({ mealSelect: e.target.value });
  };

  fetchData = async () => {
    let searchText = encodeURIComponent(this.state.foodSearch);
    let searchUrl =
      this.baseUrl +
      searchText +
      "&app_id=" +
      this.appId +
      "&app_key=" +
      this.appKey;
    try {
      const response = await fetch(searchUrl);
      console.log(response);

      if (!response.ok) {
        throw new Error("Something bad happened!");
      }
      let results = await response.json();
      this.setState({
        results: [...results.parsed, ...results.hints],
        fetching: "completed"
      });
    } catch (err) {
      this.setState({ results: [], fetching: "completed" });
    }
  };

  // searches foods list based on state.text and populates results
  // if no results, displays fields for user to manually add item to daily log
  searchResults = () => {
    let searchResults = [];

    if (this.state.results) {
      const arr = this.state.results.map(element => ({
        foodId: element.food.foodId,
        image: element.food.image ? element.food.image : this.defaultImage,
        label: element.food.label.toLowerCase(),
        calorie: round(element.food.nutrients.ENERC_KCAL),
        carbs: round(element.food.nutrients.CHOCDF, 2),
        protein: round(element.food.nutrients.PROCNT, 2),
        fat: round(element.food.nutrients.FAT, 2),
        fiber: round(element.food.nutrients.FIBTG, 2)
      }));

      const seen = new Set();

      searchResults = arr.filter(element => {
        const duplicate = seen.has(element.foodId);
        seen.add(element.foodId);
        return !duplicate;
      });
    }

    if (this.state.fetching && this.state.fetching === "ongoing") {
      return <h3>Searching for {this.state.inputText}...</h3>;
    } else if (this.state.fetching && this.state.fetching === "completed") {
      if (searchResults.length > 0) {
        return (
          <React.Fragment>
            <h3>Search results for {this.state.inputText}:</h3>
            <div className="search-results">
              {searchResults.map(element => (
                <figure key={element.foodId}>
                  <img src={element.image} alt={element.label} />
                  <p>{element.label}</p>
                  <figcaption>
                    Calorie: {element.calorie} | Carbs: {element.carbs} |
                    Protein: {element.protein} | Fat: {element.fat} | Fiber:{" "}
                    {element.fiber}
                  </figcaption>
                  <button onClick={() => this.handleAdd(element)}>+</button>
                </figure>
              ))}
            </div>
          </React.Fragment>
        );
      } else
        return (
          <h3>
            Search Results for {this.state.inputText}: Oh noes! Item not found!
          </h3>
        );
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
              : "visitor, you may want to consider adding your information and goals for better results"}
            ! Search here to find nutrition data for food and meals you've
            eaten, and add them to your daily log.
          </p>
          <br />
          <MealSelector
            mealSelect={this.state.mealSelect}
            handleSelect={this.handleSelect}
          />

          <div className="user-input">
            <label>Search for food:</label>
            <input
              id="foodSearch"
              type="text"
              placeholder="e.g. 'red apple' or 'banana'"
              onChange={this.handleChange}
            />
            <button onClick={this.handleClick}>Search</button>
          </div>
          {this.searchResults()}
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
