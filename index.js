const settings = require('./settings');
const dataAccess = require('./dataAccess');
const express = require('express');
const {mapIngredientToCocktail, filterAvailableCocktails, groupCocktailCandidates} = require("./utils");
const server = express();

const port = settings.port;

// server.use(express.static('static'));

let availableIngredients;
let allIngredients;
let cocktailLookup;

async function fetchAvailableIngredients() {
    try {
        availableIngredients = await dataAccess.fetchMixerData(settings.fetchPaths.availableIngredients);
    } catch (error) {
        console.error(error);
    }
}

async function fetchAllIngredients() {
    try {
        allIngredients = await dataAccess.fetchMixerData(settings.fetchPaths.allIngredients);
    } catch (error) {
        console.error(error);
    }
}

async function fetchCocktails() {
    try {
        let cocktails = await dataAccess.fetchMixerData(settings.fetchPaths.cocktails);
        cocktailLookup = mapIngredientToCocktail(cocktails);
    } catch (error) {
        console.error(error);
    }
}

fetchAvailableIngredients();
fetchAllIngredients();
fetchCocktails();


server.listen(port, () => console.log(`listening on port ${port}`));

server.get('/', (req, res) => {
    res.send(availableIngredients);
});

server.get('/dingdong', (req, res) => {
    res.send({
        availableIngredients: availableIngredients,
        cocktailCandidates: groupCocktailCandidates(availableIngredients, cocktailLookup),
        availableCocktails: filterAvailableCocktails(availableIngredients, cocktailLookup),
        cocktailLookup: cocktailLookup
    });
});
