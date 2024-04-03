export const getWeatherFromApiAsync = async (city, apiUrl) => {
  let jsonResponse = null;
  try {
    const response = await fetch(`${apiUrl}&q=${city}`);
    const json = await response.json();
    jsonResponse = json;
    // console.log(json);
    // console.log(`${WeatherAPI_URL}&q=${city}`);
  } catch (error) {
    console.error(error);
  }
  // console.log(jsonResponse);
  return jsonResponse;
};
