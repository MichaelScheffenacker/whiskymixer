const settings = require('./settings');
const dataAccess = require('./dataAccess');
const express = require('express');
const server = express();

const port = settings.port;

// server.use(express.static('static'));

let mixerData = {
    availableIngredients: ['<nothing>']
}



async function fetchAvailableIngredients() {
    try {
        mixerData.availableIngredients = await dataAccess.fetchMixerData(settings.fetchPaths.availableIngredients);
    } catch (error) {
        console.error(error);
    }
}

fetchAvailableIngredients();


server.listen(port, () => console.log(`listening on port ${port}`));

server.get('/', (req, res) => {
    res.send(mixerData.availableIngredients);
});
