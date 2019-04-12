const PacketBuffer = require('./PacketBuffer');

class Packet {
    constructor() {
        this.preambel = 0xDEADBEEF;
        this.terminator = 0xCAFEBABE;
        this.sensorData = [0, 0, 0, 0, 0, 0];
    }
    static fromBytes(data, littleEndian) {
        var packet = new Packet();
        var buffer = new ArrayBuffer(data.length);
        var view = new DataView(buffer);
        data.forEach((b, i) => view.setUint8(i, b));

        packet.preambel = view.getUint32(0, littleEndian);
        packet.sensorData = [
            view.getFloat32(4, littleEndian),
            view.getFloat32(8, littleEndian),
            view.getFloat32(12, littleEndian),
            view.getFloat32(16, littleEndian),
            view.getFloat32(20, littleEndian),
            view.getFloat32(24, littleEndian)
        ];
        packet.terminator = view.getUint32(28, littleEndian);
    }

    toString() {
        return `${this.preambel.toString(16)} ` +
        `[${this.sensorData[0]}, `+
        `${this.sensorData[1]}, `+
        `${this.sensorData[2]}, `+
        `${this.sensorData[3]}, `+
        `${this.sensorData[4]}, `+
        `${this.sensorData[5]}] `+
        `${this.terminator.toString(16)}`;
    }
}

module.exports = Packet;