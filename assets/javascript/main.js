console.log('René Goldschmid, Solo Web Engineering Project - Version 1.0');

import { toggleIsLoading, registerTooltip, greetUser, validateForm } from './support.js';
import Tooltip from './tooltip.js';

/*
## Example of the Data returned by the Api (With count = 2)

[
    {
        character: "Troy McClure"
        characterDirection: "Right"
        image: "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FTroyMcClure.png?1497567511112"
        quote: "Ahh! Sweet liquor eases the pain."
    },
    {
        character: "Bart Simpson"
        characterDirection: "Right"
        image: "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FBartSimpson.png?1497567511638"
        quote: "Nothing you say can upset us. We're the MTV generation."
    }
]

*/

var app = (function() {
    'use strict';

    let isLoading = false;

    let fetchDataFromApi = function(){
        let quotesCount = document.getElementById("quotes-count");
        let URL = "https://thesimpsonsquoteapi.glitch.me/quotes?count=" + quotesCount.value;

        if (!isLoading) {
            isLoading = toggleIsLoading(isLoading);

            // Fetching data asynchronously using the fetch API
            fetch(URL)
                .then(function(response) {
                    if(response.status !== 200){
                        isLoading = toggleIsLoading(isLoading);
                        // Error message
                        let loadingContainer = document.getElementById("loading");
                        loadingContainer.textContent = "Oops, something went wrong! (Status: " + response.status + ")";
                        return;
                    }
                    return response.json();
                })
                .then(function(responseData) {
                    isLoading = toggleIsLoading(isLoading);
                    _processData(responseData);
                })
                .catch(function(error) {
                    isLoading = toggleIsLoading(isLoading);
                    // Error message
                    let loadingContainer = document.getElementById("loading");
                    loadingContainer.textContent = "Oops, something went wrong!";
                });
        }
    }

    // Clear the list of quotes
    let clearQuotesList = function() {
        let quotesList = document.getElementById("quotes-list");

        while (quotesList.hasChildNodes()) {
            quotesList.removeChild(quotesList.childNodes[0]);
        }

        let fetchBtn = document.getElementById("fetchDataBtn");
        fetchBtn.textContent = "Get Quotes!";
    }

    // Process the data received from the API
    let _processData = function(data) {
        let quotesList = document.getElementById("quotes-list");

        for (let quoteObj of data) {
            let li = document.createElement("li");
            let textContainer = document.createElement("div");
            let btnContainer = document.createElement("div");
            let btn = document.createElement("button");

            textContainer.classList.add("text-container");
            textContainer.textContent = quoteObj.quote + ' - ' + quoteObj.character;
            btnContainer.classList.add("button-container");

            btn.textContent = "Add";
            btn.classList.add("btn", "btn-list");
            btn.addEventListener("click", function(){ _addToFavorites(this.closest("li"), quoteObj); });

            quotesList.append(li);
            btnContainer.append(btn);
            li.append(textContainer);
            li.append(btnContainer);
        }

        let fetchBtn = document.getElementById("fetchDataBtn");
        fetchBtn.textContent = "More!";
    }

    // Add an item to the favorites list
    let _addToFavorites = function(listItem, quoteObj) {
        let favoritesList = document.getElementById("favorites-list");

        let clonedListItem = listItem.cloneNode(true);

        let btn = clonedListItem.getElementsByTagName("button")[0];
        btn.textContent = "Remove";
        btn.addEventListener("click", function(){ _removeFromFavorites(this.closest("li")); });

        favoritesList.append(clonedListItem);
        listItem.remove();

        // Add Detail Button
        let detailBtn = document.createElement("button");
        detailBtn.textContent = "Details";
        detailBtn.classList.add("btn", "btn-list", "btn-detail");
        let btnContainer = clonedListItem.getElementsByClassName('button-container')[0];
        btnContainer.append(detailBtn);

        // Add Tooltip
        let tooltipContainer = document.createElement("div");
        tooltipContainer.classList.add("tooltip");
        clonedListItem.append(tooltipContainer);

        // Add Arrow
        let arrow = document.createElement("div");
        arrow.classList.add("arrow");
        arrow.setAttribute("data-popper-arrow", '');
        tooltipContainer.append(arrow);

        // Get Image
        let image = document.createElement("img");
        image.src = quoteObj.image;
        image.alt = quoteObj.character;
        image.classList.add("detail-tooltip-image");
        tooltipContainer.append(image);

        // Get Character
        let character = document.createElement("p");
        character.textContent = quoteObj.character;
        character.classList.add("detail-tooltip-character");
        tooltipContainer.append(character);

        // Register Tooltip
        let tooltip = new Tooltip(detailBtn, tooltipContainer, 'right');
        registerTooltip(tooltip);
    }

    // Remove an item from the favorites list
    let _removeFromFavorites = function(listItem) {
        listItem.remove();
    }

    // Public functions
    return {
        fetchDataFromApi: fetchDataFromApi,
        clearQuotesList: clearQuotesList
    }
}());

if (title === 'home') {
    document.getElementById("registration-form").onsubmit = function() {
        return validateForm();
    };

} else if (title === 'contents') {
    document.getElementById("fetchDataBtn").addEventListener('click', function() {
        app.fetchDataFromApi();
    });
    
    document.getElementById("clearDataBtn").addEventListener('click', function() {
        app.clearQuotesList();
    });

    const button = document.querySelector('#fetchDataBtn');
    const tooltip = document.querySelector('#tooltip');
    let tool1 = new Tooltip(button, tooltip, 'top');
    registerTooltip(tool1);

    const button2 = document.querySelector('#clearDataBtn');
    const tooltip2 = document.querySelector('#tooltip2');
    let tool2 = new Tooltip(button2, tooltip2, 'right');
    registerTooltip(tool2);

} else if (title === 'registered') {
    greetUser();
}
