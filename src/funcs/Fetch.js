async function fetchApiData(foodSearch) {
  const searchText = encodeURIComponent(foodSearch);
  const baseURL = "https://api.edamam.com/api/food-database/parser?ingr=";
  const searchUrl =
    baseURL +
    searchText +
    "&app_id=" +
    process.env.EDAMAM_API_ID +
    "&app_key=" +
    process.env.EDAMAM_API_KEY;

  const response = await fetch(searchUrl);

  return response;
}

export default fetchApiData;
