"use strict"

let goButton = document.getElementById("goButton");

document.getElementById("goButton").onclick=async() => {
    const weatherAPIresponse = await fetch('https://api.open-meteo.com/v1/forecast?latitude=53.8167&longitude=-3.05&hourly=temperature_2m,rain&past_days=2&forecast_days=1');
    const weatherJson = await weatherAPIresponse.json();
    let totalRain = weatherJson.hourly.rain.reduce((a, b) => a + b, 0);        //A new function I've learned. Reduce takes two functions: a is the accumulator, b is the default value to add if empty element.
    let averageTemp = (Math.round((weatherJson.hourly.temperature_2m.reduce((a, b) => a + b, 0) / 72) * 100)/100).toFixed(2);
    document.getElementById("weather").innerHTML = "Total Rain = " + totalRain + "\n" + "Average Temperature (C) = " + averageTemp;

    let seconds = new Date().getSeconds();      //Returns integer between 0 and 59
    console.log("seconds = " + seconds);

    let artworkInteger = Math.abs(((Math.round((weatherJson.hourly.temperature_2m.reduce((a, b) => a + b, 0) / 72) * 100)/100).toFixed(0) * 10)) - seconds;
    let artworkAPIrequest = "https://api.artic.edu/api/v1/artworks/" + artworkInteger;
    const artworkAPIresponse = await fetch(artworkAPIrequest);
    const artworkData = await artworkAPIresponse.json();

    let artist;
    if (artworkData.artist_title === String){
        console.log(artworkData.data.artist_title);
        artist = artworkData.data.artist_title;
    }
    else{
        artist = "not found";
    }
    document.getElementById("artwork").innerHTML = "Artist = " + artist;
    
    let sumAscii;
    for (let counter; counter < artist.length; counter++){
        let charCode = artist.charCodeAt[counter];
        sumAscii = sumAscii + charCode;
    }

    let randomNumber = Math.round(sumAscii + seconds + averageTemp + totalRain);
    document.getElementById("result").innerHTML = randomNumber;
  };