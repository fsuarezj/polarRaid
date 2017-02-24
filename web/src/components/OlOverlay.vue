<template lang="html">
  <div>
    <h2>{{ dataObject.name }}</h2>
  </div>
</template>

<script>
import ol from "openlayers"

export default {
  props: {
    dataObject: {
      required: true
    }
  },
  data() {
    return {
      element: document.getElementById('cacahuee')
    };
  },
  created() {
  },
  mounted() {
    this.$parent.addOverlay(new ol.Overlay({
      element: this.$el,
      position: this.dataObject.position,
      // positioning: 'center-center',
      offset: [-90, -70]
    }));
  }
}
</script>

<style lang="css" scoped>
  div {
    position: absolute;
    background-color: #FFF;
  }
</style>
