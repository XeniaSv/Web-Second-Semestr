window.onload = function () {
  buttonwith();
  navigator.geolocation.getCurrentPosition(localCity,defaultCity);
  pressEnter();

  let keys = Object.keys(window.localStorage);

  for (let key of keys) {
    let cityName = window.localStorage.getItem(key);

    let cities = document.querySelector('.cities');
    let city = createLoadingCity();
    cities.append(city);

    let success = (data) => {
      printCity(data, city);
    }

    let fail = (error) => {
      alert(error);
      city.remove();
    }

    getInfoCityName(cityName).then(success).catch(fail);
  }
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


function defaultCity() {
  let nameCity = 'Saint Petersburg';

  let success = (data) => {
    printMainCity(data);
  }

  let fail = (error) => {
    alert(error);
  }

  getInfoCityName(nameCity).then(success).catch(fail);
}

function localCity(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let success = (data) => {
    printMainCity(data);
  }

  let fail = (error) => {
    alert(error);
  }

  getInfoCoordinats(lat,lon).then(success).catch(fail);
}


function refreshButton() {
  navigator.geolocation.getCurrentPosition(localCity,defaultCity);
  let flexMainCity = document.querySelector('.flex-main-city');
  flexMainCity.innerHTML = "<h2>Загрузка...</h2>";
}
