const result = document.querySelector('.result');
const form = document.querySelector('.get-weather');
const stringInput = document.getElementById('city_country');

//Evento al presionar el botón "Buscar Clima"
form.addEventListener('submit', (e) => {
    e.preventDefault();
    //constante que toma el valor String del input    
    const rawInput = stringInput.value;
    //separar la ciudad y país del String tomando la "," como separador
    const splitedInput = rawInput.split(',');
    const cityName = splitedInput[0].trim();
    const countryName = splitedInput.slice(1).join(',').trim();

    //Verificar si ambos campos están vacíos 
    if (cityName === '' & countryName === '') {
        showError('No se ha insertado ningún país o ciudad...');
        return;
    }

    callAPI(cityName, countryName);
    
    //console.log(countryName);
})
//función para hacer la solicitud a la API
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

        })
        .catch(error => {
            console.log(error);
        })
}
//función que toma los datos del Json y los muestra en el doc html
function showWeather(data){
    const {name, main:{temp, temp_min, temp_max}, weather:[arr]} = data;
    //convertir kerlvin a celcius
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

}
//función para mostrar mensaje de error
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
//función para convertir kelvin a celcius
function kelvinToCentigrade(temp){
    return parseInt(temp - 273.15);
}
//función para limpiar los resultados anteriores
function clearHTML(){
    result.innerHTML = '';
}