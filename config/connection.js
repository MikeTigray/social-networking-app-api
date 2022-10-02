const { connect, connection } = require("mongoose");
const connectionUrl = "mongodb://localhost/socialNetworkingApi";

connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = connection;
