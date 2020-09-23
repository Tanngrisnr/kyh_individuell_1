//https://www.w3schools.com/js/js_validation.asp form validation source/inspiration
//https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation further source/inspiration

//initialize global variables
const form = document.getElementsByTagName("form")[0];
const cname = document.getElementById("contactName");
const subject = document.getElementById("subject");
const email = document.getElementById("email");
const inputs = document.querySelectorAll("input");

// using a forEach loop to start regestering the different input elements
inputs.forEach((input) => {
  // Uses nextElementSibling to find the error-message <span> which is a sibling of each input
  const error = input.nextElementSibling;

  // skriv en universell click listener, lägg till varje input
  input.addEventListener("input", function () {
    if (input.validity.valid) {
      // In case there is an error message visible, if the field
      // is valid, we remove the error message.
      error.innerHTML = ""; // Reset the content of the message
      error.className = "error"; // Reset the visual state of the message
    } else {
      // If there is still an error, show the correct error
      switch (input.name) {
        case "contactName":
          showError(input);
          break;
        case "email":
          showError(input);
          break;
        case "subject":
          showError(input);
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
    showError(subject);
    // Then we prevent the form from being sent by canceling the event
  } else if (!cname.validity.valid) {
    // If it isn't, we display an appropriate error message
    showError(cname);
    // Then we prevent the form from being sent by canceling the event
  } else if (!email.validity.valid) {
    // If it isn't, we display an appropriate error message
    showError(email);
    // Then we prevent the form from being sent by canceling the event
  }
});

// Semi-universal showError function
function showError(field) {
  // Recieves parametersin the form of an <input> tag
  // Selects the span.error tag which constitutes the error message field using nextElementSibling
  const error = field.nextElementSibling;

  if (field.validity.valueMissing) {
    // If the field is empty
    // display the following error message.
    error.textContent = `You need to enter a ${field.placeholder}.`;
  } else if (field.validity.typeMismatch) {
    // if the field has the wrong value
    // display the following error message.
    error.textContent = `the entered value needs to be ${field.type}.`;
  } else if (field.validity.tooShort) {
    // If the value is too short
    // display the following error message.
    error.textContent = `Your ${field.placeholder} should be at least ${field.minLength} characters; you entered ${field.value.length}.`;
  }

  // Set the styling appropriately
  error.className = "error active";
}

/*function showErrorName() {
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
}*/
