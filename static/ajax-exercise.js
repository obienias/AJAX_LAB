'use strict';

// PART 1: SHOW A FORTUNE

function showFortune(event) {
  fetch('/fortune').then((response) => response.text())
  .then((text) => document.querySelector('#fortune-text').innerHTML = text);
  
  console.log(event);

}

// showFortune is never called; evt calls the function
document.querySelector('#get-fortune-button').addEventListener('click', showFortune);



// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();

  let url = '/weather.json';
  const zipcode = document.querySelector('#zipcode-field').value;
  url = url + `?zipcode=${zipcode}`

// let queryString = new URLSearchParams({"zipcode": `${zipcode}`}).toString();
//  fetch(`${url}?${queryString}`)

  fetch(url)
  .then((response) => response.json())
  .then((dataJson) => {
    document.querySelector('#weather-info').innerHTML = dataJson.forecast;
  });
}

document.querySelector('#weather-form').addEventListener('submit', showWeather);

// PART 3: ORDER MELONS

 function updateMelons(responseJson){
  if (responseJson.code === 'OK'){
  document.querySelector('#order-status').classList.remove('order-error');
  document.querySelector('#order-status').innerHTML = `<h2>${responseJson.msg}</h>`;
}
else if (responseJson.code === 'ERROR') {
  document.querySelector('#order-status').classList.add('order-error');
  document.querySelector('#order-status').innerHTML = `${responseJson.code} ${responseJson.msg}`;
}
 }

function orderMelons(evt) {
  evt.preventDefault();

  const formInputs = {
    qty: document.querySelector('#qty-field').value,
    melon_type: document.querySelector('#melon-type-field').value
  };

  console.log(formInputs.type);
  console.log(formInputs.amount)

  fetch('/order-melons.json', {
    method: 'POST',
    body: JSON.stringify(formInputs),
    headers:{
      'Content-Type': 'application/json',
    },
  })
  .then((response) => response.json())
  .then((responseJson) => {
    if (responseJson.code === 'OK'){
      document.querySelector('#order-status').classList.remove('order-error');
      document.querySelector('#order-status').innerHTML = `<h2>${responseJson.msg}</h>`;
    }
    else if (responseJson.code === 'ERROR') {
      document.querySelector('#order-status').classList.add('order-error');
      document.querySelector('#order-status').innerHTML = `${responseJson.code} ${responseJson.msg}`;
    }
  })

  
    

  // TODO: show the result message after your form
  // TODO: if the result code is ERROR, make it show up in red (see our CSS!)
}
document.querySelector('#order-form').addEventListener('submit', orderMelons);
