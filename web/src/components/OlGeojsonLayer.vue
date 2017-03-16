<template>
  <div>
  </div>
</template>

<script>
  import ol from "openlayers"
  import col from './../assets/geo.json'
  import { eventHandlers } from './mixins/GeojsonEventHandlers'
  import { firebaseDB } from './mixins/FirebaseDB.js'

  export default {
    mixins: [eventHandlers, firebaseDB],
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
          'text': new ol.style.Icon({
            src: './src/assets/start.png',
            color: '#222',
            anchor: [0.45, 0.75],
            scale: 0.5
          }),
          'text_sel': new ol.style.Icon({
            src: './src/assets/start_sel.png',
            color: '#666',
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
        overlays: [],
        geojson_features: NaN
      }
    },
    computed: {
      vector() {
        return new ol.layer.Vector({
          source: this.source,
        });
      },
      source() {
        let elem = this;
        let src = new ol.source.Vector({
          features: (new ol.format.GeoJSON({featureProjection: 'EPSG:3857'})).readFeatures(this.geojson_features)
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
      let elem = this;
      elem.jereje = this.getFirebaseRef('geojson_features').once("value")
        .then(snapshot => {
          return snapshot;
        })
        .catch(message => {
          console.log("Fallando ", message);
        })
        .then(function(snapshot) {
          elem.geojson_features = snapshot.val();
          elem.$parent.addLayer(elem.vector);
          elem.$parent.addEventHandler('pointermove', elem.pointerMoveFunc);
          elem.$parent.addEventHandler('singleclick', elem.clickFunc);
          elem.$emit('layerLoaded')
          // elem.$parent.changed();
        })

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

      // this.$parent.addLayer(this.vector);
      // this.$parent.addEventHandler('pointermove', this.pointerMoveFunc);
      // this.$parent.addEventHandler('singleclick', this.clickFunc);

      // console.log("Firebase features", this.geojson_features);
      // console.log("Datos", this.datos);
      // console.log("Firebase ref features", geojson_featuresRef.toJSON());
      // console.log("My object jereje ", this.jereje);
      // console.log("geojson from file", col);
      // console.log(mierdas);
    }
  }
</script>

<style lang="css">
</style>
