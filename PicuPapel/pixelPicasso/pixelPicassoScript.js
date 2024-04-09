//Functions

//User input functions (primary functions, called by a user input)
function pixelClick(evt) {                                      //This is the top-level function for when a pixel is clicked.
    saveHistory();                                              //Saves the current pixel array prior to modifying.
    let pixelValue = getPixelValue(evt.target.id);              //The pixel's corresponding number in the pixel array is calculated.
    pixelColours[pixelValue] = brushColour;                     //Update pixel colour data.
    updateView();
}

function selectPaletteColour(targetID) {                        //This is the top-level function for when a palette well is clicked.
    indexValue = palette.colours.indexOf(targetID);            //The index number of the colour is obtained for the palette.
    for (let count = 0; count < (palette.colours.length); count++) {
        if (count === indexValue) {                            //All palette selection markers are set to false unless equal to the target index.
            palette.isSelected[count] = true;
        }
        else {
            palette.isSelected[count] = false;
        }
    }
    if (paletteStyle === "pastel") {                            //Update the brush colour.
        brushColour = palette.pastelValues[indexValue];
    }
    else {
        brushColour = palette.neonValues[indexValue];
    }
    colourPicker.isSelected = false;
    updateView();                                               //The view is refresjed to show the user which has been selected.
}

function customColour(evt) {
    brushColour = evt.target.value;
    colourPicker.selectedColour = evt.target.value;
    for (let count = 0; count < palette.colours.length; count++) {
        palette.isSelected[count] = false;
    }
    colourPicker.isSelected = true;
    updateView();
}

function paletteStyleClick(evt) {
    paletteStyle = evt.target.value;
    colourPicker.selectedColour = "#000000";
    for (let count = 0; count < palette.colours.length; count++) {
        palette.isSelected[count] = false;
    }
    colourPicker.isSelected = true;
    updateView();
}

function clearEasel() {
    saveHistory();
    for (let count = 0; count < easelSize; count++) {
        pixelColours[count] = "#ffffff";
    }
    updateView();
}

function undo() {
    if (history.length > 0) {
        lastSave = history.pop();
        for (let count = 0; count < easelSize; count++) {
            pixelColours[count] = lastSave[count];
        }
    }
    else {
        ;
    }
    updateView();
}

function changeGridSetting(evt) {
    gridLines = evt.target.checked;
    updateView();
}

function saveImage() {
    const canvas = document.createElement("canvas");        //create the canvas
    canvas.width = 2400;                                    //set the width in pixels
    canvas.height = 1200;                                   //set height in pixels
    const ctx = canvas.getContext("2d");                    //set the context (in this case 2 dimensional drawing)
    for (count = 0; count < easelSize; count++) {
        console.log(pixelColours[count]);
        ctx.fillStyle = pixelColours[count];
        quotient = Math.floor(count / 24);
        remainder = (count % 24);
        x_oordinate = remainder * 100;                //All rectangles are 100 x 100
        y_oordinate = quotient * 100;
        ctx.fillRect(x_oordinate, y_oordinate, 100, 100);
    }

    const tempDiv = document.createElement('div');
    tempDiv.removeAttribute("style");
    tempDiv.style.display = "none";
    const tempElement = document.createElement('a');       //create an html element where the canvas can be created
    tempDiv.appendChild(tempElement);
    const dataURL = canvas.toDataURL();
    tempElement.download = "pixelImage.png";               //name of download
    tempElement.href = dataURL;                                //create url for download
    tempElement.style.display = "none";                    //make sure element remains hidden
    document.body.appendChild(tempElement);                //add element to document body

    tempElement.click();

    tempElement.remove();
}

//Housekeeping (secondary) functions - are called during processing of an input (but not the first ones called)
function saveHistory() {   
    let currentState = []
    for (let count = 0; count < easelSize; count++) {
        currentState[count] = pixelColours[count];
    }
    if (history.length < 10) {
        history.push(currentState);
    }
    else {
        history.shift();                                        //If there are already ten images, the earliest is first removed.
        history.push(currentState);
    }
}

function getPixelValue(pixelString) {                           //On pixel click, this function returns the numerical value of the pixel.
    pixelString = pixelString.replace("pixel", "");
    pixelNumber = parseInt(pixelString) - 1;
    return pixelNumber;
}

String.prototype.convertToRGB = function(){
    if(this.length != 7){
        throw "Only 7-digit hex colors are allowed.";
    }
    else {
        let trimmedString = this.slice([1]);
        let RgbHex = trimmedString.match(/.{1,2}/g);
        let fullRgb = parseInt(RgbHex[0], 16) + " " + parseInt(RgbHex[1], 16) + " " + parseInt(RgbHex[2], 16);
        return fullRgb;
    }
}

//Update view functions - these refresh the page to display the new conditions.
function updateView() {                                         //Top-level refresh function called after each user input.
    updateEasel();
    updatePaletteAndPicker();
    updatePaletteStyle();
    updateGridLines();
}

function updateEasel() {
    for (let count = 0; count < (easelSize); count++) {
        onePlusCount = count + 1;
        pixelID = ("pixel" + onePlusCount);
        document.getElementById(pixelID).style.backgroundColor = (pixelColours[count]);
      }
}

function updatePaletteAndPicker() {
    for (let count = 0; count < (palette.colours.length); count++) {
        targetWell = palette.colours[count];
        if (palette.isSelected[count] === true) {
            document.getElementById(targetWell).style.border = palette.selectedBorderStyle[count];
        }
        else {
            document.getElementById(targetWell).style.border = palette.defaultBorderStyle[count];
        }
    }

    if (colourPicker.isSelected === true) {
        document.getElementById("colourPickerDiv").style.border = colourPicker.selectedBorderStyle;
    }
    else {
        document.getElementById("colourPickerDiv").style.border = colourPicker.unselectedBorderStyle;
    }
}

function updatePaletteStyle() {
    for (let count = 0; count < (palette.colours.length); count++) {
        let wellID = palette.colours[count];
        if (paletteStyle === "pastel") {
            document.getElementById(wellID).style.backgroundColor = palette.pastelValues[count];
        }
        else {
            document.getElementById(wellID).style.backgroundColor = palette.neonValues[count];
        }
    }                                                                                               //There is a bug here where the colour picker does not show the user a reversion to black.
}

function updateGridLines() {
    let easelGridElements = document.getElementsByTagName('td');
    for (count = 0; count < easelSize; count++) {
        let cell = easelGridElements[count];
        if (gridLines === true) {
            cell.style.border = "solid #d3d3d3 1px";
        }
        else {
            cell.style.border = "none";
        }
    }
}

//Data model initialisation
const easelSize = 288;                                          //Easel is 12 rows x 24 columns
const pixelColours = new Array(easelSize).fill("#ffffff");      //Initialise pixels as white. Numbering is row by row.
let brushColour = "#000000";                                  //Initialise paintbrush as black.
let paletteStyle = "pastel";                                  //Initialise palette colours as pastel option.
let gridLines = true;                                         //Initialise easel with gridlines shown.
let history = [];                         //Initialise array to contain historical record of pixel arrays
let fileSize = 50;                          //Size of file in pixels per actual drawn pixel. Default is 50.

const palette = {                                         //Colour selection with styles and hex values.
    colours: ["red", "orange", "yellow", "green", "blue", "pink", "purple", "brown", "white", "grey", "black"],
    pastelValues: ["#ffb3ba", "#ffdfba", "#ffffba", "#baffc9", "#bae1ff", "#f8c8dc", "#c3b1e1", "#b1907f", "#ffffff", "#b1b1b1", "#000000"],
    neonValues: ["#ff3800", "#ff6700", "#ffff33", "#74ee15", "#4deeea", "#f000ff", "#ab20fd", "#f1bc06", "#ffffff", "#b1b1b1", "#000000"],
    isSelected: [false, false, false, false, false, false, false, false, false, false, false],
    defaultBorderStyle: ["1px solid #000000", "1px solid #000000", "1px solid #000000", "1px solid #000000", "1px solid #000000", "1px solid #000000", "1px solid #000000", "1px solid #000000", "1px solid #000000", "1px solid #000000", "1px solid #ffffff"],
    selectedBorderStyle: ["3px dashed #ffffff", "3px dashed #ffffff", "3px dashed #ffffff", "3px dashed #ffffff", "3px dashed #ffffff", "3px dashed #ffffff", "3px dashed #ffffff", "3px dashed #ffffff", "3px dashed #000000", "3px dashed #ffffff", "3px dashed #ffffff"]
}

const colourPicker = {
    selectedColour : "#000000",
    isSelected : true,
    selectedBorderStyle : "3px dashed #989797",                  //The colour picker on black is set as the starting default.
    unselectedBorderStyle : "1px solid #ffffff"
}

//HTML binding
let easel = document.getElementById("easel");
let paletteWells = document.getElementsByClassName("paletteWell");
let customColourPicker = document.getElementById("colourPicker");
let pastelRadio = document.getElementById("pastel");
let neonRadio = document.getElementById("neon");
let clearButton = document.getElementById("clear");
let undoButton = document.getElementById("undo");
let gridLineSettingButton = document.getElementById("gridSetting");
let saveButton = document.getElementById("save");
let fileSizeInput = document.getElementById("fileSize");

//Event listeners
easel.addEventListener('click', evt => {pixelClick(evt)});
customColourPicker.addEventListener('input', evt => {customColour(evt)});
pastelRadio.addEventListener('input', evt => {paletteStyleClick(evt)});
neonRadio.addEventListener('input', evt => {paletteStyleClick(evt)});
clearButton.addEventListener('click', clearEasel);
undoButton.addEventListener('click', undo);
gridLineSettingButton.addEventListener('click', evt => {changeGridSetting(evt)});
saveButton.addEventListener('click', saveImage);


for (let i = 0; i < palette.colours.length; i++) {
    paletteWells[i].addEventListener("click", evt => {selectPaletteColour(evt.target.id)});
}