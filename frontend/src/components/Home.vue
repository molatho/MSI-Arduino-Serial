<template>
    <div>
      <div class="jumbotron jumbotron-fluid">
        <div class="container">
          <h1 class="display-3"><i class="fas fa-cogs"></i> Plot all the Data</h1>
        </div>
      </div>
        <div class="container">
          <h3>Gyro</h3>
          <b-container class="bv-example-row">
            <b-row>
              <b-col sm="10">
                <SensorLine
                  ref="gyro"
                  v-bind:numRecords="100"
                  v-bind:showX="this.gyroShowX"
                  v-bind:showY="this.gyroShowY"
                  v-bind:showZ="this.gyroShowZ"
                >
                </SensorLine>
              </b-col>
              <b-col sm="2">
                <label for="checkbox">{{ this.gyroShowX }}</label>
                <input type="checkbox" v-model="selectedAxis" :value="'x'"/>
              </b-col>
            </b-row>
          </b-container>
          <h3>Accelerometer</h3>
          <SensorLine
            ref="accelerometer"
            v-bind:numRecords="100"
            v-bind:showX="this.gyroShowX"
            v-bind:showY="this.gyroShowY"
            v-bind:showZ="this.gyroShowZ"
          >
          </SensorLine>
        </div>
    </div>
</template>

<script>
import SensorLine from './SensorLine';

export default {
  name: 'Home',
  components: { SensorLine },
  data () {
    return {
      gyroShowX: true,
      gyroShowY: false,
      gyroShowZ: true,
      selectedAxis: []
    }
  },
  created: function() {
    this.$options.sockets.onmessage = this.processData;
  },
  methods: {
    processData: function(event) {
      var data = JSON.parse(event.data);
      this.$refs.gyro.addRecord(data.sensorData[0], data.sensorData[1], data.sensorData[2]);
      this.$refs.accelerometer.addRecord(data.sensorData[3], data.sensorData[4], data.sensorData[5]);
    }
  },
  watch: {
  }
}
</script>
