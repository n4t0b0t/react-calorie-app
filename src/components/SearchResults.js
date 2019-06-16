import React from "react";
import round from "../funcs/Round";

function SearchResults(props) {
  let searchResults = [];
  const defaultImage =
    "https://www.bennettig.com/wordpress/wp-content/uploads/2018/07/square-placeholder.jpg";

  if (props.results) {
    const arr = props.results.map(element => ({
      foodId: element.food.foodId,
      image: element.food.image ? element.food.image : defaultImage,
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

  if (props.fetching && props.fetching === "ongoing") {
    return <h3>Searching for {props.inputText}...</h3>;
  } else if (props.fetching && props.fetching === "completed") {
    if (searchResults.length > 0) {
      return (
        <React.Fragment>
          <h3>Search results for {props.inputText}:</h3>
          <div className="search-results">
            {searchResults.map(element => (
              <figure key={element.foodId}>
                <img src={element.image} alt={element.label} />
                <p>{element.label}</p>
                <figcaption>
                  Calorie: {element.calorie} | Carbs: {element.carbs} | Protein:{" "}
                  {element.protein} | Fat: {element.fat} | Fiber:{" "}
                  {element.fiber}
                </figcaption>
                <button onClick={() => props.handleAdd(element)}>+</button>
              </figure>
            ))}
          </div>
        </React.Fragment>
      );
    } else
      return (
        <h3>Search Results for {props.inputText}: Oh noes! Item not found!</h3>
      );
  }
  return <h3>Happy searching!</h3>;
}

export default SearchResults;
