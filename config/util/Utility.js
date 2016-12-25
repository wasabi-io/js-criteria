var appRoot = require("app-root-path");

var Utility = function Utility() {
    this.projectDir = appRoot.path;
};

module.exports = new Utility();
