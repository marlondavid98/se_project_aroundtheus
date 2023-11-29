const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

function enableValidation(options) {
  const formElements = [...document.querySelectorAll(options.formSelector)];
  formElements.forEach((formElement) => {
    formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    setEventListeners(formElement, options);
  });
}

function setEventListeners(formElement, options) {
  const { inputSelector } = options;
  const { submitButtonSelector } = options;
  const inputElements = [...formElement.querySelectorAll(inputSelector)];
  const submitBtn = formElement.querySelector(submitButtonSelector);
  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", (e) => {
      checkInputValidity(formElement, inputElement, options);
      toggleButtonState(inputElements, submitBtn, options);
    });
  });
}

function checkInputValidity(formElement, inputElement, options) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, options);
  } else {
    hideInputError(formElement, inputElement, options);
  }
}

function showInputError(formElement, inputElement, object) {
  const { errorClass } = object;
  const { inputErrorClass } = object;
  const errorMessageElement = formElement.querySelector(
    "#" + inputElement.id + "-error"
  );
  console.log("#" + inputElement.id);
  const errorBorderElement = formElement.querySelector("#" + inputElement.id);
  errorBorderElement.classList.add(inputErrorClass);
  errorMessageElement.textContent = inputElement.validationMessage;
  errorMessageElement.classList.add(errorClass);
}

function hideInputError(formElement, inputElement, object) {
  const { errorClass } = object;
  const { inputErrorClass } = object;
  const errorMessageElement = formElement.querySelector(
    "#" + inputElement.id + "-error"
  );
  errorMessageElement.classList.remove(inputErrorClass);
  errorMessageElement.textContent = "";
  errorMessageElement.classList.remove(errorClass);
}

function toggleButtonState(inputElements, submitBtn, options) {
  let foundInvalid = false;
  const { inactiveButtonClass } = options;
  inputElements.forEach((inputElement) => {
    if (!inputElement.validity.valid) {
      foundInvalid = true;
    }
  });
  if (foundInvalid) {
    submitBtn.classList.add(inactiveButtonClass);
    submitBtn.dissabled = true;
  } else {
    submitBtn.classList.remove(inactiveButtonClass);
    submitBtn.dissabled = false;
  }
}
enableValidation(config);
