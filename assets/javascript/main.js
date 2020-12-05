console.log('René Goldschmid, Solo Web Engineering Project - Version 1.0');

import { toggleIsLoading } from './support.js';

var app = (function() {
    'use strict';

    let isLoading = false;

    let fetchDataFromApi = function(){
        let quotesCount = document.getElementById("quotes-count");
        let URL = "https://thesimpsonsquoteapi.glitch.me/quotes?count=" + quotesCount.value;

        if (!isLoading) {
            isLoading = toggleIsLoading(isLoading);

            // Ajax call with fetch API
            fetch(URL)
                .then(function(response) {
                    if(response.status !== 200){
                        console.log("Error: " + response.status);
                        isLoading = toggleIsLoading(isLoading);
                        return;
                    }
                    return response.json();//  Get the text in the response
                })
                .then(function(responseData) {
                    console.log('Request successful');
                    isLoading = toggleIsLoading(isLoading);
                    _processData(responseData);
                })
                .catch(function(error) {
                    console.log('Request failed', error)
                    isLoading = toggleIsLoading(isLoading);
                    // do something with error message
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
            let btn = document.createElement("button");

            li.textContent = quoteObj.quote + ' - ' + quoteObj.character;
            btn.textContent = "Add";
            btn.classList.add("btn", "btn-list");
            btn.addEventListener("click", function(){ _addToFavorites(this.closest("li")); });

            quotesList.append(li);
            li.append(btn);
        }

        let fetchBtn = document.getElementById("fetchDataBtn");
        fetchBtn.textContent = "More!";
    }

    // Add an item to the favorites list
    let _addToFavorites = function(listItem) {
        let favoritesList = document.getElementById("favorites-list");

        let clonedListItem = listItem.cloneNode(true);

        let btn = clonedListItem.getElementsByTagName("button")[0];
        btn.textContent = "Remove";
        btn.addEventListener("click", function(){ _removeFromFavorites(this.closest("li")); });

        favoritesList.append(clonedListItem);
        listItem.remove();
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

document.getElementById("fetchDataBtn").addEventListener('click', function() {
    app.fetchDataFromApi();
});

document.getElementById("clearDataBtn").addEventListener('click', function() {
    app.clearQuotesList();
});
