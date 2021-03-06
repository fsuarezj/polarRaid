import ol from "openlayers"

export const geojsonLayerBase = {
    props: {
      layerId: {
        required: true
      }
    },
  computed: {
    layer() {
      return new ol.layer.Vector({
        source: this.source,
        layerId: this.layerId
      });
    },
    source() {
      let elem = this;
      let src = new ol.source.Vector({
        features: (new ol.format.GeoJSON({featureProjection: 'EPSG:3857'})).readFeatures(this.features)
      });
      src.forEachFeature(function(feature) {
        feature.setStyle(new ol.style.Style({
          image: elem.styleIcons[feature.get('type')]
          // image: elem.styleIcons['image']
        }));
      })
      return src;
    }
  },
  mounted() {
    console.log("Fuera");
  }
}
