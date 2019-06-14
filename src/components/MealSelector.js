import React from "react";

function MealSelector(props) {
  return (
    <div className="user-input">
      <label htmlFor="mealSelect">Select meal:</label>
      <select
        id="mealSelect"
        value={props.mealSelect}
        onChange={props.handleSelect}
      >
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
        <option value="Snack">Snack</option>
      </select>
    </div>
  );
}

export default MealSelector;
