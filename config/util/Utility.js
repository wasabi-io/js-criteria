var appRoot = require("app-root-path");

var Utility = function Utility() {
    this.projectDir = appRoot.path;
    this.parseArgs = function(argLine) {
    }.bind(this);
};

module.exports = new Utility();
