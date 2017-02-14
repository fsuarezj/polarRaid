<template>
  <div id="map"></div>
</template>

<script>
  import ol from "openlayers"
  export default {
    mounted() {
      this.mapObject = new ol.Map({
        target: this.$el,
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
          center: ol.proj.fromLonLat([37.41, 8.82]),
          zoom: 4
        })
      });
    }
  }
</script>

<style scoped>
  #map {
    height: 600px;
    width: 100%;
  }
</style>
