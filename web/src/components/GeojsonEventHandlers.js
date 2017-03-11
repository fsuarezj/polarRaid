export const eventHandlers = {
  data() {
    return {
      changedFeatures: []
    };
  },
  methods: {
    pointerMoveFunc: function(evt) {
      let elem = this;
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
            feature.getStyle().setImage(elem.styleIcons['start_sel']);
            feature.changed();
            elem.changedFeatures.push(feature);
          },
          {
            layerFilter: layer => {
              return layer === elem.vector;
            }
          }
        );
      } else {
        evt.map.getTarget().style.cursor = '';
        while (elem.changedFeatures.length) {
          let feature = elem.changedFeatures.pop();
          feature.getStyle().setImage(elem.styleIcons['start']);
          feature.changed();
        }
      }
    },
    clickFunc: function(evt) {
      let elem = this;
      let feature = evt.map.forEachFeatureAtPixel(evt.pixel,
        function(feature) {
          console.log(feature.getGeometry());
          return feature;
        },
        {
          'layerFilter': function(layer) {
            console.log("Testing layer");
            return layer === elem.vector;
          },
          'hitTolerance': 9
        }
      );
      console.log("Feature = ", feature.get('name'));
      if (feature.get('type') === "image") {
        let coordinates = feature.getGeometry().getCoordinates();
        elem.overlays.push({
          name: feature.get('name'),
          type: feature.get('type'),
          position: coordinates
        });
      }
    }
  }
}
