import React from "react";

function MealSelector(props) {
  return (
    <div className="user-input">
      <label>Select meal:</label>
      <select defaultValue="Breakfast" onChange={props.handleSelect}>
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
        <option value="Snack">Snack</option>
      </select>
    </div>
  );
}

export default MealSelector;
