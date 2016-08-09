const jsonServer = require("json-server");

function Server(port) {
    this.__port = port;
    this.__server = jsonServer.create();
    this.__server.use(jsonServer.defaults());

    this.route = (routePath) => {
        this.__server.use(jsonServer.router(routePath));
        return this;
    };

    this.start = () => {
        /* eslint-disable prefer-template */
        this.__server.listen(this.__port, () => {
            console.log("Server is running on " + this.__port + " port");
        });
    };
}
module.exports = Server;