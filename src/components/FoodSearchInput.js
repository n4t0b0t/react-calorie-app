import React from "react";

function FoodSearchInput(props) {
  return (
    <div className="user-input">
      <label htmlFor="foodSearch">Find food:</label>
      <input
        id="foodSearch"
        type="text"
        placeholder="e.g. 'red apple' or 'banana'"
        onChange={props.handleChange}
      />
      <button onClick={props.handleClick}>Search!</button>
    </div>
  );
}

export default FoodSearchInput;
