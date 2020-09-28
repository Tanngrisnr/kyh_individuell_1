//https://www.w3schools.com/js/js_validation.asp form validation source/inspiration
//https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation further source/inspiration

//initialize global variables
const form = document.getElementsByTagName("form")[0];
const cname = document.querySelector("#contactName");
const subject = document.querySelector("#subject");
const email = document.querySelector("#email");
const inputs = document.querySelectorAll("input");
const cList = document.querySelector(".contact-list");
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

//https://thecodingpie.com/post/how-to-build-a-todo-list-app-with-javascript-and-local-storage/
//handling submit and creating a list
// add an eventListener on form, and listen for submit event
form.addEventListener("submit", function (event) {
  // prevent the page from reloading when submitting the form
  event.preventDefault();
  addContact(cname.value, email.value, subject.value); // call addTodo function with input box current value
  //clear input values
  inputs.value = "";
});

// function to add todo
function addContact(n, e, s) {
  // if item is not empty
  let arr = [n, e, s];

  for (let i = 0; i < arr.length; i++) {
    if (arr.value !== "") {
      // make a todo object, which has id, name, and completed properties
      const listItem = {
        id: Date.now(),
        name: n,
        email: e,
        subject: s,
        completed: false,
      };
      contacts.push(listItem);
      arr.value = "";
    }

    // then add it to todos array
    //addToLocalStorage(contacts); // then renders them between <ul>
  }
}
// function to render given todos to screen
function renderContacts(contacts) {
  // clear everything inside <ul> with class=todo-items
  cList.innerHTML = "";

  // run through each item inside todos
  contacts.forEach(function (item) {
    // check if the item is completed
    const checked = item.completed ? "checked" : null;

    // make a <li> element and fill it
    // <li> </li>
    const li = document.createElement("li");
    // <li class="item"> </li>
    li.setAttribute("class", "item");
    // <li class="item" data-key="20200708"> </li>
    li.setAttribute("data-key", item.id);
    /* <li class="item" data-key="20200708"> 
            <input type="checkbox" class="checkbox">
            Go to Gym
            <button class="delete-button">X</button>
          </li> */
    // if item is completed, then add a class to <li> called 'checked', which will add line-through style
    if (item.completed === true) {
      li.classList.add("checked");
    }

    li.innerHTML = `
        <input type="checkbox" class="checkbox" ${checked}> <br>
        ${item.name}<br>
        ${item.email}<br>
        ${item.subject}
        <button class="delete-button">X</button>
      `;
    // finally add the <li> to the <ul>
    cList.append(li);
  });
}
function addToLocalStorage(contacts) {
  localStorage.setItem("contacts", JSON.stringify(contacts));

  renderContacts(contacts);
}
// function helps to get everything from local storage
function getFromLocalStorage() {
  const reference = localStorage.getItem("contacts");
  // if reference exists
  if (reference) {
    // converts back to array and store it in todos array
    contacts = JSON.parse(reference);
    renderContacts(contacts);
  }
}

// toggle the value to completed and not completed
function toggle(id) {
  contacts.forEach(function (item) {
    // use == not ===, because here types are different. One is number and other is string
    if (item.id == id) {
      // toggle the value
      item.completed = !item.completed;
    }
  });

  addToLocalStorage(contacts);
}

// deletes a todo from todos array, then updates localstorage and renders updated list to screen
function deleteContact(id) {
  // filters out the <li> with the id and updates the todos array
  contacts = contacts.filter(function (item) {
    // use != not !==, because here types are different. One is number and other is string
    return item.id != id;
  });

  // update the localStorage
  addToLocalStorage(contacts);
}

// initially get everything from localStorage
getFromLocalStorage();

// after that addEventListener <ul> with class=todoItems. Because we need to listen for click event in all delete-button and checkbox
cList.addEventListener("click", function (event) {
  // check if the event is on checkbox
  if (event.target.type === "checkbox") {
    // toggle the state
    toggle(event.target.parentElement.getAttribute("data-key"));
  }

  // check if that is a delete-button
  if (event.target.classList.contains("delete-button")) {
    // get id from data-key attribute's value of parent <li> where the delete-button is present
    deleteContact(event.target.parentElement.getAttribute("data-key"));
  }
});
