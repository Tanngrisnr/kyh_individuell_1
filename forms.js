//https://www.w3schools.com/js/js_validation.asp form validation source/inspiration
//https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation further source/inspiration for validation
//https://thecodingpie.com/post/how-to-build-a-todo-list-app-with-javascript-and-local-storage/ source/inspiration for contact list

//initialize global variables
const form = document.getElementsByTagName("form")[0];
const cname = document.getElementById("contactName");
const subject = document.getElementById("subject");
const email = document.getElementById("email");
const completion = document.getElementById("completion");
const inputs = document.querySelectorAll("form input");
const cList = document.getElementById("contact-list");
//list of items for contact list
let contacts = [];
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
  }
  getInputValues();
  form.reset();
  form.style.display = "none";
  completion.textContent = "thank you for your submission.";
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

function getInputValues() {
  let values = [];
  inputs.forEach((input) => {
    values.push(input.value);
  });
  createContact(values);
}

function createContact(arr) {
  const contact = {
    id: Date.now(),
    name: arr[0],
    email: arr[1],
    subject: arr[2],
  };
  contacts.push(contact);
  addToLocalStorage(contacts);
}

function renderContacts(items) {
  cList.innerHTML = "";

  items.forEach((item) => {
    const li = document.createElement("li");

    li.setAttribute("class", "item");
    li.setAttribute("data-key", item.id);

    li.innerHTML = `
    <ul class="nested">
    <li>Name: ${item.name}</li>
    <li>Email: ${item.email}</li>
    <li>Subject: ${item.subject}</li>
    </ul>
    `;
    console.log(items);
    cList.append(li);
  });
}

function addToLocalStorage(arr) {
  localStorage.setItem("contacts", JSON.stringify(arr));
  renderContacts(contacts);
}
function getFromLocalStorage() {
  const reference = localStorage.getItem("contacts");

  if (reference) {
    contacts = JSON.parse(reference);
    renderContacts(contacts);
  }
}
getFromLocalStorage();
