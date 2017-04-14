module.exports = (namespace) => {
    namespace.addCommand('hundered', (cb) => {
        let count = 1;
        for (var i = 0; i < 100; i++) {
            setTimeout(() => {
                cb({ message: 'message number ' + count++ });
            }, 200 * i);
        }
    });

    namespace.addCommand('echo', (cb, inputs) => {
        cb({ message: inputs[0] });
    });

    namespace.addCommand('ls', (cb) => {
        const testFolder = './node_modules/';
        const fs = require('fs');
        fs.readdir(testFolder, (err, files) => {
            if (err) {
                console.log(err);
            }
            files.forEach(file => {
                console.log(file);
                cb({ message: file });
            });
        });
    });
}