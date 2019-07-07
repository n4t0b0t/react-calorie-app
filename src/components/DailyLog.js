import React from "react";

function DailyLog(props) {
  const mealArr = ["Breakfast", "Lunch", "Dinner", "Snack"];
  return (
    <React.Fragment>
      {mealArr.map(meal => (
        <MealLog
          key={meal + props.date}
          date={props.date}
          arr={props.log.filter(element => element.meal === meal)}
          meal={meal}
          editField={props.editField}
          editEntry={props.editEntry}
          submitEdit={props.submitEdit}
          handleChange={props.handleChange}
          removeEntry={props.removeEntry}
        />
      ))}
      <h2>
        Calorie Grand Total:{" "}
        {props.log.reduce((acc, curVal) => acc + curVal.calories, 0)}
      </h2>
    </React.Fragment>
  );
}

function MealLog(props) {
  let mealLog = props.arr;
  let mealLogHasItems = mealLog.length > 0 ? true : false;

  return (
    <div data-testid={props.meal}>
      <h3>{props.meal}</h3>
      {mealLogHasItems ? (
        <ItemisedLog
          arr={mealLog}
          meal={props.meal}
          date={props.date}
          editField={props.editField}
          editEntry={props.editEntry}
          submitEdit={props.submitEdit}
          handleChange={props.handleChange}
          removeEntry={props.removeEntry}
        />
      ) : (
        <p>No Items</p>
      )}
      <h4>
        Calorie Total:{" "}
        {mealLog.reduce((acc, curVal) => acc + curVal.calories, 0)}
      </h4>
      <hr />
    </div>
  );
}

function ItemisedLog(props) {
  let mealLog = props.arr;
  return mealLog.map((element, index) => (
    <li key={element._id}>
      {element._id === props.editField ? (
        <React.Fragment>
          <label htmlFor="updateItem">Type:</label>
          <input
            id="updateItem"
            type="text"
            placeholder={element.item}
            onChange={props.handleChange}
          />
          <label htmlFor="updateCalorie">Calorie:</label>
          <input
            id="updateCalorie"
            type="text"
            placeholder={element.calories}
            onChange={props.handleChange}
          />
          <button
            onClick={() =>
              props.submitEdit(element._id, props.date, props.meal)
            }
            className="link-button"
          >
            Submit
          </button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <p>
            Type: {element.item}, Calorie: {element.calories}
          </p>{" "}
          <button
            onClick={() => props.editEntry(element._id)}
            className="link-button"
          >
            Edit
          </button>
        </React.Fragment>
      )}
      <button
        onClick={() => props.removeEntry(element._id, props.date)}
        className="link-button"
      >
        Remove
      </button>
    </li>
  ));
}

export default DailyLog;
