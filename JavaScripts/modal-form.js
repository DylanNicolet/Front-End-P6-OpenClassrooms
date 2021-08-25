//DOM elements
const modalFormBackground = document.getElementById("modal-form__bg");
const modalForm = document.getElementById("modal-form");
const firstNameInput = document.getElementById("first-name__input");
const lastNameInput = document.getElementById("last-name__input");
const emailInput = document.getElementById("email__input");
const messageInput = document.getElementById('message__input');
const sendButton = document.getElementById("modal-form__send-button");
const ModalFormCloseButton = document.getElementById("modal-form__close-button")

//open modal form
contactButton.addEventListener("click", () => {
    modalFormBackground.classList.remove("modal-form--closed");
    modalFormBackground.classList.add("modal-form--openned");
    modalForm.setAttribute("open", "");
})


// validate First name (returns true or false)
function validateFirstName(){
    let firstNamePattern = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/;
    return firstNamePattern.test(firstNameInput.value);
}

// validate Last name (returns true or false)
function validateLastName(){
    let lastNamePattern = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/;
    return lastNamePattern.test(lastNameInput.value);
}

// validate EMail (returns true or false)
function validateEmail(){      
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(emailInput.value);
    }

//Add visual feedback for invalid input
sendButton.addEventListener("click", () => {
    if(!validateFirstName()){
        firstNameInput.classList.add("invalid-data");
        firstNameInput.value = "Please enter a valid first name";
        firstNameInput.addEventListener("click", () => {
            firstNameInput.value = "";
        })
    }
    if(!validateLastName()){
        lastNameInput.classList.add("invalid-data");
        lastNameInput.value = "Please enter a valid last name";
        lastNameInput.addEventListener("click", () => {
            lastNameInput.value = "";
        })
    }
    if(!validateEmail()){
        emailInput.classList.add("invalid-data");
        emailInput.value = "Please enter a valid Email adress";
        emailInput.addEventListener("click", () => {
            emailInput.value = "";
        })
    }

    //validate all input and close modal-form
    if(validateFirstName() && validateLastName() && validateEmail()){
        console.log("First name: " + firstNameInput.value);
        console.log("Last name: " + lastNameInput.value);
        console.log("Email adress: " + emailInput.value);
        console.log("User Message: " + messageInput.value);
        modalFormBackground.classList.remove("modal-form--openned");
        modalFormBackground.classList.add("modal-form--closed");
    }
    
})

//close button functionality
ModalFormCloseButton.addEventListener("click", () => {
    modalFormBackground.classList.remove("modal-form--openned");
    modalFormBackground.classList.add("modal-form--closed");
    modalForm.removeAttribute("open");
})