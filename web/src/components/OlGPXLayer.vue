<template>
  <div></div>
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
        defaul: false
      }
    },
    data() {
      return {
        style: style['redLineStyle']
      };
    },
    computed: {
      vector() {
        return new ol.layer.Vector({
          source: this.source,
          style: this.style
        });
      },
      source() {
        return new ol.source.Vector({
          url: './src/assets/track.gpx',
          format: new ol.format.GPX()
        });
      }
    },
    methods: {
      pointerMoveFunc: function(evt) {
        console.log("Entra");
        let elem = this;
        if (evt.dragging) {
          return;
        }
        let pixel = evt.map.getEventPixel(evt.originalEvent);
        let hit = evt.map.hasFeatureAtPixel(
          pixel,
          {
            'layerFilter': function(layer) {
              return layer === elem.vector;
            },
            'hitTolerance': 9
          }
        );
        if (hit) {
          console.log("Cambia");
          // evt.map.getTarget().style.cursor = 'pointer'; // No pinta el pointer xq lo anulo con el on('pointermove') de la capa geojson
          evt.map.forEachFeatureAtPixel(pixel,
            function(feature, layer) {
              console.log("Las keys de la feature son ", feature.getGeometry().getKeys());
              console.log("Las properties de la feature son ", feature.getGeometry().getProperties());
              console.log("El punto es ", evt.coordinate)
              console.log("El punto más cercano ", feature.getGeometry().getClosestPoint(evt.coordinate));
            },
            {
              layerFilter: layer => {
                return layer === elem.vector;
              }
            }
          );
        } else {
          evt.map.getTarget().style.cursor = '';
          // while (elem.changedFeatures.length) {
          //   let feature = elem.changedFeatures.pop();
          //   feature.getStyle().setImage(elem.styleIcons[feature.get('type')]);
          //   feature.changed();
          // }
        }
      },
    },
    mounted() {
      this.$parent.addLayer(this.vector);
      let dad = this.$parent;
      if (this.fitView) {
        // To be sure that source has been initialized
        this.source.on('change', function(evt) {
          let srcAux = evt.target;
          if (srcAux.getState() === 'ready') {
            let feature = srcAux.getFeatures()[0];
            let polygon = feature.getGeometry();
            dad.fitView(polygon);
          }
        });
      }
      this.$parent.addEventHandler('pointermove', this.pointerMoveFunc);
    }
  }
</script>

<style lang="css">
</style>
