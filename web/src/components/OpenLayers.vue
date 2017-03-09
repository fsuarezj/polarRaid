<template>
  <div id="map">
    <ol-gpx-layer fitView=false></ol-gpx-layer>
    <ol-geojson-layer></ol-geojson-layer>
    <ol-overlay v-for="overlay in overlays" :dataObject="overlay"></ol-overlay>
  </div>
</template>

<script>
  import ol from "openlayers"
  import OlGPXLayer from './OlGPXLayer.vue'
  import OlGeojsonLayer from './OlGeojsonLayer.vue'
  import OlOverlay from './OlOverlay.vue'

  export default {
    components: {
      'ol-gpx-layer': OlGPXLayer,
      'ol-geojson-layer' : OlGeojsonLayer,
      'ol-overlay': OlOverlay
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
        }),
        overlays: []
      };
    },
    methods: {
      addLayer(layer) {
        this.layers.push(layer);
        // console.log("Imprimiendo features desde el padre: ", layer.getSource().getFeatures());
        // layer.getSource().forEachFeature(f => {
        //   console.log("Nombre: ", f.get("name"))
        // });
        // console.log("El estilo es: ", layer.getStyle());
      },
      addOverlay(overlay) {
        this.mapObject.addOverlay(overlay);
        // console.log("Desde el padre después los overlays son ", this.mapObject.getOverlays())
      },
      fitView(polygon) {
        this.view.fit(polygon, {padding: [50, 0, 30, 0], constrainResolution: false});
      },
      clickEvent(evt) {
        return 2;
      }
    },
    mounted() {
      // console.log("Mounting Map, adding layers")
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
      // console.log("Layers: ", this.mapObject.getLayers());
      let elem = this;
      this.mapObject.on('click', function(evt) {
        let feature = elem.mapObject.forEachFeatureAtPixel(evt.pixel,
          function(feature) {
            console.log(feature.getGeometry());
            return feature;
          }
        );
        console.log("Feature = ", feature.get('name'));
        if (feature.get('type') === "image") {
          let coordinates = feature.getGeometry().getCoordinates();
          elem.overlays.push({
            name: feature.get('name'),
            type: feature.get('type'),
            position: coordinates
          });
        }
      });
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
