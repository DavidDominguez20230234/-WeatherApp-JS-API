const result = document.querySelector('.result');
const form = document.querySelector('.get-weather');
const stringInput = document.getElementById('city_country');


form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const rawInput = stringInput.value;
    const splitedInput = rawInput.split(',');
    const cityName = splitedInput[0].trim();
    const countryName = splitedInput.slice(1).join(',').trim();
    console.log(cityName);
    console.log(countryName);

    if (cityName === '' & countryName === '') {
        showError('No se ha insertado ningún país o ciudad...');
        return;
    }

    callAPI(cityName, countryName);
    
    //console.log(countryName);
})

function callAPI(city, country){
    const apiKey = '62440dba3fbaf7c477ad5395efd917eb';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`;

    fetch(url)
        .then(data => {
            return data.json();
        })
        .then(dataJSON => {
            if (dataJSON.cod === '404') {
                showError('Ciudad no encontrada...');
            } else {
                clearHTML();
                showWeather(dataJSON);
            }
            
            
            //console.log(dataJSON);
        })
        .catch(error => {
            console.log(error);
        })
}

function showWeather(data){
    const {name, main:{temp, temp_min, temp_max}, weather:[arr]} = data;

    const degrees = kelvinToCentigrade(temp);
    const min = kelvinToCentigrade(temp_min);
    const max = kelvinToCentigrade(temp_max);

    const content = document.createElement('div');
    content.innerHTML = `
        <h5>Clima en ${name}</h5>
        <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon">
        <h2>${degrees}°C</h2>
        <p>Max: ${max}°C</p>
        <p>Min: ${min}°C</p>
    `;

    result.appendChild(content);

    /* console.log(name);
    console.log(temp);
    console.log(temp_max);
    console.log(temp_min);
    console.log(arr.icon); */
}

function showError(message){
    //console.log(message);
    const alert = document.createElement('p');
    alert.classList.add('alert-message');
    alert.innerHTML = message;

    form.appendChild(alert);
    setTimeout(() => {
        alert.remove();
    }, 3000);
}

function kelvinToCentigrade(temp){
    return parseInt(temp - 273.15);
}

function clearHTML(){
    result.innerHTML = '';
}