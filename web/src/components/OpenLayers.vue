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
      'ol-geojson-layer' : OlGeojsonLayer,
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
        interactions: [],
        eventHandlers: [],
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
      addInteraction(interaction) {
        this.interactions.push(interaction);
      },
      addOverlay(overlay) {
        this.mapObject.addOverlay(overlay);
        // console.log("Desde el padre después los overlays son ", this.mapObject.getOverlays())
      },
      addEventHandler(event, callback) {
        this.eventHandlers.push({
          'event': event,
          'callback': callback
        });
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
      for (let int of this.interactions) {
        console.log("Adding ", int);
        this.mapObject.addInteraction(int);
      }
      let elem = this;
      for (let eventHandler of this.eventHandlers) {
        this.mapObject.on(eventHandler.event, eventHandler.callback);
      }
      // this.mapObject.on('pointermove', function(evt) {
      //   if (evt.dragging) {
      //     return;
      //   }
      //   let pixel = elem.mapObject.getEventPixel(evt.originalEvent);
      //   let hit = elem.mapObject.hasFeatureAtPixel(pixel);
      //   if (hit) {
      //     elem.mapObject.getTarget().style.cursor = 'pointer';
      //     elem.mapObject.forEachFeatureAtPixel(pixel, function(feature, layer) {
      //       console.log("Style: ", feature.getStyle())
      //       feature.getStyle().getImage().setScale(0.7);
      //     }, {});
      //     elem.mapObject.render();
      //   } else {
      //     elem.mapObject.getTarget().style.cursor = '';
      //   }
      // });
    }
  }
</script>

<style scoped>
  @import 'https://openlayers.org/en/v4.0.1/css/ol.css';
  #map {
    display: block;
    position: absolute;
    /*z-index: 0;*/
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
  }
</style>
