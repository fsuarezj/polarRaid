<template lang="html">
  <div :class="feature.get('type')" class="panel" @click="requestModal">
    <h2>{{ feature.get('name') }}</h2>
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
  div {
    position: absolute;
    background-color: #FFF;
    padding: 5px;
  }
  div .image {
  }

  @media screen and (min-width: 600px) {
    .estilo-molon {
      background-color: #F00;
    }
    div .image {
      @extend .estilo-molon;
    }
  }
</style>
