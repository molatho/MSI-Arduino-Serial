var SerialCommunication = require('./Serial/SerialCommunication');
var Packet = require('./Serial/Packet');
const WebSocket = require('ws');

var wss = new WebSocket.Server({port:8088});
var connections = [];

var processPacket = function(packet) {
    console.log(packet.toString());
    for (var c in connections) connections[c].send(JSON.stringify(packet));
}

wss.on('connection', function connection(ws) {
    connections.push(ws);
    ws.on('close', function(){
        connections.splice(connections.indexOf(ws), 1);
    })
});

/*
var sComm = new SerialCommunication('COM4', 19200);
sComm.packetCallback = (packets) => {
    for (var p in packets) {
        processPacket(packets[p]);
    }
};s
*/

var angle = 0;
var packet = new Packet();
setInterval(() => {
    for (var i = 0; i < packet.sensorData.length; i++) {
        packet.sensorData[i] = Math.sin((angle + 10 * i) * (Math.PI / 180));
    }
    processPacket(packet);
    angle += 10;
}, 500);