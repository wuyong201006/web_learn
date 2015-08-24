/**
 * Created by testt on 2015/7/17.
 */
var net = require("net");
var clients = [];

var HOST = "127.0.0.1";
var PORT = 5000;
const xml = '<cross-domain-policy>'+'<allow-access-from domain="*" to-ports="*"/>'+
        '</cross-domain-policy>';

net.createServer(function(socket){
    console.log("Connected:"+socket.remoteAddress+":"+socket.remotePort);

    clients.push(socket);

    socket.on("data", function(data){
        console.log("receive data:"+socket.remoteAddress+":"+socket.remotePort);
        if(data.toString() == '<policy-file-request/>\0'){
            socket.end(xml);
            return;
        }
        //var isBuffer = Buffer.isBuffer(data);
        //
        //if(isBuffer){
        //    var offset = data['readInt32BE'](0);
        //    var headCode = data['readInt16BE'](offset);
        //    offset += 2;
        //    var headBackCode = data['readInt16BE'](offset);
        //    offset += 2;
        //
        //    var len = data['readInt16BE'](offset);
        //    offset += 2;
        //
        //    var msg = data.toString("utf8", offset, offset+len);
        //
        //    console.log(headCode+'-'+headBackCode+'-'+msg);
        //
        //    broadcast(msg, socket);
        //}else{
        //    console.log('Message is not Buffer!');
        //}

        var msg = data.toString();

        console.log(msg);

        broadcast(msg, socket);
    });

    socket.on('end', function(){
        console.log('Close Connected:'+socket);
        clients.splice(clients.indexOf(socket));
    })

    function broadcast(message, sender){
        clients.forEach(function(client){
            //if(client == sender){
                client.write(message);
            //}
        });
    }
}).listen(PORT, HOST);

console.log('服务已启动');

