const WebSocket = require('ws');
const Namespace = require('./namespace');
const Command = require('./command');
const fs = require('fs');
const StateManager = require('./stateManager');
var path = require('path');

// const test_functions = require('../functions/test_functions');

const stateManager = new StateManager();

// test_functions(stateManager);

const functions_path = './functions/';

fs.readdir(functions_path, (err, files) => {
    if (err) {
        console.log(err);
    }
    files.forEach(file => {
        let file_path = '.' + functions_path + path.parse(file).name;
        let file_function = require(file_path);
        file_function(stateManager);
    });
});

function startServer(options) {
    const wss = new WebSocket.Server({ port: options.port });

    wss.on('connection', ws => {
        ws.on('message', data => {
            console.log(data);
            let payload = JSON.parse(data);
            let cmd = stateManager.getCommand(payload.cmd);
            cmd.cmd((m) => {
                ws.send(JSON.stringify(m));
            }, payload.inputs);
        });
    });

    console.log(`Server running at http://localhost:${options.port}/`)
}

module.exports = startServer;