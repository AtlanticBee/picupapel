"use strict"

let goButton = document.getElementById("goButton");

document.getElementById("goButton").onclick=async() => {
    const blackpoolAPIresponse = await fetch('https://api.open-meteo.com/v1/forecast?latitude=53.8167&longitude=-3.05&hourly=temperature_2m,rain&past_days=2&forecast_days=1');
    const blackpoolJson = await blackpoolAPIresponse.json();
    let blackpoolTotalRain = blackpoolJson.hourly.rain.reduce((a, b) => a + b, 0);        
    //A new function I've learned. Reduce takes two functions: a is the accumulator, b is the default value to add if empty element.
    let blackpoolAverageTemperature = (Math.round((blackpoolJson.hourly.temperature_2m.reduce((a, b) => a + b, 0) / 72) * 100)/100).toFixed(2);

    const balkhashAPIresponse = await fetch('https://api.open-meteo.com/v1/forecast?latitude=46.8481&longitude=74.995&hourly=temperature_2m,wind_speed_10m&past_days=2&forecast_days=1');
    const balkhashJson = await balkhashAPIresponse.json();
    let balkhashAverageTemperature = (Math.round((balkhashJson.hourly.temperature_2m.reduce((a, b) => a + b, 0) / 72) * 100)/100).toFixed(2);
    let balkhashAverageWindspeed = (Math.round((balkhashJson.hourly.wind_speed_10m.reduce((a, b) => a + b, 0) / 72) * 100)/100).toFixed(2);

    let milliSeconds = new Date().getMilliseconds();
    
    const blackpoolTempElem = document.getElementById("blackpoolTemp");
    const blackpoolRainElem = document.getElementById("blackpoolRain");
    const balkhashWindspeedElem = document.getElementById("balkhashWindspeed");
    const balkhashTemperatureElem = document.getElementById("balkhashTemperature");

    blackpoolTempElem.textContent = "Blackpool average temperature (C): " + blackpoolTotalRain + " mm";
    blackpoolRainElem.textContent = "Blackpool average rainfall (mm):" + blackpoolAverageTemperature + " C";
    balkhashWindspeedElem.textContent = "Balkhash average windspeed (km/h):" +  balkhashAverageWindspeed + " km/hr";
    balkhashTemperatureElem.textContent = "Blakhash average temperature (C):" +  balkhashAverageTemperature + " C";

    // While avoiding any zero-value, multiply all values together and round to an integer.
    // This includes the timestamp in UTC too.
    let randomMultiple = Math.round((blackpoolTotalRain + 1) * (blackpoolAverageTemperature + 1) * (balkhashAverageTemperature + 1) * (balkhashAverageWindspeed + 1) * (milliSeconds + 1));
    // Only take into account the first six digits and print between 0 and 1
    let multipleAsString = "0." + randomMultiple.toString().slice(0,6);
    document.getElementById("output").textContent = "Random Number Result: " +  multipleAsString;
};

  
