<template>
  <SimpleLine
    ref="line"
    v-bind:chartData="chartData"
    v-bind:options="{maintainAspectRatio: false, animation: false}"
    style="height: 300px;"
  ></SimpleLine>
</template>

<script>
import SimpleLine from "./SimpleLine";
const CHART_DATA = {
  labels: [],
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  datasets: [
    {
      label: "X",
      backgroundColor: "rgba(255, 0, 0, 0.1)",
      borderColor: "rgba(255, 0, 0, 0.1)",
      data: []
    },
    {
      label: "Y",
      backgroundColor: "rgba(0, 255, 0, 0.1)",
      borderColor: "rgba(0, 255, 0, 0.1)",
      data: []
    },
    {
      label: "Z",
      backgroundColor: "rgba(0, 0, 255, 0.1)",
      borderColor: "rgba(0, 0, 255, 0.1)",
      data: []
    }
  ]
};

export default {
  name: "SensorLine",
  components: { SimpleLine },
  data: function() {
    return {
      xAxis: [],
      yAxis: [],
      zAxis: [],
      chartData: {}
    };
  },
  created: function() {
    this.chartData = JSON.parse(JSON.stringify(CHART_DATA));
  },
  props: ["config"],
  methods: {
    clear: function() {
      this.xAxis = [];
      this.yAxis = [];
      this.zAxis = [];
    },
    assignOffset() {
      this.config.offset = [
        this.xAxis[this.xAxis.length-1],
        this.yAxis[this.yAxis.length-1],
        this.zAxis[this.zAxis.length-1]
      ] 
    },
    dump(name) {
      console.log("==================================");
      console.log(` ${name} BEGIN OF DATA DUMP `)
      console.log("==================================");

      var data = {
        x: this.xAxis,
        y: this.yAxis,
        z: this.zAxis
      };
      var str = JSON.stringify(data);
      console.log(str);

      console.log("==================================");
      console.log(` ${name} END OF DATA DUMP `)
      console.log("==================================");
    },
    addRecord(x, y, z) {
      if (this.chartData === undefined) this.chartData = CHART_DATA;
      if (!this.config.recording) return;

      this.chartData.labels.push(new Date().toISOString().split("T")[1]);
      if (
        this.config.limitRecords &&
        this.chartData.labels.length > this.config.numRecords
      )
        this.chartData.labels.splice(
          0,
          this.chartData.labels.length - this.config.numRecords
        );

      this.xAxis.push(x - this.config.offset[0]);
      if (
        this.config.limitRecords &&
        this.xAxis.length > this.config.numRecords
      )
        this.xAxis.splice(0, this.xAxis.length - this.config.numRecords);

      this.yAxis.push(y - this.config.offset[1]);
      if (
        this.config.limitRecords &&
        this.yAxis.length > this.config.numRecords
      )
        this.yAxis.splice(0, this.yAxis.length - this.config.numRecords);

      this.zAxis.push(z - this.config.offset[2]);
      if (
        this.config.limitRecords &&
        this.zAxis.length > this.config.numRecords
      )
        this.zAxis.splice(0, this.zAxis.length - this.config.numRecords);

      this.chartData.datasets[0].data = this.config.showAxis.find(x => x == "x")
        ? this.xAxis
        : [];
      this.chartData.datasets[1].data = this.config.showAxis.find(x => x == "y")
        ? this.yAxis
        : [];
      this.chartData.datasets[2].data = this.config.showAxis.find(x => x == "z")
        ? this.zAxis
        : [];

      this.$refs.line.updateChart();
    }
  }
};
</script>

<style>
</style>
