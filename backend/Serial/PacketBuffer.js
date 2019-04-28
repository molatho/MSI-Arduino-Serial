var Packet = require('./Packet');

const LITTLE_ENDIAN = [0xEF, 0xBE, 0xAD, 0xDE]; //EFBEADDE
//239, 190, 173, 222
const BIG_ENDIAN = [0xDE, 0xAD, 0xBE, 0xEF]; //DEADBEEF
const PACKET_SIZE = 4 + 6 * 4 + 4; //PREAMBEL, SENSOR_DATA, TERMINATOR

class PacketBuffer {
    constructor() {
        this.buffer = [];
        this.littleEndian = true;
        this.searchPattern = LITTLE_ENDIAN;
    }

    setLittleEndian() {
        this.littleEndian = true;
        this.searchPattern = LITTLE_ENDIAN;
    }

    setBigEndian(){        
        this.littleEndian = false;
        this.searchPattern = BIG_ENDIAN;
    }
    
    static get PACKET_SIZE() { return PACKET_SIZE; } 

    matches(offset) {
        if (this.buffer.length < offset + PACKET_SIZE) return false;
        for (var i = 0; i < this.searchPattern.length; i++) {
            if (this.buffer[offset+i] != this.searchPattern[i]){
                return false;
            }
        }
        return true;
    }

    search() {
        var found = true;
        if (this.buffer.length < PACKET_SIZE) return -1;
        for (var bufferIndex = 0; bufferIndex < this.buffer.length - this.searchPattern.length - 1; bufferIndex++) {
            if (this.matches(bufferIndex)) {
                return bufferIndex;
            }
        }
        return -1;
    }

    append (data) {
        this.buffer.push(...data);
        var packetIndex = -1;
        var packets = [];
        while ((packetIndex = this.search()) >= 0) {
            var packetBuffer = this.buffer.splice(packetIndex, PACKET_SIZE);
            packets.push(Packet.fromBytes(packetBuffer, this.littleEndian));
        }
        return packets;
    }

}

module.exports = PacketBuffer;