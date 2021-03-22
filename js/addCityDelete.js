function addCity() {
  let text = document.querySelector('.input-text').value.toLowerCase();
  document.querySelector('.input-text').value = "";

  if (window.localStorage.getItem(text) !== null) {
    console.log("City exist");
    return;
  }

  let cities = document.querySelector('.cities');

  let city = createLoadingCity();

  cities.append(city);

  let success = (data) => {
    window.localStorage.setItem(data.name.toLowerCase(), data.name);
    printCity(data, city);
  }

  let fail = (error) => {
    alert(error);
    city.remove();
  }

  getInfoCityName(text).then(success).catch(fail);
}


function createLoadingCity() {
  let city = document.createElement('div');
  city.setAttribute('class', 'city')

  let templateLoading = document.querySelector('#templateLoading');

  city.append(templateLoading.content.cloneNode(true));

  return city;
}


function pressEnter() {
  document.querySelector('.input-text').addEventListener('keypress',
      function (e) {
        if (e.key === 'Enter' && document.querySelector('.input-text').value !== "") {
          addCity();
        }
      });
}

function deleteCity(btn) {
  let cityName = btn.parentElement.querySelector('h4').textContent.toLowerCase();
  window.localStorage.removeItem(cityName);
  btn.parentElement.parentElement.remove();
}
