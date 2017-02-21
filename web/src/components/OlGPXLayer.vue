<template>
  <div></div>
</template>

<script>
  import ol from "openlayers"

  function dashHandDrawn() {
    let result = [];
    for (let i = 0; i<30; i++) {
      if (i % 2)
        result[i] = Math.round(Math.random()*5 + 12);
      else {
        result[i] = Math.round(Math.random()*5 + 5);
      }
    }
    return result;
  }

  var lineStyle = new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: '#C00',
      lineDash: dashHandDrawn(),
      width: 5,
    })
  });

  export default {
    data() {
      return {
        vectorObject: new ol.layer.Vector({
            source: new ol.source.Vector({
              url: './src/assets/track.gpx',
              format: new ol.format.GPX()
            }),
            style: lineStyle
          })
        };
    },
    mounted() {
      this.$parent.addLayer(this.vectorObject);
    }
  }
</script>

<style lang="css">
</style>
