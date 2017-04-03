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
        style: {
          'redLineStyle' : new ol.style.Style({
            stroke: new ol.style.Stroke({
              // color: '#999',
              color: '#C00',
              lineDash: dashHandDrawn(),
              width: 5,
            })
          }),
          'invisibleLineStyle' : new ol.style.Style({
            stroke: new ol.style.Stroke({
              // color: '#999',
              color: [255, 255, 255, 0.004],
              width: 5,
              opacity: 50
            })
          }),
          'invisiblePointStyle': new ol.style.Style({
            image: new ol.style.Circle({
              fill: new ol.style.Fill({
                color: 'rgba(0,0,0,0)'
              }),
              radius: 5,
              stroke: new ol.style.Stroke({
                color: 'rgba(0,0,0,0)',
                width: 1
              })
            })
          })
        }
      }
    },
    computed: {
      trackLayer() {
        return new ol.layer.Vector({
          source: this.trackSource
        });
      },
      invisibleTrackLayer() {
        return new ol.layer.Vector({
          source: this.invisibleTrackSource,
          layerId: 'invisibleTrackLayer'
        });
      },
      trackPointsLayer() {
        return new ol.layer.Vector({
          source: this.pointsSource,
          layerId: 'trackPointsLayer'
        });
      },
      trackSource() {
        let elem = this;
        let src = new ol.source.Vector({
          features: (new ol.format.GeoJSON({featureProjection: 'EPSG:3857'})).readFeatures(this.track)
        });
        src.forEachFeature(function(feature) {
          feature.setStyle(elem.style.redLineStyle);
        })
        return src;
      },
      invisibleTrackSource() {
        let elem = this;
        let src = new ol.source.Vector({
          features: (new ol.format.GeoJSON({featureProjection: 'EPSG:3857'})).readFeatures(this.track)
        });
        src.forEachFeature(function(feature) {
          feature.setStyle(elem.style.invisibleLineStyle);
        })
        return src;
      },
      pointsSource() {
        let elem = this;
        let src = new ol.source.Vector({
          features: (new ol.format.GeoJSON({featureProjection: 'EPSG:3857'})).readFeatures(this.pointsTrack)
        });
        src.forEachFeature(function(feature) {
          feature.setStyle(elem.style.invisiblePointStyle);
        })
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
          // for (let point of elem.pointsTrack.features) {
          //   pointsCoordinates.push(gjt.toArray(point.geometry))
          // }
          // Get points coordinates to create the lineString
          Object.keys(elem.pointsTrack.features).map(key => pointsCoordinates.push(gjt.toArray(elem.pointsTrack.features[key].geometry)))
          elem.track = gjt.toGeoJSON(pointsCoordinates, 'LineString')
          elem.$parent.addLayer(elem.trackLayer);
          elem.$parent.addLayer(elem.invisibleTrackLayer);

          // Fits the screen to the track
          let feature = elem.trackSource.getFeatures()[0];
          let polygon = feature.getGeometry();
          elem.$parent.fitView(polygon);

          // Draws the pointsTrack layer
          elem.$parent.addLayer(elem.trackPointsLayer);

          // Adds hover events to invisibleTrackLayer
          elem.$parent.addActiveLayer({
            layerId: 'invisibleTrackLayer',
            layer: elem.invisibleTrackLayer,
            mouseOverCallback: function(feature, evt) {
              let coords = elem.$parent.mapObject.getEventCoordinate(evt.originalEvent)
              let aux_feat = elem.pointsSource.getClosestFeatureToCoordinate(coords)
              console.log("La temperatura es", aux_feat.get('temp')+"\u2103")
            }
          })

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
