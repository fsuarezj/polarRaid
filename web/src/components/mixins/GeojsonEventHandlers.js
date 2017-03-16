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
            return layer === elem.vector;
          },
          'hitTolerance': 9
        }
      );
      if (hit) {
        evt.map.getTarget().style.cursor = 'pointer';
        evt.map.forEachFeatureAtPixel(pixel,
          function(feature, layer) {
            feature.getStyle().setImage(elem.styleIcons[feature.get('type') + '_sel']);
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
          feature.getStyle().setImage(elem.styleIcons[feature.get('type')]);
          feature.changed();
        }
      }
    },
    clickFunc: function(evt) {
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
        let feature = evt.map.forEachFeatureAtPixel(evt.pixel,
          function(feature) {
            let mq = window.matchMedia("(max-width: 767px)");
            if (mq.matches) {
              switch (feature.get('type')) {
                case "image":
                case "souvenir":
                  elem.$parent.createModal(feature);
                  return;
              }
            }
            switch (feature.get('type')) {
              case "image":
              case "souvenir":
                elem.$parent.overlays.push(feature);
                break;
              case "text":
                elem.$parent.createSidetext(feature);
            }
          },
          {
            'layerFilter': function(layer) {
              return layer === elem.vector;
            },
            'hitTolerance': 9
          }
        );
      } else {
        elem.$parent.overlays = [];
      }
    }
  }
}
