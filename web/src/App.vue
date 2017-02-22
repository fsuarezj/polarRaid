<template>
  <div class="container">
    <note-header></note-header>
    <!-- <div class="vignete"></div> -->
    <openlayers-mio></openlayers-mio>
  </div>
</template>

<script>
import GoogleMap from './components/GoogleMap.vue'
import OpenLayers from './components/OpenLayers.vue'
import PrHeader from './components/PrHeader.vue'
import NoteHeader from './components/NoteHeader.vue'

export default {
  components: {
    // 'google-map-mio': GoogleMap,
    'openlayers-mio': OpenLayers,
    'pr-header': PrHeader,
    'note-header': NoteHeader
  }
}
</script>

<style lang="scss">
  .container {
    padding-left: 0px;
    padding-right: 0px;
    height: 100%;
    width: 100%;
    position: relative;
  }
  .vignete {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-box-shadow:
    	inset 0 0 50px #A07244,
      inset 0 0 50px #A07244,
      inset 0 0 50px #A07244;

    -moz-box-shadow:
      inset 0 0 50px #A07244,
      inset 0 0 50px #A07244;

    box-shadow:
    	inset 0 0 50px #A07244,
      inset 0 0 50px #A07244,
      inset 0 0 50px #A07244;
    z-index: 1;
  }
</style>
