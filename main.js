const api = {
    key: "afaf9f8d48cff6cafd32e23220bcfdbf",
    base: "https://api.openweathermap.org/data/2.5/"
  }
  
  const searchbox = document.querySelector('.search-box');
  searchbox.addEventListener('keypress', setQuery);
  
  function setQuery(evt) {
    if (evt.keyCode == 13) {
      getResults(searchbox.value);
    }
  }
  
  function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(weather => {
        return weather.json();
      }).then(displayResults);
  }

  function displayResults (weather) {
    //location
    console.log(weather)
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`

    //date
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    //temperature
    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerHTML = weather.weather[0].main;

    let hiLow = document.querySelector('.hi-low');
    hiLow.innerHTML = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;

    //background image 
    let cloudyBackground = document.querySelector('body');
    cloudyBackground.style.background = "url(image/cloudy.jpg)";

    let rainyBackground = document.querySelector('body');
    rainyBackground.style.background = "url(image/rainy.jpg)";

    // let snowyBackground = document.querySelector('body');
    // snowyBackground.style.background = "url(image/snowy.jpg)";  

    // let sunnyBackground = document.querySelector('body');
    // sunnyBackground.style.background = "url(image/sunny.jpg)";  

    // switch(weather_el) {
    //     case 'clouds':
    //         cloudyBackground
    //         break;
    //     case 'rain':
    //         rainyBackground
    //         break;
    //     case 'snow': 
    //         snowyBackground
    //         break;
    //     case 'sunny':
    //         sunnyBackground
    //         break;
    }


    function changeBackgroundImage() {
        if (weather_el == 'clouds') {
            cloudyBackground
        } else if ( weather_el == 'rain') {
            rainyBackground
        } else { 
            return 
        }
    };

    function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${year}`;
}
