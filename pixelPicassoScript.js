"use strict"

//Function handles user colour selection.
function processColourSelection(eventHandle){
    console.log("Colour changed to: " + eventHandle.target.value);
    selectedColour = eventHandle.target.value;
}

//Function handles user setting of grid lines to on (true) or off (false).
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

//If a user clicks on the easel, and it corresponds to a pixel child element, the child is identified, coloured and the colour saved in an array (this array may not be needed in the end).
function processPaintingAction(eventHandle){
    console.log("Pixel clicked is: " + eventHandle.target.id);
    eventHandle.target.style.fill = selectedColour;
    let pixelNumber = parseInt((eventHandle.target.id.replace("square", "")), 10) - 1;
    pixelColoursArray[pixelNumber] = selectedColour;
}

//This is a top-level function for handling any user input, and sending it to one of the functions listed below.
//It's not strictly necessary to have this layer of function, but it may help add extensions in future and ensures the event handled is genuinely an expected action.
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

//Generates SVG downloadable file via a URL. This will be updated to a PNG (via Canvas) as most applications can't open SVGs.
function generateDownloadSVG(){
    console.log("Generating Image for download...");
    const obj = easelElement.outerHTML;
    const blob = new Blob([obj], {type : 'image/svg+xml'});
    let url=URL.createObjectURL(blob);
    document.getElementById("downloadLink").href=url;
    document.getElementById("downloadLink").style.visibility = "visible";
}

//Declaration of variables.
let selectedColour = "#000000";
let pixelColoursArray = Array(96).fill("#000000");
let gridDisplay = true;

//Binding of variables to document elements.
let colourPickerElement = document.getElementById("colorPicker");
let easelElement = document.getElementById("easelSVG");
let gridCheckboxElement = document.getElementById("showGridLines");
let downloadButton = document.getElementById("downloadImage");
let gridLinesList = document.getElementsByClassName("squareSVG");

//Binding of event listeners to document elements.
colourPickerElement.addEventListener("input", (evt) => {processUserInput(evt, "colour picking")});
gridCheckboxElement.addEventListener("input", (evt) => {processUserInput(evt, "grid line selecting")});
easelElement.addEventListener("click", (evt) => {processUserInput(evt, "painting")});
downloadButton.addEventListener("click", (evt) => {generateDownloadSVG()});
