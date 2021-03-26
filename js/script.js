window.onload = async function () {
  buttonwith();
  navigator.geolocation.getCurrentPosition(localCity,defaultCity);
  pressEnter();

  let i = -1;

  let keys = [];
  for (let j = 0; j < window.localStorage.length; j++) {
    keys.push(j);
  }

  let requests = keys.map(key => getInfoCityName(window.localStorage.getItem(key)))

  Promise.all(requests)
  .then(responses => responses.forEach(
    data => {
      let cities = document.querySelector('.cities');
      let city = createLoadingCity();
      city.setAttribute("id", ++i);
      cities.append(city);
      printCity(data, city);
    }
  ))
  //Error
  .catch(error => {
    console.log(error);
    //city.remove();
  })
}

function buttonwith() {

    let width = document.documentElement.clientWidth;
    if (width < 768) {
        document.getElementById("refresh").innerHTML = '<img src="resources/refresh-button.png" class="img-refresh">'
    }
    else {
        document.getElementById("refresh").innerHTML = "Обновить геолокацию"
    }
}


let success = (data) => {
  printMainCity(data);
}

let fail = (error) => {
  alert(error);
}


async function defaultCity() {
  let nameCity = 'Saint Petersburg';

  getInfoCityName(nameCity).then(success).catch(fail);
}

async function localCity(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;


  getInfoCoordinats(lat,lon).then(success).catch(fail);
}


function refreshButton() {
  navigator.geolocation.getCurrentPosition(localCity, defaultCity);
  let divMainCity = document.querySelector('.flex-main-city');

  divMainCity.querySelector('h2').textContent = "Загрузка...";
  divMainCity.querySelector('.icon-main').src = "resources/loading.png";
  divMainCity.querySelector('.main-tempurature').innerHTML = '...';

  let ulMainCity = divMainCity.querySelector('.ul-main-city');
  let indicators = ulMainCity.querySelectorAll('.indicators');

  indicators[0].textContent = '...';
  indicators[1].textContent = '...';
  indicators[2].textContent = '...';
  indicators[3].textContent = '...';
  indicators[4].textContent = '...';
}
