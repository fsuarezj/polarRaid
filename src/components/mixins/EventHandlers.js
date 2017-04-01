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
            // If there is a mouseOverCallback calls it
            if (elem.activeLayers[layer.get('layerId')].mouseOverCallback) {
              if (!elem.mouseIsAlreadyOver(feature)) {
                elem.activeLayers[layer.get('layerId')].mouseOverCallback(feature)
                // If there is a mouseOutCallback include it in the list
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
        // Calls mouseOutCallbacks
        while (elem.mouseOverFeatures.length) {
          let aux_feat = elem.mouseOverFeatures.pop();
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
      let hit = false
      evt.map.forEachFeatureAtPixel(pixel,
        function(feature, layer) {
          hit = true
          // If there is a clickCallback calls it
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
    }
  }
}
