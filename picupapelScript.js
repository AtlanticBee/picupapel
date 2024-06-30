"use strict";

function clickHandler(clickedElementName){
    if ((clickedElementName === "dropDownButton" || clickedElementName === "dropDownButtonLine1"|| clickedElementName === "dropDownButtonLine2"|| clickedElementName === "dropDownButtonLine3") && menuVisibility === 0){
        dropDownMenu.style.visibility = "visible";
        menuVisibility = 1;
        if (verboseLog === 0){
            ;
        }
        else {
            console.log("showing drop down menu");
        }
    }
    else {
        dropDownMenu.style.visibility = "hidden";
        menuVisibility = 0;
        if (verboseLog === 0){
            ;
        }
        else {
            console.log("hiding drop down menu");
        }
    }
}


let dropDownMenu = document.getElementById("dropDownMenu");
let menuVisibility = 0;
let verboseLog = 0;
document.addEventListener("click", (evt) => {clickHandler(evt.target.id)});