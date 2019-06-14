import React from "react";

function DailyLog(props) {
  const mealArr = ["Breakfast", "Lunch", "Dinner", "Snack"];
  return (
    <React.Fragment>
      {mealArr.map(meal => (
        <MealLog
          key={Date() + meal}
          arr={props.log.filter(element => element.meal === meal)}
          meal={meal}
        />
      ))}
      <h2>
        Calorie Grand Total:{" "}
        {props.log.reduce((acc, curVal) => acc + curVal.calorie, 0)}
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
      {mealLogHasItems ? <ItemisedLog arr={mealLog} /> : <p>No Items</p>}
      <h4>
        Calorie Total:{" "}
        {mealLog.reduce((acc, curVal) => acc + curVal.calorie, 0)}
      </h4>
      <hr />
    </div>
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

export default DailyLog;
