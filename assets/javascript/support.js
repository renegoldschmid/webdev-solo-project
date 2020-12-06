/* General Functions */
// Manages Loading-visualization
function toggleIsLoading(isLoading) {
    let loading = document.getElementById("loading");

    if (isLoading) {
        loading.textContent = "";
    } else {
        loading.textContent = "Loading...";
    }

    return !isLoading;
}

// Form validation
function validateForm() {
    // Clear errors
    let errors = document.getElementsByClassName("form-error");
    while(errors[0]) {
        errors[0].parentNode.removeChild(errors[0]);
    }

    // Registration Form
    let form = document.forms["registration-form"];

    // Validate Fields
    // Firstname
    let firstname = form["firstname"];
    // Lastname
    let lastname = form["lastname"];
    // E-Mail
    let email = form["email"];
    // Password
    let password = form["password"];
    
    let shouldFocus = true;

    if (firstname.value === "") {
        shouldFocus = _tryToFocus(firstname, shouldFocus);
        _createErrorBelow(firstname, "Please enter your first name!");
    }

    if (lastname.value === "") {
        shouldFocus = _tryToFocus(lastname, shouldFocus);
        _createErrorBelow(lastname, "Please enter your last name!");
    }

    if (email.value === "") {
        shouldFocus = _tryToFocus(email, shouldFocus);
        _createErrorBelow(email, "Please enter your E-Mail!");
    }

    if (password.value === "") {
        shouldFocus = _tryToFocus(password, shouldFocus);
        _createErrorBelow(password, "Please enter a password!");
    } else if (password.value.length < 8) {
        shouldFocus = _tryToFocus(password, shouldFocus);
        _createErrorBelow(password, "Your password is too short!");
    }

    // If shouldFocus got changed, an error happened
    if (!shouldFocus) {
        return false;
    }
    return true;
}

function _tryToFocus(target, shouldFocus) {
    if (shouldFocus) {
        target.focus();
        return !shouldFocus;
    }
    return shouldFocus;
}

function _createErrorBelow(target, message) {
    let errorLabel = document.createElement("span");
    errorLabel.textContent = message;
    errorLabel.classList.add("form-error");
    target.parentNode.insertBefore(errorLabel, target.nextSibling);
}

function greetUser() {
    const query = window.location.search;
    const params = new URLSearchParams(query);
    const firstname = params.get('firstname');
    const lastname = params.get('lastname');

    let greeting = document.getElementById('greeting');
    if (firstname !== null && lastname !== null) {
        greeting.textContent = 'Hello ' + firstname + ' ' + lastname + ', thanks for your registration!';
    } else {
        let successMsg = document.getElementsByClassName("success")[0];
        successMsg.parentNode.removeChild(successMsg);
        greeting.classList.add("form-error");
        greeting.textContent = "Don't try to cheat, you're not registered!";
    }
    
}

/* Popper.js Specific */
// Register a new tooltip (adds Event Handlers)
function registerTooltip(tooltip) {
    // Handle Show-Events
    tooltip.showEvents.forEach(event => {
        tooltip.button.addEventListener(event, function() {
            let mqMin = window.matchMedia('(min-width: 768px)');
            if (mqMin.matches) {
                tooltip.tooltipContainer.setAttribute('data-show', '');
                tooltip.createTooltip();
            }
        });
    });
    
    // Handle Hide-Events
    tooltip.hideEvents.forEach(event => {
        tooltip.button.addEventListener(event, function() {
            let mqMin = window.matchMedia('(min-width: 768px)');
            if (mqMin.matches) {
                tooltip.tooltipContainer.removeAttribute('data-show');
                tooltip.destroyTooltip();
            }
        });
    });
}

// Exports
export { toggleIsLoading, validateForm, greetUser, registerTooltip };