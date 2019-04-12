<script>
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

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
  extends: Line,
  mixins: [reactiveProp],
  props: ['options'],
  data: function(){
    return {
      xAxis: [],
      yAxis: [],
      zAxis: []
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  },
  methods: {
    updateChart() {
      this.renderChart(this.chartData, this.options);
    }
  }
}
</script>
