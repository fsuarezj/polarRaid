<template>
  <div>
  </div>
</template>

<script>
  import ol from "openlayers"
  import { getFirebaseRef } from './mixins/FirebaseDB'
  import gjt from 'geojson-tools'

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
    props: {
      fitView: {
        default: false
      }
    },
    data() {
      return {
        overlays: [],
        track: NaN,
        style: style['redLineStyle']
      }
    },
    computed: {
      layer() {
        return new ol.layer.Vector({
          source: this.source,
        });
      },
      layer2() {
        return new ol.layer.Vector({
          source: this.source2,
        });
      },
      source() {
        let elem = this;
        let src = new ol.source.Vector({
          features: (new ol.format.GeoJSON({featureProjection: 'EPSG:3857'})).readFeatures(this.track)
        });
        src.forEachFeature(function(feature) {
          feature.setStyle(elem.style);
        })
        return src;
      },
      source2() {
        let elem = this;
        let src = new ol.source.Vector({
          features: (new ol.format.GeoJSON({featureProjection: 'EPSG:3857'})).readFeatures(this.pointsTrack)
        });
        // src.forEachFeature(function(feature) {
        //   feature.setStyle(elem.style);
        // })
        return src;
      }
    },
    mounted() {
      let elem = this;

      getFirebaseRef('pointsTrack').once("value")
        .then(snapshot => {
          return snapshot;
        })
        .catch(message => {
          console.error("Error when getting points from Firebase", message);
        })
        .then(function(snapshot) {
          elem.pointsTrack = snapshot.val();
          // Draws linestring track
          let pointsCoordinates = []
          for (let point of elem.pointsTrack.features) {
            pointsCoordinates.push(gjt.toArray(point.geometry))
          }
          elem.track = gjt.toGeoJSON(pointsCoordinates, 'LineString')
          elem.$parent.addLayer(elem.layer);

          // Fits the screen to the track
          let feature = elem.source.getFeatures()[0];
          let polygon = feature.getGeometry();
          elem.$parent.fitView(polygon);

          // Draws the pointsTrack layer
          elem.$parent.addLayer(elem.layer2);

          elem.$emit('layerLoaded');
        })
        .catch(message => {
          console.error("Error when drawing points layer", message);
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
