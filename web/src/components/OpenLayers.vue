<template>
  <div id="map"></div>
</template>

<script>
  import ol from "openlayers"
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
  var lineStyle = new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: '#C00',
      lineDash: dashHandDrawn(),
      width: 5
    })
  });
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
          center: ol.proj.fromLonLat([26, 68.9]),
          zoom: 6
        }),
        controls: ol.control.defaults().extend([
          new ol.control.ScaleLine({
            units: 'degrees'
          })
        ])
      });
      this.mapObject.addLayer(
        new ol.layer.Vector({
          source: new ol.source.Vector({
            url: './src/assets/route.gpx',
            format: new ol.format.GPX()
          }),
          style: lineStyle
        })
      );
      this.mapObject.addLayer(
        new ol.layer.Vector({
          source: new ol.source.Vector({
            url: './src/assets/track.gpx',
            format: new ol.format.GPX()
          }),
          style: lineStyle
        })
      );
      this.mapObject.addLayer(
        new ol.layer.Vector({
          source: new ol.source.Vector({
            url: './src/assets/geo.json',
            format: new ol.format.GeoJSON()
          }),
          style: lineStyle
        })
      );
    }
  }
</script>

<style scoped>
  #map {
    height: 600px;
    width: 100%;
  }
</style>
