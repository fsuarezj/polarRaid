<template>
  <div></div>
</template>

<script>
  import ol from "openlayers"

  var style = {
    'redLineStyle' : new ol.style.Style({
      stroke: new ol.style.Stroke({
        // color: '#999',
        color: '#C00',
        width: 5,
      })
    }),
    'point': new ol.style.Style({
      image: new ol.style.Icon({
        src: './src/assets/start.png',
        anchor: [0.45, 0.75],
        scale: 0.5
      })
    })
    // 'point': new ol.style.Style({
    //   image: new ol.style.Circle({
    //     fill: new ol.style.Fill({
    //       color: 'rgba(255,255,0,0.4)'
    //     }),
    //     radius: 5,
    //     stroke: new ol.style.Stroke({
    //       color: '#ff0',
    //       width: 1
    //     })
    //   })
    // })
  }

  export default {
    data() {
      return {
        source: new ol.source.Vector({
          url: './src/assets/geo.json',
          // url: 'https://openlayers.org/en/v4.0.1/examples/data/gpx/fells_loop.gpx',
          format: new ol.format.GeoJSON()
          // features: new ol.format.GPX({}).readFeatures('./src/assets/track.gpx'),
        }),
        // style: style['point']
        style: style['point']
      };
    },
    mounted() {
      this.$parent.addLayer(new ol.layer.Vector({
        source: this.source,
        style: this.style
      }));
    }
  }
</script>

<style lang="css">
</style>
