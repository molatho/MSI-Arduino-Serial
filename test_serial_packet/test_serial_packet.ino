float degree = 0.f;
float stepSize = 5.f;

struct Packet {
  uint32_t preambel = 0xDEADBEEF;
  float sensorData[6] = {0.f};
  uint32_t terminator = 0xCAFEBABE;
};

Packet packet;

float degreeSin(float degrees) {
  return (float)(sin((degrees * 71) / 4068));
}

void setup() {
  Serial.begin(19200);
}

void loop() {
  degree = degree + stepSize;
  if (degree >= 360) degree = 0;
  packet.sensorData[0] = degreeSin(degree);
  packet.sensorData[1] = degreeSin(degree + 30);
  packet.sensorData[2] = degreeSin(degree + 60);
  packet.sensorData[3] = degreeSin(degree + 90);
  packet.sensorData[4] = degreeSin(degree + 120);
  packet.sensorData[5] = degreeSin(degree + 150);
  //Serial.println(packet.sensorData[0]);
  Serial.write((uint8_t*)&packet, sizeof(Packet));
  delay(100);
}
