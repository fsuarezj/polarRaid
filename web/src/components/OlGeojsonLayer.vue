<template>
  <div>
    <ol-overlay v-for="overlay in overlays" :dataObject="overlay"></ol-overlay>
  </div>
</template>

<script>
  import ol from "openlayers"
  import col from './../assets/geo.json'
  import OlOverlay from './OlOverlay.vue'
  import { eventHandlers } from './GeojsonEventHandlers'

  export default {
    mixins: [eventHandlers],
    components: {
      'ol-overlay': OlOverlay
    },
    data() {
      return {
        styleIcons: {
          'start': new ol.style.Icon({
            src: './src/assets/start.png',
            color: '#C00',
            anchor: [0.45, 0.75],
            scale: 0.5
          }),
          'start_sel': new ol.style.Icon({
            src: './src/assets/start.png',
            color: '#F00',
            anchor: [0.45, 0.75],
            scale: 0.5
          })
        },
        overlays: []
      }
    },
    methods: {
      addOverlay(overlay) {
        this.$parent.addOverlay(overlay);
      }
    },
    computed: {
      features() {
        return this.source.getFeatures();
      },
      vector() {
        return new ol.layer.Vector({
          source: this.source,
        });
      },
      source() {
        let elem = this;
        let src = new ol.source.Vector({
          features: (new ol.format.GeoJSON({featureProjection: 'EPSG:3857'})).readFeatures(col)
        });
        src.forEachFeature(function(feature) {
          feature.setStyle(new ol.style.Style({
            image: elem.styleIcons['start']
          }));
        })
        return src;
      }
    },
    mounted() {
      this.$parent.addLayer(this.vector);
      // this.$parent.addInteraction(
      //   new ol.interaction.Select({
      //     layers: [this.vector],
      //     style: new ol.style.Style({
      //       image: new ol.style.Icon({
      //         src: './src/assets/start.png',
      //         color: '#00F',
      //         anchor: [0.45, 0.75],
      //         scale: 0.5
      //       })
      //     })
      //   })
      // );
      this.$parent.addEventHandler('pointermove', this.pointerMoveFunc);
      this.$parent.addEventHandler('click', this.clickFunc);
    }
  }
</script>

<style lang="css">
</style>
