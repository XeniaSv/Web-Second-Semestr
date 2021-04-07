async function addCity() {
  let text = document.querySelector('.input-text').value;
  document.querySelector('.input-text').value = "";

  let cities = document.querySelector('.cities');

  let city = createLoadingCity();

  cities.append(city);

  let success = (data) => {
    if (data === false) {
      alert("Город уже существует");
      city.remove();
      return;
    }

    printCity(data, city);
  }

  let fail = (error) => {
    alert(error);
    city.remove();
    return;
  }

  addCityToFavourites(text).then(success).catch(fail);
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
  let cityName = btn.parentElement.querySelector("h4").textContent;
  
  let onSuccess = (result) => {
    if (result === true)
      btn.parentElement.parentElement.remove();
  }

  let onFail = (e) => {
    alert(e);
  }
  
  deleteCityFromFavourites(cityName).then(onSuccess).catch(onFail);
}
