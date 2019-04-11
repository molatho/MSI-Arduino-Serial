<template>
    <SimpleLine
        ref="line"
        v-bind:chartData="chartData"
        v-bind:numRecords="numRecords"
        v-bind:options="{maintainAspectRatio: false, animation: false}"
        style="height: 200px;"
    >
    </SimpleLine>
</template>

<script>
import SimpleLine from './SimpleLine'
const CHART_DATA = {
  labels: [],
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  datasets: [
    {
      label: 'X',
      backgroundColor: 'rgba(255, 0, 0, 0.1)',
      borderColor: 'rgba(255, 0, 0, 0.1)',
      data: []
    },
    {
      label: 'Y',
      backgroundColor: 'rgba(0, 255, 0, 0.1)',
      borderColor: 'rgba(0, 255, 0, 0.1)',
      data: []
    },
    {
      label: 'Z',
      backgroundColor: 'rgba(0, 0, 255, 0.1)',
      borderColor: 'rgba(0, 0, 255, 0.1)',
      data: []
    }
  ]
}

export default {
    name: 'SensorLine',
    components: {SimpleLine},
    data: function(){
        return {
        xAxis: [],
        yAxis: [],
        zAxis: [],
        chartData: CHART_DATA
        }
    },
    props: ['numRecords', 'showX', 'showY', 'showZ'],
    methods: {
        addRecord(x, y, z) {
            if (this.chartData === undefined) this.chartData = CHART_DATA;
            
            this.chartData.labels.push(new Date().toISOString().split("T")[1]);
            if (this.chartData.labels.length > 100) this.chartData.labels.splice(0, 1);
            
            this.xAxis.push(x);
            if (this.xAxis.length > this.numRecords) this.xAxis.splice(0, this.xAxis.length - this.numRecords);
            this.yAxis.push(y);
            if (this.yAxis.length > this.numRecords) this.yAxis.splice(0, this.yAxis.length - this.numRecords);
            this.zAxis.push(z);
            if (this.zAxis.length > this.numRecords) this.zAxis.splice(0, this.zAxis.length - this.numRecords);

            this.chartData.datasets[0].data = this.showX ? this.xAxis : [];
            this.chartData.datasets[1].data = this.showY ? this.yAxis : [];
            this.chartData.datasets[2].data = this.showZ ? this.zAxis : [];

            this.$refs.line.updateChart();
        }
    }
}
</script>

<style>

</style>
