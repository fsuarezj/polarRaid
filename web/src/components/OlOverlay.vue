<template lang="html">
  <div :class="feature.get('type')" class="overlay" @click="requestModal">
    <slot></slot>
  </div>
</template>

<script>
import ol from "openlayers"

var getOverlayPosition = function(position) {
  var mq = window.matchMedia("(min-width: 768px)");
  if (mq.matches) {
    return position;
  } else {
    return [0, 0];
  }
}

export default {
  props: {
    feature: {
      required: true
    }
  },
  methods: {
    requestModal() {
      this.$parent.createModal(this.feature);
    }
  },
  created() {
  },
  mounted() {
    this.$parent.addOverlay(new ol.Overlay({
      element: this.$el,
      position: this.feature.getGeometry().getCoordinates(),
      // positioning: 'center-center',
      offset: [-90, -70]
    }));
  }
}
</script>

<style lang="scss" scoped>
  div .overlay {
    background-color: #FFF;
    padding: 0px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  }
  div .image {
    padding: 8px;
  }

  @media screen and (min-width: 600px) {
    .estilo-molon {
      color: #F00;
    }
    div .image {
      @extend .estilo-molon;
    }
  }
</style>
