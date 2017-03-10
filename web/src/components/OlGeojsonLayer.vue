<template>
  <div></div>
</template>

<script>
  import ol from "openlayers"
  import col from './../assets/geo.json'

  var style = {
    'redLineStyle' : new ol.style.Style({
      stroke: new ol.style.Stroke({
        // color: '#999',
        color: '#C00',
        width: 5,
      })
    }),
    'point': new ol.style.Style({
      image: new ol.style.Icon({
        src: './src/assets/start.png',
        color: '#C00',
        anchor: [0.45, 0.75],
        scale: 0.5
      })
    })
  }

  export default {
    data() {
      return {
        source: new ol.source.Vector({
          features: (new ol.format.GeoJSON({featureProjection: 'EPSG:3857'})).readFeatures(col)
        }),
        style: style['point']
      };
    },
    computed: {
      features() {
        return this.source.getFeatures();
      },
      vector() {
        return new ol.layer.Vector({
          source: this.source,
          style: this.style
        });
      }
    },
    mounted() {
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
    }
  }
</script>

<style lang="css">
</style>
