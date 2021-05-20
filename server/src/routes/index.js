const fs = require('fs');

let files = fs.readdirSync(__dirname, { withFileTypes: true });

module.exports = (server) => {
    files.forEach(file => {
        if(file.name.toString() != 'index.js'){
            endpointName = file.name.toString().toLowerCase().replace('.js','');
            server.use(`/api/${endpointName}`,require( __dirname + '/' + file.name ));
        }
    });
};
