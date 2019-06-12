import React from "react";

export const MealSelector = props => (
  <label>
    Select Meal:
    <select defaultValue="Breakfast" onChange={props.handleSelect}>
      <option value="Breakfast">Breakfast</option>
      <option value="Lunch">Lunch</option>
      <option value="Dinner">Dinner</option>
      <option value="Snack">Snack</option>
    </select>
  </label>
);
