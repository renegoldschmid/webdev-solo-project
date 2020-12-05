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

/* Popper.js Specific */
const button = document.querySelector('#fetchDataBtn');
const tooltip = document.querySelector('#tooltip');

let popperInstance = null;

function create() {
    popperInstance = Popper.createPopper(button, tooltip, {
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: [0, 8],
                },
            },
        ],
    });
}

function destroy() {
    if (popperInstance) {
        popperInstance.destroy();
        popperInstance = null;
    }
}

function show() {
    tooltip.setAttribute('data-show', '');
    create();
}

function hide() {
    tooltip.removeAttribute('data-show');
    destroy();
}

const showEvents = ['mouseenter', 'focus'];
const hideEvents = ['mouseleave', 'blur'];

showEvents.forEach(event => {
    button.addEventListener(event, show);
});

hideEvents.forEach(event => {
    button.addEventListener(event, hide);
});

// Exports
export { toggleIsLoading };