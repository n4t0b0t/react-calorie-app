import React from "react";
import MealSelector from "./MealSelector";
import DailyLog from "./DailyLog";
import ManualAdd from "./ManualAdd";
import fetchApiData from "../funcs/Fetch";
import FoodSearchInput from "./FoodSearchInput";
import SearchResults from "./SearchResults";
import axios from "axios";

class Tracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: "",
      dailyLog: [],
      foodSearch: "",
      manFood: "",
      manCalorie: "",
      mealSelect: "Breakfast",
      editField: "",
      logDate: new Date(new Date().setHours(0, 0, 0, 0))
        .toISOString()
        .slice(0, 10)
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
  handleAdd = async element => {
    let newItem = {
      meal: this.state.mealSelect,
      item: element.label,
      calories: element.calories
    };
    // this.setState({ dailyLog: [...this.state.dailyLog, newItem] });
    await axios
      .post(
        `${global.apiURI}/users/${this.props.authUser}/foodlog/${
          this.state.logDate
        }`,
        newItem,
        {
          headers: { Authorization: "Bearer " + this.props.jwt }
        }
      )
      .then(res => this.setState({ dailyLog: res.data }))
      .catch(err => console.log(err));
  };

  // updates state.[id] with changes to input fields
  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  // updates state.[id] with selected meal type
  handleSelect = e => {
    this.setState({ mealSelect: e.target.value });
  };

  // fetches external nutrition API data - any errors return empty array (tells user no results found)
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

  fetchDailyLog = async () => {
    await axios
      .get(
        `${global.apiURI}/users/${this.props.authUser}/foodlog/${
          this.state.logDate
        }`,
        {
          headers: { Authorization: "Bearer " + this.props.jwt }
        }
      )
      .then(res => this.setState({ dailyLog: res.data }))
      .catch(err => console.log(err));
  };

  // fetches user's dated foodlog
  componentDidUpdate = async (prevProps, prevState) => {
    if (prevProps.authUser !== this.props.authUser) {
      await this.fetchDailyLog();
    }
  };

  componentDidMount = async () => {
    this.fetchDailyLog();
  };

  editEntry = id => {
    this.setState({ editField: id });
  };

  submitEdit = async (id, date, meal) => {
    let updateItem = {
      meal: meal,
      item: this.state.updateItem,
      calories: this.state.updateCalorie
    };
    // this.setState({ dailyLog: [...this.state.dailyLog, newItem] });
    await axios
      .put(
        `${global.apiURI}/users/${this.props.authUser}/foodlog/${
          this.state.logDate
        }/${id}`,
        updateItem,
        {
          headers: { Authorization: "Bearer " + this.props.jwt }
        }
      )
      .then(res => this.setState({ dailyLog: res.data, editField: "" }))
      .catch(err => console.log(err));
  };

  removeEntry = async (id, date) => {
    await axios
      .delete(
        `${global.apiURI}/users/${this.props.authUser}/foodlog/${
          this.state.logDate
        }/${id}`,
        {
          headers: { Authorization: "Bearer " + this.props.jwt }
        }
      )
      .then(res => this.setState({ dailyLog: res.data }))
      .catch(err => console.log(err));
  };

  render() {
    console.log("props in render", this.props);
    return (
      <React.Fragment>
        <main data-testid="tracker-screen">
          <p>
            Hello{" "}
            {this.props.authUser
              ? this.props.authUser
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
          <DailyLog
            log={this.state.dailyLog}
            editField={this.state.editField}
            editEntry={this.editEntry}
            submitEdit={this.submitEdit}
            handleChange={this.handleChange}
            removeEntry={this.removeEntry}
            date={this.state.logDate}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Tracker;
