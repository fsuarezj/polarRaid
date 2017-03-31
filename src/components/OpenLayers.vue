<template>
  <div id="map">
    <!-- <ol-gpx-layer :fitView="shouldFitView"></ol-gpx-layer> -->
    <!-- <pr-track-layer fitView=false @layerLoaded="cargada"></pr-track-layer> -->
    <pr-points-layer @layerLoaded="cargada"></pr-points-layer>
    <ol-overlay v-for="overlay in overlays" :feature="overlay">
    </ol-overlay>
  </div>
</template>

<script>
  import ol from "openlayers"
  import PointsLayer from './PointsLayer.vue'
  // import TrackLayer from './TrackLayer.vue'
  import OlOverlay from './OlOverlay.vue'
  import { eventHandlers } from './mixins/EventHandlers'

  export default {
    mixins: [eventHandlers],
    components: {
      'pr-points-layer' : PointsLayer,
      'ol-overlay': OlOverlay
      // 'pr-track-layer': TrackLayer
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
        shouldFitView: true,
        interactions: [],
        eventHandlers: [],
        overlays: []
      };
    },
    methods: {
      addLayer(layer) {
        this.layers.push(layer);
        if (this.mapObject) {
          this.mapObject.addLayer(layer);
        }
        // console.log("Imprimiendo features desde el padre: ", layer.getSource().getFeatures());
        // layer.getSource().forEachFeature(f => {
        //   console.log("Nombre: ", f.get("name"))
        // });
        // console.log("El estilo es: ", layer.getStyle());
      },
      addInteraction(interaction) {
        this.interactions.push(interaction);
      },
      createModal(content) {
        this.$emit('modalRequest', content);
      },
      createSidetext(content) {
        this.$emit('sidenavRequest', content);
      },
      addOverlay(overlay) {
        this.mapObject.addOverlay(overlay);
        // console.log("Desde el padre después los overlays son ", this.mapObject.getOverlays())
      },
      changed() {
        this.mapObject.changed();
      },
      // addEventHandler(event, callback) {
      //   this.eventHandlers.push({
      //     'event': event,
      //     'callback': callback
      //   });
      //   if (this.mapObject) {
      //     this.mapObject.on(event, callback);
      //   }
      // },
      fitView(polygon) {
        this.view.fit(polygon, {padding: [50, 0, 30, 0], constrainResolution: false});
      },
      clickEvent(evt) {
        return 2;
      },
      cargada() {
        console.log("Capa cargada");
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
      for (let inter of this.interactions) {
        this.mapObject.addInteraction(inter);
      }
      // let elem = this;
      // for (let eventHandler of this.eventHandlers) {
      //   this.mapObject.on(eventHandler.event, eventHandler.callback);
      // }
      this.mapObject.on('pointermove', this.pointerMoveFunc)
    }
  }
</script>

<style>
  @import 'https://openlayers.org/en/v4.0.1/css/ol.css';
  #map {
    display: block;
    position: absolute;
    /*z-index: -1000;*/
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
  }
</style>
