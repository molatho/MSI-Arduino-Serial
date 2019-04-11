var SerialPort = require('serialport');
var PacketBuffer = require('./PacketBuffer');

class SerialCommunication {
    constructor(port, baudrate) {
        this.buffer = new PacketBuffer();
        this.lastMessage = new Date();

        this.serialPort = new SerialPort(port, { baudRate: baudrate });
        this.serialPort.on('data', this.serialMessageReceived.bind(this));
        this._packetCallback = null;
    }

    serialMessageReceived(data) {
        var packets = this.buffer.append(data);
        if (packets.length > 0) {
            this.lastMessage = new Date();
            if (this.packetCallback) this.packetCallback(packets);
        }
    }

    get packetCallback() { return this._packetCallback; }
    set packetCallback(cb) { this._packetCallback = cb; }
}

module.exports = SerialCommunication;

//'/dev/ttyACM0'