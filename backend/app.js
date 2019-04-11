var SerialCommunication = require('./Serial/SerialCommunication');
const WebSocket = require('ws');

var sComm = new SerialCommunication('COM4', 19200);
var wss = new WebSocket.Server({port:8088});
var connections = [];

wss.on('connection', function connection(ws) {
    connections.push(ws);
    ws.on('close', function(){
        connections.splice(connections.indexOf(ws), 1);
    })
});

sComm.packetCallback = (packets) => {
    for (var p in packets) {
        console.log(packets[p].toString());
        for (var c in connections) connections[c].send(JSON.stringify(packets[p]));
    }
};