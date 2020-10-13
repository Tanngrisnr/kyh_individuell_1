// https://codepen.io/LSpell/pen/vwMKeP
//this pre-made javascript ensuraes keyboard accessibility for checkbox hack hamburger menu

//selects the html input[type=checkbox] tag
let toggleControl = document.querySelector("#checkbox1");
//selects interface toggle button
let toggleInterface = document.querySelector(".toggle");

//a function which checks if the enter or space key has been pressed.
//if the checkbox on which the hack relies is unchecked it gets checked and vice versa
function handleToggle(e) {
  if (e.keyCode == 32 || e.keyCode == 13) {
    toggleControl.checked = !toggleControl.checked;
  }
}
//eventlistener checking for keypresses on the hamburger menu toggle button
toggleInterface.addEventListener("keydown", handleToggle);
