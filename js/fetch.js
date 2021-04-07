const serverURL = "http://localhost:3000";
const weatherURL = `${serverURL}/weather/city`;
const weatherCoordinatesURL = `${serverURL}/weather/coordinates`;
const favouritesURL = `${serverURL}/favourites`;

async function getInfoCityName(cityName) {
  let data = await fetch(`${weatherURL}?q=${cityName}`);
  if (data.status === 200) {
    return await data.json();
  }
  throw new Error(`Неправильный запрос. Повторите еще раз:${data.status}`);
}

async function getInfoCoordinats(lat, lon) {
  let data = await fetch(`${weatherCoordinatesURL}?lat=${lat}&lon=${lon}`);
  if (data.status === 200) {
    return await data.json();
  }
  throw new Error(`Неправильный запрос. Повторите еще раз: ${data.status}`);
}

async function getListOfFavourites() {
  let data = await fetch(favouritesURL);
  if (data.status === 200) {
    return data.json();
  }
  throw new Error(`Неправильный запрос. Повторите еще раз: ${data.status}`);
}

async function addCityToFavourites(cityName) {
  let data = await fetch(`${favouritesURL}?q=${cityName}`, {method: "POST"});
  if (data.status === 200) {
    return await data.json();
  }

  if (data.status === 409) {
    return false;
  }

  throw new Error(`Неправильный запрос. Повторите еще раз: ${data.status}`);
}

async function deleteCityFromFavourites(cityName) {
  let data = await fetch (`${favouritesURL}?q=${cityName}`, {method: "DELETE"});

  if (data.status === 200) {
    return true;
  }

  throw new Error(`Неправильный запрос. Повторите еще раз: ${data.status}`);
}
