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

function generateDownloadSVG(){
    console.log("Generating Image for download...");
    const obj = easelElement.outerHTML;
    const blob = new Blob([obj], {type : 'image/svg+xml'});
    let url=URL.createObjectURL(blob);
    document.getElementById("downloadLink").href=url;
    document.getElementById("downloadLink").style.visibility = "visible";
}

let selectedColour = "#000000";
let pixelColoursArray = Array(96).fill("#000000");
let gridDisplay = true;

let colourPickerElement = document.getElementById("colorPicker");
let easelElement = document.getElementById("easelSVG");
let gridCheckboxElement = document.getElementById("showGridLines");
let downloadButton = document.getElementById("downloadImage");
let gridLinesList = document.getElementsByClassName("squareSVG");

colourPickerElement.addEventListener("input", (evt) => {processUserInput(evt, "colour picking")});
gridCheckboxElement.addEventListener("input", (evt) => {processUserInput(evt, "grid line selecting")});
easelElement.addEventListener("click", (evt) => {processUserInput(evt, "painting")});
downloadButton.addEventListener("click", (evt) => {generateDownloadSVG()});
