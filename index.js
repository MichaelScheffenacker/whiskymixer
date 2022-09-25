const https = require('https');
const express = require('express');
const server = express();

const port = 8501;

// server.use(express.static('static'));

let mixerData = {
    available_ingredients: ['<nothing>']
}

let fetch_available_ingredients = function() {
    https.get('https://cocktails.deno.dev/available-ingredients', res => {
        let body = '';
        res.on('data', (chunk) => {
            body += chunk;
        });

        res.on('end', () => {
            try {
                mixerData.available_ingredients = JSON.parse(body);
            } catch (error) {
                console.error(error.message);
                mixerData.available_ingredients = '<nothing>';
            }
        });

    }).on('error', (error) => {
        console.error(error.message);
    });
};
fetch_available_ingredients();

server.listen(port, () => console.log(`listening on port ${port}`));

server.get('/', (req, res) => {
    res.send(mixerData.available_ingredients);
});
