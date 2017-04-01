export const eventHandlers = {
  data() {
    return {
      mouseOverFeatures: [],
      activeLayers: [],
      hitTolerance: 9
    };
  },
  methods: {
    mouseIsAlreadyOver: function(feature) {
      for (let i of this.mouseOverFeatures) {
        if (feature === i['feature']) {
          return true
        }
      }
      return false
    },
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
            return elem.activeLayers.hasOwnProperty(layer);
          },
          'hitTolerance': elem.hitTolerance
        }
      );
      if (hit) {
        evt.map.getTarget().style.cursor = 'pointer';
        evt.map.forEachFeatureAtPixel(pixel,
          function(feature, layer) {
            // console.log("Seleccionando del tipo ", feature.get('type'));
            if (elem.activeLayers[layer].mouseOverCallback) {
              if (!elem.mouseIsAlreadyOver(feature)) {
                elem.activeLayers[layer].mouseOverCallback(feature)
                if (elem.activeLayers[layer].mouseOutCallback) {
                    elem.mouseOverFeatures.push({
                      'feature': feature,
                      'revertChange': elem.activeLayers[layer].mouseOutCallback
                    });
                  }
              }
            }
          },
          {
            layerFilter: layer => {
              return elem.activeLayers.hasOwnProperty(layer);
            }
          }
        );
      } else {
        evt.map.getTarget().style.cursor = '';
        while (elem.mouseOverFeatures.length) {
          let aux_feat = elem.mouseOverFeatures.pop();
          // console.log("Deleccionando del tipo ", feature.get('type'));
          aux_feat.revertChange(aux_feat.feature);
        }
      }
    },
    addActiveLayer(layer, mouseOverCallback, mouseOutCallback) {
      this.activeLayers[layer] = {
        'mouseOverCallback': mouseOverCallback,
        'mouseOutCallback': mouseOutCallback
      }
    }
    // clickFunc: function(evt) {
    //   let elem = this;
    //   if (evt.dragging) {
    //     return;
    //   }
    //   let pixel = evt.map.getEventPixel(evt.originalEvent);
    //   let hit = evt.map.hasFeatureAtPixel(
    //     pixel,
    //     {
    //       'layerFilter': function(layer) {
    //         return layer === elem.layer;
    //       },
    //       'hitTolerance': 9
    //     }
    //   );
    //   if (hit) {
    //     let feature = evt.map.forEachFeatureAtPixel(evt.pixel,
    //       function(feature) {
    //         let mq = window.matchMedia("(max-width: 767px)");
    //         if (mq.matches) {
    //           switch (feature.get('type')) {
    //             case "image":
    //             case "start":
    //             case "souvenir":
    //               elem.$parent.createModal(feature);
    //               return;
    //           }
    //         }
    //         switch (feature.get('type')) {
    //           case "image":
    //           case "start":
    //           case "souvenir":
    //             elem.$parent.overlays.push(feature);
    //             break;
    //           case "text":
    //             elem.$parent.createSidetext(feature);
    //         }
    //       },
    //       {
    //         'layerFilter': function(layer) {
    //           return layer === elem.layer;
    //         },
    //         'hitTolerance': 9
    //       }
    //     );
    //   } else {
    //     elem.$parent.overlays = [];
    //   }
    // }
  }
}
