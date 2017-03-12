<template lang="html">
  <div :class="feature.get('type')" class="overlay" @click="requestModal">
    <feature-viewer :feature="feature" :thumbnail="thumbnail"></feature-viewer>
  </div>
</template>

<script>
import ol from "openlayers"
import FeatureViewer from './FeatureViewer.vue'

export default {
  props: {
    feature: {
      required: true
    }
  },
  components: {
    FeatureViewer
  },
  data() {
    return {
      thumbnail: true
    }
  },
  computed: {
    overlayWidth() {
      if (this.feature.get('type') === 'image') {
        return 300;
      }
    },
    xPosition() {
      return this.overlayWidth/2 + 40;
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
      positioning: 'center-center',
      autoPan: "true",
      offset: [-this.xPosition, -20]
    }));
  }
}
</script>

<style lang="scss" scoped>
  div .overlay {
    background-color: #FFF;
    padding: 0px;
    box-shadow: 0 2px 2px rgba(0, 0, 0, .66);
    -ms-transform: rotate(-5deg); /* IE 9 */
    -webkit-transform: rotate(-5deg); /* Chrome, Safari, Opera */
    transform: rotate(-5deg);
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
