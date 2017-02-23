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

  var redLineStyle = new ol.style.Style({
    stroke: new ol.style.Stroke({
      // color: '#999',
      color: '#C00',
      lineDash: dashHandDrawn(),
      width: 5,
    })
  });

  export default {
    props: {
      fitView: false
    },
    data() {
      return {
        source: new ol.source.Vector({
          url: './src/assets/track.gpx',
          format: new ol.format.GPX()
          // features: new ol.format.GPX({}).readFeatures('./src/assets/track.gpx'),
        }),
        style: redLineStyle
      };
    },
    mounted() {
      this.$parent.addLayer(new ol.layer.Vector({
        source: this.source,
        style: this.style
      }));
      let dad = this.$parent;
      if (this.fitView) {
        console.log('Entrando en fitView');
        // To be sure that source has been initialized
        this.source.on('change', function(evt) {
          let srcAux = evt.target;
          if (srcAux.getState() === 'ready') {
            console.log('Source ready');
            let feature = srcAux.getFeatures()[0];
            let polygon = feature.getGeometry();
            dad.fitView(polygon);
          }
        });
      }
    }
  }
</script>

<style lang="css">
</style>
