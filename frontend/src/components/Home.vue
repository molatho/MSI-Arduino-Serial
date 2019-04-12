<template>
  <div>
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-3">
          <i class="fas fa-cogs"></i> Plot all the Data
        </h1>
      </div>
    </div>
    <div class="container">
      <h3>Gyro</h3>
      <b-container class="bv-example-row">
        <b-row>
          <b-col sm="10">
            <SensorLine
              ref="gyro"
              v-bind:config="gyroConfig"
            ></SensorLine>
          </b-col>
          <b-col sm="2">
            <SensorConfig
              v-bind:config="gyroConfig"
              v-on:clear="()=>{this.$refs.gyro.clear();}"
              ></SensorConfig>
          </b-col>
        </b-row>
      </b-container>
      <h3>Accelerometer</h3>
      <b-container class="bv-example-row">
        <b-row>
          <b-col sm="10">
            <SensorLine
              ref="accelerometer"
              v-bind:config="accelConfig"
            ></SensorLine>
          </b-col>
          <b-col sm="2">
            <SensorConfig
              v-bind:config="accelConfig"
              v-on:clear="()=>{this.$refs.accelerometer.clear();}"
              ></SensorConfig>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import SensorLine from "./SensorLine";
import SensorConfig from "./SensorConfig"

export default {
  name: "Home",
  components: { SensorLine, SensorConfig },
  data() {
    return {
      axisOptions: [
        { text: "Show X", value: "x" },
        { text: "Show Y", value: "y" },
        { text: "Show Z", value: "z" }
      ],
      accelConfig: {
        showAxis: ["x", "y", "z"],
        numRecords: 20,
        limitRecords: true,
        recording: true
      },
      gyroConfig: {
        showAxis: ["x", "y", "z"],
        numRecords: 20,
        limitRecords: true,
        recording: true
      },
    };
  },
  created: function() {
    this.$options.sockets.onmessage = this.processData;
  },
  methods: {
    processData: function(event) {
      var data = JSON.parse(event.data);
      this.$refs.gyro.addRecord(
        data.sensorData[0],
        data.sensorData[1],
        data.sensorData[2]
      );
      this.$refs.accelerometer.addRecord(
        data.sensorData[3],
        data.sensorData[4],
        data.sensorData[5]
      );
    }
  },
  watch: {}
};
</script>
