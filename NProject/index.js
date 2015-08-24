/**
 * Created by testt on 2015/6/24.
 */
var server = require("./net/server");
var router = require("./routes/router");
var fileApp = require("./file/fileApp");
server.start(router.route);