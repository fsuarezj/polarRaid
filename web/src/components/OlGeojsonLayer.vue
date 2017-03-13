<template>
  <div>
  </div>
</template>

<script>
  import ol from "openlayers"
  import col from './../assets/geo.json'
  import { eventHandlers } from './GeojsonEventHandlers'

  export default {
    mixins: [eventHandlers],
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
            src: './src/assets/start_sel.png',
            color: '#F00',
            anchor: [0.45, 0.75],
            scale: 0.5
          }),
          'image': new ol.style.Icon({
            src: './src/assets/start.png',
            color: '#222',
            anchor: [0.45, 0.75],
            scale: 0.5
          }),
          'image_sel': new ol.style.Icon({
            src: './src/assets/start_sel.png',
            color: '#666',
            anchor: [0.45, 0.75],
            scale: 0.5
          }),
          'souvenir': new ol.style.Icon({
            src: './src/assets/start.png',
            color: '#008',
            anchor: [0.45, 0.75],
            scale: 0.5
          }),
          'souvenir_sel': new ol.style.Icon({
            src: './src/assets/start_sel.png',
            color: '#00F',
            anchor: [0.45, 0.75],
            scale: 0.5
          })
        },
        overlays: []
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
            image: elem.styleIcons[feature.get('type')]
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
      this.$parent.addEventHandler('singleclick', this.clickFunc);
    }
  }
</script>

<style lang="css">
</style>
