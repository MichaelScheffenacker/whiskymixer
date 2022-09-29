const settings = require('./settings');
const dataAccess = require('./dataAccess');
const express = require('express');
const {mapIngredientToCocktail, filterAvailableCocktails, groupCocktailCandidates} = require("./utils");
const server = express();

const port = settings.port;

let availableIngredients = [];
let allIngredients = [];
let cocktailLookup = [];
let cocktails = [];

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

async function fetchCocktails(callback) {
    try {
        cocktails = await dataAccess.fetchMixerData(settings.fetchPaths.cocktails);
        cocktailLookup = mapIngredientToCocktail(cocktails);
        callback();
    } catch (error) {
        console.error(error);
    }
}

fetchAvailableIngredients();
fetchAllIngredients();
fetchCocktails(() => {});


server.listen(port, () => console.log(`listening on port ${port}`));

server.get('/', (req, res) => {
    res.send({
        availableIngredients: availableIngredients,
        cocktailCandidates: groupCocktailCandidates(availableIngredients, cocktailLookup),
        cocktails: cocktails,
        allIngredients: allIngredients
    });
});

server.get('/dingdong', (req, res) => {
    res.send({
        availableIngredients: availableIngredients,
        availableCocktails: filterAvailableCocktails(availableIngredients, cocktailLookup)
    });
});

server.get('/dingdong/:ingredient', (req, res) => {
    let extendedIngredients = availableIngredients.concat([req.params.ingredient]);
    res.send( {
        availableIngredients: extendedIngredients,
        availableCocktails: filterAvailableCocktails(extendedIngredients, cocktailLookup)
    });
});

server.get('/askfriend', (req, res) => {
    fetchCocktails(() =>
        res.send( {
            cocktails: cocktails
        })
    );

});

server.get('*', function(req, res){
    res.sendStatus(404);
});
