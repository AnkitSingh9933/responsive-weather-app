/*
=================================
WEATHER APP
=================================

Concepts Used:
- Fetch API
- Async Await
- DOM Manipulation
- Event Listener
- Error Handling
*/


// =============================
// BUTTON & INPUT SELECTORS
// =============================

const searchBtn = document.querySelector("#searchBtn");

const cityInput = document.querySelector("#cityInput");


// =============================
// UI SELECTORS
// =============================

const cityNameDisplay = document.querySelector("#cityName");

const tempDisplay = document.querySelector("#temperature");

const weatherTypeDisplay = document.querySelector("#weatherType");

const feelsDisplay = document.querySelector("#feelsLike");

const humidityDisplay = document.querySelector("#humidity");

const windDisplay = document.querySelector("#wind");

const pressureDisplay = document.querySelector("#pressure");

const dateDisplay = document.querySelector("#dateTime");

const defaultMsg = document.querySelector("#defaultMsg");


// =============================
// FETCH WEATHER FUNCTION
// =============================

async function fetchWeatherData() {

    // =============================
    // API KEY
    // =============================

    const apiKey = "cc6155f04d7b78f03b10ad8dd007a1d7";


    // =============================
    // GET INPUT VALUE
    // =============================

    const city = cityInput.value.trim();


    // =============================
    // EMPTY INPUT VALIDATION
    // =============================

    if (city === "") {

        alert("Please enter city name!");

        return;
    }


    // =============================
    // LOADING STATE
    // =============================

    cityNameDisplay.innerText = "Fetching...";
    tempDisplay.innerText = "Loading...";


    // =============================
    // API URL
    // =============================

    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;


    try {

        // =============================
        // FETCH DATA
        // =============================

        const response = await fetch(url);


        // =============================
        // CONVERT TO JSON
        // =============================

        const data = await response.json();


        // =============================
        // DEBUG DATA
        // =============================

        console.log(data);


        // =============================
        // SUCCESS RESPONSE
        // =============================

        if (data.cod == 200) {

            // CITY NAME

            cityNameDisplay.innerText = data.name;


            // TEMPERATURE

            tempDisplay.innerText =
                `${Math.round(data.main.temp)}°C`;


            // WEATHER TYPE

            weatherTypeDisplay.innerText =
                data.weather[0].description;


            // FEELS LIKE

            feelsDisplay.innerText =
                `${Math.round(data.main.feels_like)}°C`;


            // HUMIDITY

            humidityDisplay.innerText =
                `${data.main.humidity}%`;


            // WIND SPEED

            windDisplay.innerText =
                `${data.wind.speed} m/s`;


            // PRESSURE

            pressureDisplay.innerText =
                `${data.main.pressure} hPa`;


            // =============================
            // DATE
            // =============================

            const currentDate = new Date();

            dateDisplay.innerText =
                currentDate.toLocaleDateString(
                    "en-GB",
                    {
                        day: "numeric",
                        month: "short",
                        year: "numeric"
                    }
                );


            // =============================
            // HIDE DEFAULT MESSAGE
            // =============================

            defaultMsg.style.display = "none";


            // =============================
            // CLEAR INPUT
            // =============================

            cityInput.value = "";

        }

        // =============================
        // CITY NOT FOUND
        // =============================

        else {

            alert(data.message);

            cityNameDisplay.innerText = "--";

            tempDisplay.innerText = "--°C";

        }

    }

    // =============================
    // ERROR HANDLING
    // =============================

    catch (error) {

        console.error(error);

        alert("Something went wrong!");

    }

}


// =============================
// BUTTON CLICK EVENT
// =============================

searchBtn.addEventListener(
    "click",
    fetchWeatherData
);


// =============================
// ENTER KEY EVENT
// =============================

cityInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            fetchWeatherData();

        }

    }
);