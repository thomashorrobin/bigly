class Command {
    constructor(name, cmd){
        this.type = 'cmd';
        this.name = name;
        this.cmd = cmd;
    }
}

module.exports = Command;