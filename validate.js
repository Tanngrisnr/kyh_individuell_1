//https://www.w3schools.com/js/js_validation.asp form validation source/inspiration

//initialize global variables
let message = document.getElementById("message");
let inputs = document.getElementsByClassName("text-input");
//Validate that all inputs have been filled with the correct data
function validateForm() {
  //select form inputs
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value === "" || inputs[i].value === null) {
      message.textContent = `there are empty input fields`;

      return false;
    } else {
      message.textContent = `ready to roll`;
      return true;
    }
  }
  /* let contactName = document.forms["contactForm"]["contactName"];
  let subject = document.forms["contactForm"]["subject"];
  let email = document.forms["contactForm"]["email"];

  if (contactName.value === "" || subject.value === "" || email.value === "") {
    console.log("there is a missing value");
    message.textContent = "Error";
    return false;
  } else {
    console.log("this input has a value");
    return true;
  }*/
  //check input value
  //return false if invalid
  //return true if valid
}
