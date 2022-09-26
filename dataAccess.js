const https = require("https");
module.exports = {
    fetchMixerData: function(fetchPath) {
        return new Promise((resolve, reject) => {
            https.get(fetchPath, res => {

                let body = '';
                res.on('data', (chunk) => {
                    body += chunk;
                });

                res.on('end', () => {
                    try {
                        resolve(JSON.parse(body));
                    } catch (error) {
                        reject(`failed to parse ${body}`);
                    }
                });

            }).on('error', (error) => {
                reject(`failed to fetch ${fetchPath}: ${error}`);
            });
        });

    }
}