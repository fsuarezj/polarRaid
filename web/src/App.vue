<template>
  <div>
    <!-- <div class="vignete"></div> -->
    <div class="content">
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <note-header></note-header>
        </div>
      </div>
    </div>
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

<style scoped>
  .row, .col-lg-12 {
  }
</style>
