const settings = require('./settings');
const https = require('https');
const express = require('express');
const server = express();

const port = settings.port;

// server.use(express.static('static'));

let mixerData = {
    availableIngredients: ['<nothing>']
}

let fetchMixerData = function(fetchPath) {
    https.get(fetchPath, res => {
        let body = '';
        res.on('data', (chunk) => {
            body += chunk;
        });

        res.on('end', () => {
            try {
                mixerData.availableIngredients = JSON.parse(body);
            } catch (error) {
                console.error(error.message);
                mixerData.availableIngredients = '<nothing>';
            }
        });

    }).on('error', (error) => {
        console.error(error.message);
    });
};
fetchMixerData(settings.fetchPaths.availableIngredients);

server.listen(port, () => console.log(`listening on port ${port}`));

server.get('/', (req, res) => {
    res.send(mixerData.availableIngredients);
});
