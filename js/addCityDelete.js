async function addCity() {
  let text = document.querySelector('.input-text').value.toLowerCase();
  document.querySelector('.input-text').value = "";

  let cities = document.querySelector('.cities');

  let city = createLoadingCity();

  cities.append(city);

  let success = (data) => {
    for (let i = 0; i < window.localStorage.length; i++) {
      if (data.name === window.localStorage.getItem(i)) {
        alert("Город уже существует");
        city.remove();
        return;
      }
    }

    city.setAttribute("id", window.localStorage.length)
    window.localStorage.setItem(window.localStorage.length, data.name);
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
  let id = btn.parentElement.parentElement.id;
  window.localStorage.removeItem(id);
  btn.parentElement.parentElement.remove();

  let cities = document.querySelectorAll('.city')
  for (let i = 0; i < window.localStorage.length; i++) {
    window.localStorage.removeItem(cities[i].id);
    cities[i].id = i;
    window.localStorage.setItem(i, cities[i].querySelector('h4').textContent)
  }
}
