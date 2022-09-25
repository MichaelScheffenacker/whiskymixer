const https = require('https');
const express = require('express');
const server = express();

const port = 8501;

// server.use(express.static('static'));

server.listen(port, () => console.log(`listening on port ${port}`));

server.get('/', (req, res) => {

    https.get('https://cocktails.deno.dev/available-ingredients', res2 => {
        let body = '';
        res2.on('data', (chunk) => {
            body += chunk;
        });

        res2.on('end', () => {
            try {
                let json = JSON.parse(body);
                res.send(json);
            } catch (e) {
                res.send("adsf");
                console.error(e.message);
            }
        });

    }).on('error', (error) => {
        console.error(error.message);
    });
});
