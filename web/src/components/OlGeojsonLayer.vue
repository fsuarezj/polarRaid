<template>
  <div></div>
</template>

<script>
  import ol from "openlayers"
  import col from './../assets/geo.json'

  var images = {
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
  }

  export default {
    data() {
      return {
        changedFeatures: []
      };
    },
    computed: {
      features() {
        return this.source.getFeatures();
      },
      vector() {
        return new ol.layer.Vector({
          source: this.source,
          // style: this.style
        });
      },
      source() {
        let src = new ol.source.Vector({
          features: (new ol.format.GeoJSON({featureProjection: 'EPSG:3857'})).readFeatures(col)
        });
        src.forEachFeature(function(feature) {
          feature.setStyle(new ol.style.Style({
            image: images['start']
          }));
        })
        return src;
      }
    },
    mounted() {
      let elem = this;
      this.$parent.addLayer(this.vector);
      this.$parent.addInteraction(
        new ol.interaction.Select({
          layers: [this.vector],
          style: new ol.style.Style({
            image: new ol.style.Icon({
              src: './src/assets/start.png',
              color: '#00F',
              anchor: [0.45, 0.75],
              scale: 0.5
            })
          })
        })
      );
      this.$parent.addEventHandler('pointermove', function(evt) {
        if (evt.dragging) {
          return;
        }
        let pixel = evt.map.getEventPixel(evt.originalEvent);
        let hit = evt.map.hasFeatureAtPixel(
          pixel,
          {
            'layerFilter': function(layer) {
              console.log("Testing layer");
              return layer === elem.vector;
            },
            'hitTolerance': 9
          }
        );
        if (hit) {
          evt.map.getTarget().style.cursor = 'pointer';
          evt.map.forEachFeatureAtPixel(pixel,
            function(feature, layer) {
              feature.getStyle().setImage(images['start_sel']);
              feature.changed();
              elem.changedFeatures.push(feature);
            }
          );
        } else {
          evt.map.getTarget().style.cursor = '';
          while (elem.changedFeatures.length) {
            let feature = elem.changedFeatures.pop();
            feature.getStyle().setImage(images['start']);
            feature.changed();
          }
        }
      });
    }
  }
</script>

<style lang="css">
</style>
