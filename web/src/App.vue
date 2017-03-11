<template>
  <div>
    <div class="content">
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <note-header></note-header>
        </div>
      </div>
    </div>
    <openlayers-mio @modalRequest="createModal"></openlayers-mio>
  </div>
</template>

<script>
import OpenLayers from './components/OpenLayers.vue'
import NoteHeader from './components/NoteHeader.vue'

export default {
  components: {
    'openlayers-mio': OpenLayers,
    'note-header': NoteHeader
  },
  methods: {
    createModal(content) {
      console.log("Creating modal");
    }
  }
}
</script>

<style scoped>
  .row, .col-lg-12 {
  }
</style>
