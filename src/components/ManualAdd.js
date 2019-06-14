import React from "react";
import round from "./Round";

function ManualAdd(props) {
  return (
    <div className="manual-input">
      <CannedResponse inputText={props.inputText} results={props.results} />
      <div className="user-input">
        <label>Food Item:</label>
        <input
          id="manFood"
          type="text"
          placeholder="e.g. 'twisties'"
          onChange={props.handleChange}
        />
        <label>Estimated Calories:</label>
        <input
          id="manCalorie"
          type="text"
          placeholder="e.g. '50' or '500'"
          onChange={props.handleChange}
        />
        <button
          onClick={() =>
            props.handleAdd({
              label: props.manFood,
              calorie: round(props.manCalorie)
            })
          }
        >
          Add to Daily Log
        </button>
      </div>
    </div>
  );
}

function CannedResponse(props) {
  if (props.inputText) {
    return (
      <h3>Can't find what you're looking for? Please manually add it below.</h3>
    );
  } else {
    return <h3>Manually add item:</h3>;
  }
}
export default ManualAdd;
