/**
 * Created by testt on 2015/6/23.
 */
/*
var http = require('http');

http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Hello World\n');
}).listen(8888);

console.log('Server running at http://127.0.0.1:8888/');*/

var http = require('http');
var url = require('url');

function start(route)
{
    function onRequest(request, response)
    {
        var pathname = url.parse(request.url).pathname;
        console.log("Request for"+pathname+"received.");

        route(pathname);

        response.writeHead(200, {"Content-Type":"text/plain"});
        response.write("Hello World");
        response.end();
    }

    http.createServer(onRequest).listen(8888);
    console.log("Server has started.");
}

exports.start = start;

var net = require("net");
var server = net.createServer(function(socket)

{
    socket.write("Echo server\r\n");
    socket.pipe(socket);
})

server.listen(1337, '127.0.0.1');
