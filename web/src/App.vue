<template>
  <openlayers-mio></openlayers-mio>
</template>

<script>
import GoogleMap from './components/GoogleMap.vue'
import OpenLayers from './components/OpenLayers.vue'

export default {
  components: {
    'google-map-mio': GoogleMap,
    'openlayers-mio': OpenLayers
  }
}
</script>

<style lang="scss">
</style>
