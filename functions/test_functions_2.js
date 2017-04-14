module.exports = (namespace) => {
    namespace.addCommand('concat', (cb, inputs) => {
        let s = "";
        inputs.forEach(function(str) {
            s += str;
        }, this);
        cb({ message: s });
    });
}
