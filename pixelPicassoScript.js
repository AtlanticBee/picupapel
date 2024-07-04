"use strict"

function processColourSelection(eventHandle){
    console.log("Colour changed to: " + eventHandle.target.value);
    selectedColour = eventHandle.target.value;
}

function processGridLinesCheckbox(eventHandle){
    console.log("Gridlines Checkbox set to: " + eventHandle.target.checked);
    gridDisplay = eventHandle.target.checked;
    if (gridDisplay === false){
        for (let i = 0; i < gridLinesList.length; i++){
            gridLinesList[i].setAttribute("stroke-width", 0);
        }
    }
    else if (gridDisplay === true){
        for (let i = 0; i < gridLinesList.length; i++){
            gridLinesList[i].setAttribute("stroke-width", 1);
        }
    }
    else {
        console.log("Error: non-boolean value sent to the Function: processGridLinesCheckbox");
    }
}

function processPaintingAction(eventHandle){
    console.log("Pixel clicked is: " + eventHandle.target.id);
    eventHandle.target.style.fill = selectedColour;
    let pixelNumber = parseInt((eventHandle.target.id.replace("square", "")), 10) - 1;
    pixelColoursArray[pixelNumber] = selectedColour;
}

function clearEasel(){
    let pixelArrayElements = document.getElementsByClassName("squareSVG");
    for (let squareElement of pixelArrayElements){
        squareElement.style.fill = "#ffffff";
    }
    pixelColoursArray = Array(96).fill("#ffffff");
}

function processUserInput(eventHandle, eventType){
    if (eventType === "colour picking"){
        processColourSelection(eventHandle);
    }
    else if (eventType === "grid line selecting"){
        processGridLinesCheckbox(eventHandle);
    }
    else if (eventType === "painting"){
        processPaintingAction(eventHandle);
    }
    else {
        console.log("Error: event listener fired, but no response has been programmed. From Function: processUserInput");
    }
}

function generateDownloadPNG(){
    //Generate Canvas version from pixelColoursArray
    const canvas = document.getElementById("hiddenCanvas");
    const ctx = canvas.getContext("2d");
    let squareSize = 50;
    for (let i = 0; i < pixelColoursArray.length; i++){
        let rowNumber = Math.floor(i/12);
        let colNumber = (i % 12);
        let colour = pixelColoursArray[i];
        ctx.fillStyle = colour;
        ctx.fillRect((colNumber * squareSize), (rowNumber * squareSize), squareSize, squareSize);
    }

    //Convert Canvas into blob downloaded through URL
    let imagedata = canvas.toDataURL("image/png");
    document.getElementById("downloadLink").href=imagedata;
    document.getElementById("downloadLink").style.visibility = "visible";
}

let selectedColour = "#000000";
let pixelColoursArray = Array(96).fill("#ffffff");
let gridDisplay = true;

let colourPickerElement = document.getElementById("colorPicker");
let easelElement = document.getElementById("easelSVG");
let gridCheckboxElement = document.getElementById("showGridLines");
let downloadButton = document.getElementById("downloadImage");
let gridLinesList = document.getElementsByClassName("squareSVG");
let clearEaselButton = document.getElementById("clearEasel");

colourPickerElement.addEventListener("input", (evt) => {processUserInput(evt, "colour picking")});
gridCheckboxElement.addEventListener("input", (evt) => {processUserInput(evt, "grid line selecting")});
easelElement.addEventListener("click", (evt) => {processUserInput(evt, "painting")});
downloadButton.addEventListener("click", (evt) => {generateDownloadPNG()});
clearEaselButton.addEventListener("click", (evt) => {clearEasel()});
