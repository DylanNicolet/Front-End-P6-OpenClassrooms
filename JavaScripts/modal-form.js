//DOM elements
const modalFormBackground = document.getElementById("modal-form__bg");
const modalForm = document.getElementById("modal-form");
const firstNameInput = document.getElementById("first-name__input");
const lastNameInput = document.getElementById("last-name__input");
const emailInput = document.getElementById("email__input");
const messageInput = document.getElementById('message__input');
const sendButton = document.getElementById("modal-form__send-button");
const ModalFormCloseButton = document.getElementById("modal-form__close-button");
const invalidFirstName = document.getElementById("invalid-first-name");
const invalidLastName = document.getElementById("invalid-last-name");
const invalidEmail = document.getElementById("invalid-email");

//open modal form
contactButton.addEventListener("click", () => {             
    mainSection.setAttribute("aria-hidden", "true");
    modalFormBackground.setAttribute("aria-hidden", "false");
    modalFormBackground.classList.remove("modal-form--closed");
    modalFormBackground.classList.add("modal-form--openned");       
    body.style.overflow = "hidden";
    window.setTimeout(() => ModalFormCloseButton.focus(), 0);
    ModalFormCloseButton.setAttribute("tabindex", "0");
})


// validate First name (returns true or false)
function validateFirstName(firstName){
    let firstNamePattern = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/;
    return firstNamePattern.test(firstName);
}

// validate Last name (returns true or false)
function validateLastName(lastName){
    let lastNamePattern = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/;
    return lastNamePattern.test(lastName);
}

// validate EMail (returns true or false)
function validateEmail(email){      
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
}

//Add visual feedback for invalid input
sendButton.addEventListener("click", () => {
    if(!validateFirstName(firstNameInput.value) || firstNameInput.value.length<2){
        invalidFirstName.style.opacity = "1";
        invalidFirstName.setAttribute("aria-hidden", "false");
        firstNameInput.setAttribute("aria-invalid", "true");
        firstNameInput.style.borderStyle = "solid";
    } else {
        invalidFirstName.style.opacity = "0";
        invalidFirstName.setAttribute("aria-hidden", "true");
        firstNameInput.setAttribute("aria-invalid", "false");
        firstNameInput.style.borderStyle = "none";
    }
    if(!validateLastName(lastNameInput.value) || lastNameInput.value.length<2){
        invalidLastName.style.opacity = "1";
        invalidLastName.setAttribute("aria-hidden", "false");
        lastNameInput.setAttribute("aria-invalid", "true");
        lastNameInput.style.borderStyle = "solid";
    } else {
        invalidLastName.style.opacity = "0";
        invalidLastName.setAttribute("aria-hidden", "true");
        lastNameInput.setAttribute("aria-invalid", "false");
        lastNameInput.style.borderStyle = "none";
    }
    if(!validateEmail(emailInput.value)){
        invalidEmail.style.opacity = "1";
        invalidEmail.setAttribute("aria-hidden", "false");
        emailInput.setAttribute("aria-invalid", "true");
        emailInput.style.borderStyle = "solid";
    } else {
        invalidEmail.style.opacity = "0";
        invalidEmail.setAttribute("aria-hidden", "true");
        emailInput.setAttribute("aria-invalid", "false");
        emailInput.style.borderStyle = "none";
    }
})

//validate all input and close modal-form
function validate(){
    if(validateFirstName(firstNameInput.value) && validateLastName(lastNameInput.value) && validateEmail(emailInput.value)){
        console.log("First name: " + firstNameInput.value);
        console.log("Last name: " + lastNameInput.value);
        console.log("Email adress: " + emailInput.value);
        console.log("User Message: " + messageInput.value);
        closeModalForm();
        firstNameInput.setAttribute("aria-invalid", "false");
        lastNameInput.setAttribute("aria-invalid", "false");
        emailInput.setAttribute("aria-invalid", "false");
        invalidFirstName.style.opacity = "0";
        invalidLastName.style.opacity = "0";
        invalidEmail.style.opacity = "0";
        invalidFirstName.setAttribute("aria-hidden", "true");
        invalidLastName.setAttribute("aria-hidden", "true");
        invalidEmail.setAttribute("aria-hidden", "true");
        firstNameInput.style.borderStyle = "none";
        lastNameInput.style.borderStyle = "none";
        emailInput.style.borderStyle = "none";
    }
};

//constrain focus inside modal form
document.addEventListener("keydown", (e) => {
    let isTabPressed = e.key === "Tab";

    if(!isTabPressed){
        return;
    }

    if(e.shiftKey){
        if(document.activeElement === ModalFormCloseButton){
            sendButton.focus();
            e.preventDefault();
        }
    } else {
        if(document.activeElement === sendButton){
            ModalFormCloseButton.focus();
            e.preventDefault();
        }
    }
});


//function to close modal form
function closeModalForm() {
    modalForm.reset();
    mainSection.setAttribute("aria-hidden", "false");
    modalFormBackground.setAttribute("aria-hidden", "true");
    modalFormBackground.classList.remove("modal-form--openned");
    modalFormBackground.classList.add("modal-form--closed");
    body.style.overflow = "visible";
    invalidFirstName.style.opacity = "0";
    invalidLastName.style.opacity = "0";
    invalidEmail.style.opacity = "0";
    invalidFirstName.setAttribute("aria-hidden", "true");
    invalidLastName.setAttribute("aria-hidden", "true");
    invalidEmail.setAttribute("aria-hidden", "true");
    firstNameInput.style.borderStyle = "none";
    lastNameInput.style.borderStyle = "none";
    emailInput.style.borderStyle = "none";
}

//close button functionality
ModalFormCloseButton.addEventListener("click", () => {
    closeModalForm();
});

//close button with enter key
ModalFormCloseButton.addEventListener("keydown", (e) => {
    if (modalFormBackground.getAttribute("aria-hidden") == 'false' && e.key == "Enter") {
        closeModalForm();
    }
});

//close modal-form when escape key is pressed
window.addEventListener("keydown", (e) => {
    if (modalFormBackground.getAttribute("aria-hidden") == 'false' && e.key == "Escape") {
        closeModalForm();
    }
});