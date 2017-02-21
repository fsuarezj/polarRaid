<template>
  <div>
    <ol-gpx-layer></ol-gpx-layer>
  </div>
</template>

<script>
  import ol from "openlayers"
  import OlGPXLayer from './OlGPXLayer.vue'

  export default {
    components: {
      'ol-gpx-layer': OlGPXLayer
    },
    data() {
      return {
        layers: []
      };
    },
    methods: {
      addLayer(layer) {
        this.layers.push(layer);
      }
    },
    mounted() {
      this.mapObject = new ol.Map({
        target: this.$el,
        layers: [
          new ol.layer.Tile({
            source: new ol.source.Stamen({
              layer:'watercolor'
            })
          }),
          new ol.layer.Tile({
            source: new ol.source.Stamen({
              layer:'terrain-labels'
            })
          })
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([26, 68.9]),
          zoom: 6
        }),
        controls: ol.control.defaults().extend([
          new ol.control.ScaleLine({
            units: 'degrees'
          })
        ])
      });
      for (let layer of this.layers) {
        this.mapObject.addLayer(layer);
      }
      // this.mapObject.addLayer(
        // new ol.layer.Vector({
          // source: new ol.source.Vector({
            // url: './src/assets/geo.json',
            // format: new ol.format.GeoJSON()
          // }),
          // style: lineStyle
        // })
      // );
    }
  }
</script>

<style scoped>
  #map {
    height: 600px;
    width: 100%;
  }
</style>
