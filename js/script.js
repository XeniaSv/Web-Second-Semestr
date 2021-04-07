window.onload = async function () {
  buttonwith();
  navigator.geolocation.getCurrentPosition(localCity,defaultCity);
  pressEnter();

  let onSuccess = (cities) => {
    for (let cityName of cities.favouriteCities) {
      let cities = document.querySelector('.cities');
      let city = createLoadingCity();
      cities.append(city);
      
      let onSuccessCity = (data) => {
        printCity(data, city);
      }

      let onFailCity = (e) => {
        alert(e);
        city.remove();
        return;
      }

      getInfoCityName(cityName).then(onSuccessCity).catch(onFailCity);
    }
  }

  let onFail = (e) => {
    alert(e);
  }

  getListOfFavourites().then(onSuccess).catch(onFail);
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
