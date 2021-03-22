const icon = "https://openweathermap.org/img/wn/"

function printMainCity(data){
  let flexMainCity = document.querySelector('.flex-main-city');
  flexMainCity.innerHTML = "";

  let divMainCity = document.querySelector('#templateMainCity');

  divMainCity.content.querySelector('h2').textContent = data.name;
  divMainCity.content.querySelector('.icon-main').src = `${icon}${data.weather[0]['icon']}@2x.png`;
  divMainCity.content.querySelector('.main-tempurature').innerHTML = `${Math.round(data.main.temp)}&#176;C`;

  let ulMainCity = divMainCity.content.querySelector('.ul-main-city');
  let indicators = ulMainCity.querySelectorAll('.indicators');

  indicators[0].textContent = `${data.wind.speed}м/с`;
  indicators[1].textContent = `${data.weather[0]['description']}`;
  indicators[2].textContent = `${data.main.pressure}мм. рт. ст.`;
  indicators[3].textContent = `${data.main.humidity}%`;
  indicators[4].textContent = `[${data.coord.lat}, ${data.coord.lon}]`;


  let clone = document.importNode(divMainCity.content, true);
  flexMainCity.append(clone);
}

function printCity(data, city) {
  city.innerHTML = "";

  let templateCity = document.querySelector('#templateCity');

  templateCity.content.querySelector('h4').textContent = data.name;
  templateCity.content.querySelector('.city-tempurature').innerHTML = `${Math.round(data.main.temp)}&#176;C`;
  templateCity.content.querySelector('.icon-city').src = `${icon}${data.weather[0]['icon']}@2x.png`;

  let ulCity = templateCity.content.querySelector('.ul-city');
  let indicators = ulCity.querySelectorAll('.indicators');

  indicators[0].textContent = `${data.wind.speed}м/с`;
  indicators[1].textContent = `${data.weather[0]['description']}`;
  indicators[2].textContent = `${data.main.pressure}мм. рт. ст.`;
  indicators[3].textContent = `${data.main.humidity}%`;
  indicators[4].textContent = `[${data.coord.lat}, ${data.coord.lon}]`;

  let clone = document.importNode(templateCity.content, true);
  city.append(clone);

}
