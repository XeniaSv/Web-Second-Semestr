const api = '3936fadeae5ac4446c2f0a9102d226f6';
const query = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${api}&`

async function getInformation(suffix) {
  let url = query + suffix;

  let data = await fetch(url);

  if (data.status === 200) {
    return await data.json();
  }

  throw new Error("Wrong request")
}

async function getInfoCityName(cityName) {
  return await getInformation(`q=${cityName}`);
}

async function getInfoCoordinats(lat, lon) {
  return await getInformation(`lat=${lat}&lon=${lon}`);
}
