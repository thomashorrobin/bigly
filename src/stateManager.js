const Command = require('./command');
const Namespace = require('./namespace');

class StateManager {
    constructor(){
        this.commandStructure = {
            top_namespace: new Namespace('top_namespace')
        }
    }
    addCommand(name, command) {
        let cmd = new Command(name, command);
        this.commandStructure.top_namespace.addItem(cmd);
    }
    getCommand(name) {
        return this.commandStructure.top_namespace.getItem(name);
    }
}

module.exports = StateManager;