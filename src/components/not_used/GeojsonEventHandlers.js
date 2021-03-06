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
            return layer === elem.layer;
          },
          'hitTolerance': 9
        }
      );
      if (hit) {
        evt.map.getTarget().style.cursor = 'pointer';
        evt.map.forEachFeatureAtPixel(pixel,
          function(feature, layer) {
            // console.log("Seleccionando del tipo ", feature.get('type'));
            feature.getStyle().setImage(elem.styleIcons[feature.get('type') + '_sel']);
            feature.changed();
            elem.changedFeatures.push({
              "feature": feature,
              "revertChange": function(feat) {
                feat.getStyle().setImage(elem.styleIcons[feat.get('type')]);
              }
            });
          },
          {
            layerFilter: layer => {
              return layer === elem.layer;
            }
          }
        );
      } else {
        evt.map.getTarget().style.cursor = '';
        while (elem.changedFeatures.length) {
          let feature = elem.changedFeatures.pop();
          // console.log("Deleccionando del tipo ", feature.get('type'));
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
            return layer === elem.layer;
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
                case "start":
                case "souvenir":
                  elem.$parent.createModal(feature);
                  return;
              }
            }
            switch (feature.get('type')) {
              case "image":
              case "start":
              case "souvenir":
                elem.$parent.overlays.push(feature);
                break;
              case "text":
                elem.$parent.createSidetext(feature);
            }
          },
          {
            'layerFilter': function(layer) {
              return layer === elem.layer;
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
