const address = 'ws://127.0.0.1:8081/';
const connection = new WebSocket(address);
const mainInput = document.getElementById('user-input');
const commandHistory = document.getElementById('command-history');

addLine(`connected to ${address} at ${moment().format()}`);

connection.onmessage = evt => { 
        const data = JSON.parse(evt.data);
        addLine(data.message);
    }

function addLine(lineText) {
    let newSpan = document.createElement("span");
    let newContent = document.createTextNode(lineText);
    newSpan.appendChild(newContent);
    commandHistory.appendChild(newSpan);
    commandHistory.appendChild(document.createElement('br'));
}

function send(cmd_text) {
    if (cmd_text === 'clear') {
        commandHistory.innerHTML = '';
    } else {
        connection.send(JSON.stringify(parseCmdText(cmd_text)));
    }
    mainInput.value = "";
}

function parseCmdText(cmd_text) {
    let tokens = cmd_text.split(' ');
    console.debug(tokens);
    return {
        cmd: tokens[0],
        inputs: tokens.splice(1, tokens.length - 1)
    }
}

mainInput.addEventListener("keyup", event => {
    event.preventDefault();
    if(event.keyCode === 13) send(mainInput.value);
});