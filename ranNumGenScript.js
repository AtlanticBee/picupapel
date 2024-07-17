"use strict"

let goButton = document.getElementById("goButton");

document.getElementById("goButton").onclick=async() => {
    const blackpoolAPIresponse = await fetch('https://api.open-meteo.com/v1/forecast?latitude=53.8167&longitude=-3.05&hourly=temperature_2m,rain&past_days=2&forecast_days=1');
    const blackpoolJson = await blackpoolAPIresponse.json();
    console.log(blackpoolJson);
    let blackpoolTotalRain = blackpoolJson.hourly.rain.reduce((a, b) => a + b, 0);        //A new function I've learned. Reduce takes two functions: a is the accumulator, b is the default value to add if empty element.
    let blackpoolAverageTemperature = (Math.round((blackpoolJson.hourly.temperature_2m.reduce((a, b) => a + b, 0) / 72) * 100)/100).toFixed(2);

    const balkhashAPIresponse = await fetch('https://api.open-meteo.com/v1/forecast?latitude=46.8481&longitude=74.995&hourly=temperature_2m,wind_speed_10m&past_days=2&forecast_days=1');
    const balkhashJson = await balkhashAPIresponse.json();
    console.log(balkhashJson);
    let balkhashAverageTemperature = (Math.round((balkhashJson.hourly.temperature_2m.reduce((a, b) => a + b, 0) / 72) * 100)/100).toFixed(2);        //A new function I've learned. Reduce takes two functions: a is the accumulator, b is the default value to add if empty element.
    let balkhashAverageWindspeed = (Math.round((balkhashJson.hourly.wind_speed_10m.reduce((a, b) => a + b, 0) / 72) * 100)/100).toFixed(2);

    let milliSeconds = new Date().getMilliseconds();

    document.getElementById("blackpool").innerHTML = (
        "Blackpool Total Rain= " + blackpoolTotalRain +
        "\n" + "Blackpool Average Temperature (C) = " + blackpoolAverageTemperature
    );

    document.getElementById("balkhash").innerHTML = (
        "Balkhash Average Windspeed km/h = " + balkhashAverageWindspeed +
        "\n" + "Balkhash Average Temperature (C) = " + balkhashAverageTemperature
    );

    let randomMultiple = (blackpoolTotalRain + 1) * (blackpoolAverageTemperature + 1) * (balkhashAverageTemperature + 1) * (balkhashAverageWindspeed + 1) * (milliSeconds + 1);
    let sizeOfMultiple = Math.log10(randomMultiple);
    let randomNumber = (randomMultiple / ((10*sizeOfMultiple) + 1));
    console.log(randomNumber);
    let resultParagraph = document.getElementById("result");
    let textAdded = document.createTextNode(randomNumber);
    resultParagraph.appendChild(textAdded);
  };

  