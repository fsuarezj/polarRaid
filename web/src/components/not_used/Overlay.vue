<template lang="html">
  <div class="" :style="{ left: leftFun + 'px', top: topFun + 'px'}">
    <h1><slot></slot></h1>
  </div>
</template>

<script>
export default {
  props: {
    overlayObject: {
      required: true
    }
  },
  computed: {
    coordinates: function() {
      return this.overlayObject.feature.getGeometry().getCoordinates();
    },
    leftFun: function() {
      return this.overlayObject.coord2pos(this.coordinates)[0];
    },
    topFun: function() {
      // return this.overlayObject.position[1]
      return this.overlayObject.coord2pos(this.coordinates)[1];
    }
  }
  // mounted() {
  //   this.style.left = this.overlayObject.position[0];
  //   this.style.top = this.overlayObject.position[1];
  // }
}
</script>

<style lang="css" scoped>
  div {
    background-color: #FFF;
    z-index: 20;
    position: absolute;
  }
</style>
