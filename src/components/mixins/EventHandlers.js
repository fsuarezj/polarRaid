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
    addActiveLayer(layerProps) {
      if (layerProps.layerId in this.activeLayers) {
        console.error('layerId already used')
      } else {
        this.activeLayers[layerProps.layerId] = {
          'layer': layerProps.layer,
          'mouseOverCallback': layerProps.mouseOverCallback,
          'mouseOutCallback': layerProps.mouseOutCallback,
          'clickCallback': layerProps.clickCallback
        }
      }
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
            return layer.get('layerId') in elem.activeLayers;
          },
          'hitTolerance': elem.hitTolerance
        }
      );
      if (hit) {
        evt.map.getTarget().style.cursor = 'pointer';
        evt.map.forEachFeatureAtPixel(pixel,
          function(feature, layer) {
            // console.log("Seleccionando del tipo ", feature.get('type'));
            if (elem.activeLayers[layer.get('layerId')].mouseOverCallback) {
              if (!elem.mouseIsAlreadyOver(feature)) {
                elem.activeLayers[layer.get('layerId')].mouseOverCallback(feature)
                if (elem.activeLayers[layer.get('layerId')].mouseOutCallback) {
                    elem.mouseOverFeatures.push({
                      'feature': feature,
                      'revertChange': elem.activeLayers[layer.get('layerId')].mouseOutCallback
                    });
                  }
              }
            }
          },
          {
            layerFilter: layer => {
              return layer.get('layerId') in elem.activeLayers;
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
    clickFunc: function(evt) {
      let elem = this;
      if (evt.dragging) {
        return;
      }
      let pixel = evt.map.getEventPixel(evt.originalEvent);
      // let hit = evt.map.hasFeatureAtPixel(
      //   pixel,
      //   {
      //     'layerFilter': function(layer) {
      //       return elem.activeLayers.hasOwnProperty(layer);
      //     },
      //     'hitTolerance': elem.hitTolerance
      //   }
      // );
      // if (hit) {
      let hit = false
      evt.map.forEachFeatureAtPixel(pixel,
        function(feature, layer) {
          hit = true
          if (elem.activeLayers[layer.get('layerId')].clickCallback) {
              elem.activeLayers[layer.get('layerId')].clickCallback(feature)
          }
        },
        {
          layerFilter: layer => {
            return layer.get('layerId') in elem.activeLayers;
          },
          'hitTolerance': elem.hitTolerance
        }
      );
      if (!hit) {
        this.overlays = []
      }
      // }
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
    }
  }
}
