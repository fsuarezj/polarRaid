<template>
  <div id="map">
    <ol-gpx-layer fitView=false></ol-gpx-layer>
    <ol-geojson-layer></ol-geojson-layer>
  </div>
</template>

<script>
  import ol from "openlayers"
  import OlGPXLayer from './OlGPXLayer.vue'
  import OlGeojsonLayer from './OlGeojsonLayer.vue'

  export default {
    components: {
      'ol-gpx-layer': OlGPXLayer,
      'ol-geojson-layer' : OlGeojsonLayer
    },
    data() {
      return {
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
        })
      };
    },
    methods: {
      addLayer(layer) {
        this.layers.push(layer);
      },
      fitView(polygon) {
        this.view.fit(polygon, {padding: [50, 0, 30, 0], constrainResolution: false});
        console.log('Acabó fitView');
      }
    },
    mounted() {
      this.mapObject = new ol.Map({
        target: this.$el,
        layers: this.layers,
        view: this.view,
        controls: ol.control.defaults().extend([
          new ol.control.ScaleLine({
            units: 'metric'
          })
        ])
      });
      // for (let layer of this.layers) {
      //   this.mapObject.addLayer(layer);
      // }
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
  @import 'https://openlayers.org/en/v4.0.1/css/ol.css';
  #map {
    display: block;
    position: absolute;
    z-index: -3;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
  }
</style>
