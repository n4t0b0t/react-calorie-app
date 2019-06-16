async function fetchApiData(foodSearch) {
  const searchText = encodeURIComponent(foodSearch);
  const baseURL = "https://api.edamam.com/api/food-database/parser?ingr=";
  const appId = "5aff3ca9";
  const appKey = "c7cd298798507c71ce18987bab8ea27f";
  const searchUrl =
    baseURL + searchText + "&app_id=" + appId + "&app_key=" + appKey;

  const response = await fetch(searchUrl);

  return response;
}

export default fetchApiData;
