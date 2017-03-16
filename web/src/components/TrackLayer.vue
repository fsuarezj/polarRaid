<template>
  <div>
  </div>
</template>

<script>
  import ol from "openlayers"
  import track from './../assets/track.json'
  import { eventHandlers } from './mixins/GeojsonEventHandlers'
  import { firebaseDB } from './mixins/FirebaseDB'

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

  var style = {
    'redLineStyle' : new ol.style.Style({
      stroke: new ol.style.Stroke({
        // color: '#999',
        color: '#C00',
        lineDash: dashHandDrawn(),
        width: 5,
      })
    }),
    'point': new ol.style.Style({
      image: new ol.style.Circle({
        fill: new ol.style.Fill({
          color: 'rgba(255,255,0,0.4)'
        }),
        radius: 5,
        stroke: new ol.style.Stroke({
          color: '#ff0',
          width: 1
        })
      })
    })
  }

  export default {
    mixins: [firebaseDB],
    props: {
      fitView: {
        default: false
      }
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
        features: NaN,
        style: style['redLineStyle']
      }
    },
    computed: {
      layer() {
        return new ol.layer.Vector({
          source: this.source,
        });
      },
      source() {
        let elem = this;
        let src = new ol.source.Vector({
          features: (new ol.format.GeoJSON({featureProjection: 'EPSG:3857'})).readFeatures(track)
        });
        src.forEachFeature(function(feature) {
          feature.setStyle(elem.style);
        })
        return src;
      }
    },
    mounted() {
      this.$parent.addLayer(this.layer);
      let feature = this.source.getFeatures()[0];
      let polygon = feature.getGeometry();
      console.log("La feature es ", polygon);
      this.$parent.fitView(polygon);
      // let elem = this;
      // elem.jereje = this.getFirebaseRef('geojson_features').once("value")
      //   .then(snapshot => {
      //     return snapshot;
      //   })
      //   .catch(message => {
      //     console.log("Fallando ", message);
      //   })
      //   .then(function(snapshot) {
      //     elem.features = snapshot.val();
      //     elem.$parent.addLayer(elem.layer);
      //     elem.$parent.addEventHandler('pointermove', elem.pointerMoveFunc);
      //     elem.$parent.addEventHandler('singleclick', elem.clickFunc);
      //     elem.$emit('layerLoaded')
      //   })
    }
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
  }
</script>

<style lang="css">
</style>
