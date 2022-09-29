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

async function fetchAvailableIngredients(callback) {
    try {
        availableIngredients = await dataAccess.fetchMixerData(settings.fetchPaths.availableIngredients);
        callback()
    } catch (error) {
        console.error(error);
    }
}

async function fetchAllIngredients() {
    try {
        let allIngredientsRaw = await dataAccess.fetchMixerData(settings.fetchPaths.allIngredients);
        allIngredients = allIngredientsRaw.map(ingredient => ingredient.name);
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

fetchAvailableIngredients(() => {});
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
    let newIngredient = req.params.ingredient;
    if (allIngredients.includes(newIngredient)) {
        let extendedIngredients = availableIngredients.concat([newIngredient]);
        res.send( {
            availableIngredients: extendedIngredients,
            availableCocktails: filterAvailableCocktails(extendedIngredients, cocktailLookup)
        });
    } else {
        res.status(400).send('Ingredient not included');
    }

});

server.get('/changedate', (req, res) => {
    fetchAvailableIngredients(() =>
        res.send({
            availableIngredients: availableIngredients,
            availableCocktails: filterAvailableCocktails(availableIngredients, cocktailLookup)
        })
    );
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
