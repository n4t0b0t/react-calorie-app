import React from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import update from "immutability-helper";
import DailyLog from "./DailyLog";

class HistoryLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = { historyLog: [] };
  }

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  componentDidMount = async () => {
    //prevProps, prevState
    // if (prevProps.authUser !== this.props.authUser) {
    await axios
      .get(
        `${process.env.REACT_APP_HEROKU_API}/users/${
          this.props.authUser
        }/foodlog/`,
        {
          headers: { Authorization: "Bearer " + this.props.jwt }
        }
      )
      .then(res => {
        this.setState({ historyLog: res.data });
      })
      .catch(err => console.log(err));
  };
  //   };

  toggleClass = date => {
    this.setState({ [date]: !this.state[date] });
  };

  editEntry = id => {
    this.setState({ editField: id });
  };

  submitEdit = async (id, date, meal) => {
    const dateIndex = this.state.historyLog.findIndex(
      el => el.date === new Date(date).getTime()
    );
    const dateString = new Date(date).toISOString().slice(0, 10);
    let updateItem = {
      meal: meal,
      item: this.state.updateItem,
      calories: this.state.updateCalorie
    };
    await axios
      .put(
        `${process.env.REACT_APP_HEROKU_API}/users/${
          this.props.authUser
        }/foodlog/${dateString}/${id}`,
        updateItem,
        {
          headers: { Authorization: "Bearer " + this.props.jwt }
        }
      )
      .then(res =>
        this.setState({
          editField: "",
          historyLog: update(this.state.historyLog, {
            [dateIndex]: { meals: { $set: res.data } }
          })
        })
      )
      .catch(err => console.log(err));
  };

  removeEntry = async (id, date) => {
    const dateIndex = this.state.historyLog.findIndex(
      el => el.date === new Date(date).getTime()
    );
    const dateString = new Date(date).toISOString().slice(0, 10);
    await axios
      .delete(
        `${process.env.REACT_APP_HEROKU_API}/users/${
          this.props.authUser
        }/foodlog/${dateString}/${id}`,
        {
          headers: { Authorization: "Bearer " + this.props.jwt }
        }
      )
      .then(res =>
        this.setState({
          historyLog: update(this.state.historyLog, {
            [dateIndex]: { meals: { $set: res.data } }
          })
        })
      )
      .catch(err => console.log(err));
  };

  render() {
    if (!this.props.isLoggedIn) {
      return <Redirect to="/signup" />;
    }
    return (
      <main>
        <h2>{this.props.authUser} Food Log History</h2>
        {this.state.historyLog.map(dayLog => (
          <div key={dayLog._id}>
            <button
              className="collapsible"
              onClick={() => this.toggleClass(dayLog.date)}
            >
              {new Date(dayLog.date).toISOString().slice(0, 10)}
            </button>
            <div className={this.state[dayLog.date] ? "not-hidden" : "hidden"}>
              <DailyLog
                log={dayLog.meals}
                date={dayLog.date}
                editField={this.state.editField}
                editEntry={this.editEntry}
                submitEdit={this.submitEdit}
                handleChange={this.handleChange}
                removeEntry={this.removeEntry}
              />
            </div>
          </div>
        ))}
      </main>
    );
  }
}

export default HistoryLog;
