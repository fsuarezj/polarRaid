<template>
  <div>
  </div>
</template>

<script>
  import ol from "openlayers"
  import col from './../assets/geo.json'
  // import { eventHandlers } from './mixins/GeojsonEventHandlers'
  import { geojsonLayerBase } from './mixins/GeojsonLayerBase'
  import { getFirebaseRef } from './mixins/FirebaseDB'

  export default {
    mixins: [geojsonLayerBase],
    data() {
      return {
        styleIcons: {
          'start': new ol.style.Icon({
            src: './src/assets/images/icons/start.png',
            color: '#C00',
            anchor: [0.45, 0.75],
            scale: 0.5
          }),
          'start_sel': new ol.style.Icon({
            src: './src/assets/images/icons/start_sel.png',
            color: '#F00',
            anchor: [0.45, 0.75],
            scale: 0.5
          }),
          'text': new ol.style.Icon({
            src: './src/assets/images/icons/start.png',
            color: '#222',
            anchor: [0.45, 0.75],
            scale: 0.5
          }),
          'text_sel': new ol.style.Icon({
            src: './src/assets/images/icons/start_sel.png',
            color: '#666',
            anchor: [0.45, 0.75],
            scale: 0.5
          }),
          'image': new ol.style.Icon({
            src: './src/assets/images/icons/start.png',
            color: '#222',
            anchor: [0.45, 0.75],
            scale: 0.5
          }),
          'image_sel': new ol.style.Icon({
            src: './src/assets/images/icons/start_sel.png',
            color: '#666',
            anchor: [0.45, 0.75],
            scale: 0.5
          }),
          'souvenir': new ol.style.Icon({
            src: './src/assets/images/icons/start.png',
            color: '#008',
            anchor: [0.45, 0.75],
            scale: 0.5
          }),
          'souvenir_sel': new ol.style.Icon({
            src: './src/assets/images/icons/start_sel.png',
            color: '#00F',
            anchor: [0.45, 0.75],
            scale: 0.5
          })
        },
        overlays: [],
        features: NaN
      }
    },
    mounted() {
      let elem = this;
      elem.jereje = getFirebaseRef('singularFeatures').once("value")
        .then(snapshot => {
          return snapshot;
        })
        .catch(message => {
          console.log("Fallando ", message);
        })
        .then(function(snapshot) {
          elem.features = snapshot.val();
          elem.$parent.addLayer(elem.layer);
          elem.$parent.addActiveLayer({
            layerId: elem.layer.get('layerId'),
            layer: elem.layer,
            mouseOverCallback: function(feature) {
              feature.getStyle().setImage(elem.styleIcons[feature.get('type') + '_sel'])
              feature.changed();
            },
            mouseOutCallback: function(feature) {
              feature.getStyle().setImage(elem.styleIcons[feature.get('type')]);
              feature.changed();
            },
            clickCallback: function(feature) {
              console.log("Clicking")
              let mq = window.matchMedia("(max-width: 767px)");
              if (mq.matches) {
                switch (feature.get('type')) {
                  case "image":
                  case "start":
                  case "souvenir":
                    elem.$parent.createModal(feature);
                    return;
                }
              }
              switch (feature.get('type')) {
                case "image":
                case "start":
                case "souvenir":
                elem.$parent.overlays.push(feature);
                break;
                case "text":
                elem.$parent.createSidetext(feature);
              }
            }
          })
          elem.$emit('layerLoaded')
        })
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
