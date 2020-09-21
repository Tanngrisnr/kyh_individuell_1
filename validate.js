//https://www.w3schools.com/js/js_validation.asp form validation source/inspiration
//https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation further source/inspiration

//initialize global variables
//Validate that all inputs have been filled with the correct data
const form = document.getElementsByTagName("form")[0];

const cname = document.getElementById("contactName");
const subject = document.getElementById("subject");
const email = document.getElementById("email");
const nameError = document.querySelector("#contactName + span.error");
const subjectError = document.querySelector("#subject + span.error");
const emailError = document.querySelector("#email + span.error");

const inputs = document.querySelectorAll("input");
console.log(inputs);
/* 
form.addEventListener("input", (e) => {
  let error = e.target.nextElementSibling;
  if (e.target.validity.valid) {
    // In case there is an error message visible, if the field
    // is valid, we remove the error message.
    error.innerHTML = ""; // Reset the content of the message
    error.className = "error"; // Reset the visual state of the message
  } else {
    // If there is still an error, show the correct error
  }
  console.log(e.target);
});
 */
inputs.forEach((input) => {
  // givet ett input, hitta dess error-span
  const error = input.nextElementSibling;
  console.log(error);

  // skriv en universell click listener, lägg till varje input
  input.addEventListener("input", function (event) {
    if (input.validity.valid) {
      // In case there is an error message visible, if the field
      // is valid, we remove the error message.
      error.innerHTML = ""; // Reset the content of the message
      error.className = "error"; // Reset the visual state of the message
    } else {
      // If there is still an error, show the correct error
      switch (input.name) {
        case "contactName":
          showErrorName();
          break;
        case "email":
          showErrorEmail();
          break;
        case "subject":
          showErrorSubject();
          break;
      }
    }
  });
});

form.addEventListener("submit", function (event) {
  // if the form contains valid data, we let it submit
  event.preventDefault();
  /* inputs.forEach(function (input) {
    input.checkValidity();
  });
 */

  if (!subject.validity.valid) {
    // If it isn't, we display an appropriate error message
    showErrorSubject();
    // Then we prevent the form from being sent by canceling the event
  } else if (!cname.validity.valid) {
    // If it isn't, we display an appropriate error message
    showErrorName();
    // Then we prevent the form from being sent by canceling the event
  } else if (!email.validity.valid) {
    // If it isn't, we display an appropriate error message
    showErrorEmail();
    // Then we prevent the form from being sent by canceling the event
  }
});

function showErrorName() {
  if (cname.validity.valueMissing) {
    // If the field is empty
    // display the following error message.
    nameError.textContent = "You need to enter a name.";
  } else if (cname.validity.tooShort) {
    // If the data is too short
    // display the following error message.
    nameError.textContent = `Name should be at least ${cname.minLength} characters; you entered ${cname.value.length}.`;
  }

  // Set the styling appropriately
  nameError.className = "error active";
}

function showErrorSubject() {
  if (subject.validity.valueMissing) {
    // If the field is empty
    // display the following error message.
    subjectError.textContent = "You need to enter a subject.";
  } else if (subject.validity.tooShort) {
    // If the data is too short
    // display the following error message.
    subjectError.textContent = `subject should be at least ${subject.minLength} characters; you entered ${subject.value.length}.`;
  }

  // Set the styling appropriately
  subjectError.className = "error active";
}

function showErrorEmail() {
  if (email.validity.valueMissing) {
    // If the field is empty
    // display the following error message.
    emailError.textContent = "You need to enter an e-mail address.";
  } else if (email.validity.typeMismatch) {
    // If the field doesn't contain an email address
    // display the following error message.
    emailError.textContent = "Entered value needs to be an e-mail address.";
  } else if (email.validity.tooShort) {
    // If the data is too short
    // display the following error message.
    emailError.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
  }

  // Set the styling appropriately
  emailError.className = "error active";
}
