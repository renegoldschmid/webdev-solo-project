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
        // TODO: E-Mail validation
        shouldFocus = _tryToFocus(email, shouldFocus);
        _createErrorBelow(email, "Please enter your E-Mail!");
    }

    if (password.value === "") {
        // TODO: password validation
        shouldFocus = _tryToFocus(password, shouldFocus);
        _createErrorBelow(password, "Please enter a password!");
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

/* Popper.js Specific */
// Register a new tooltip (adds Event Handlers)
function registerTooltip(tooltip) {
    // Handle Show-Events
    tooltip.showEvents.forEach(event => {
        tooltip.button.addEventListener(event, function() {
            tooltip.tooltipContainer.setAttribute('data-show', '');
            tooltip.createTooltip();
        });
    });
    
    // Handle Hide-Events
    tooltip.hideEvents.forEach(event => {
        tooltip.button.addEventListener(event, function() {
            tooltip.tooltipContainer.removeAttribute('data-show');
            tooltip.destroyTooltip();
        });
    });
}

// Exports
export { toggleIsLoading, validateForm, registerTooltip };