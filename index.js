const server = require('./src/server');
const client = require('./src/client');

server({ port: 8081 });
client({ port: 3000 });
