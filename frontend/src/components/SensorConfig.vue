<template>
  <div>
    <b-form-group label="Configuration">
      <b-form-checkbox
        v-model="config.recording"
        name="check-button"
        switch
      >{{ config.recording ? 'Recording' : 'Not recording'}}</b-form-checkbox>
      <b-form-checkbox
        v-model="config.limitRecords"
        name="check-button"
        switch
      >{{ config.limitRecords ? `${config.numRecords} records` : 'No limit'}}</b-form-checkbox>
      <b-form-input v-if="config.limitRecords" v-model="config.numRecords" :type="'number'" number></b-form-input>
      <b-form-checkbox-group v-model="config.showAxis" :options="axisOptions" name="flavour-1"></b-form-checkbox-group>
      <b-button
        size="sm"
        variant="danger"
        v-on:click="()=>{this.$emit('clear');}"
      ><i class="fas fa-ban"></i></b-button>
      <b-button
        size="sm"
        variant="info"
        v-on:click="()=>{this.$emit('dump');}"
      ><i class="fas fa-terminal"></i></b-button>

      <b-form-input v-model="config.offset[0]" :type="'number'" number></b-form-input>
      <b-form-input v-model="config.offset[1]" :type="'number'" number></b-form-input>
      <b-form-input v-model="config.offset[2]" :type="'number'" number></b-form-input>
      <b-button
        size="sm"
        variant="info"
        v-on:click="()=>{this.$emit('setOffset');}"
      ><i class="fas fa-chart-line"></i></b-button>
      <b-button
        size="sm"
        variant="danger"
        v-on:click="()=>{this.$emit('clearOffset');}"
      ><i class="fas fa-ban"></i></b-button>
    </b-form-group>
  </div>
</template>

<script>
export default {
  name: "SensorConfig",
  props: ["config"],
  data: function() {
    return {
      axisOptions: [
        { text: "Show X", value: "x" },
        { text: "Show Y", value: "y" },
        { text: "Show Z", value: "z" }
      ]
    };
  } 
};
</script>

<style>
</style>
