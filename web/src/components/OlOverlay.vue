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
      switch (this.feature.get('type')) {
        case "image":
        case "souvenir":
          return 300;
      }
    },
    xPosition() {
      return this.overlayWidth/2 + 40;
    },
    // randRotation() {
    //   return Math.random()*5 - 10;
    // },
    // styleRotation() {
    //   return "ms-transform: rotate(" + this.styleRotation + "); transform: rotate(" + this.styleRotation + "); -webkit-transform: rotate(" + this.styleRotation + ");";
    // }
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
    padding: 0px;
  }

  div .image {
    background-color: #FFF;
    padding: 8px;
    -ms-transform: rotate(-5deg); /* IE 9 */
    transform: rotate(-5deg);
    -webkit-transform: rotate(-5deg); /* Chrome, Safari, Opera */
    box-shadow: 1px 2px 2px rgba(0, 0, 0, .66);
  }

  div .souvenir {
    -webkit-transform: rotate(3deg); /* Chrome, Safari, Opera */
    -ms-transform: rotate(3deg); /* IE 9 */
    transform: rotate(3deg);
    -webkit-filter: drop-shadow(1px 2px 2px rgba(0, 0, 0, .66));
    filter: drop-shadow(1px 2px 2px rgba(0, 0, 0, .66));
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
