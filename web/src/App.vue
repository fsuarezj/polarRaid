<template>
  <div>
    <pr-modal-component v-if="showModal" @close="showModal = false" :modalType="modalType">
      <feature-viewer :feature="modalContent"></feature-viewer>
    </pr-modal-component>
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
import ModalComponent from './components/ModalComponent.vue'
import FeatureViewer from './components/FeatureViewer.vue'

export default {
  components: {
    'openlayers-mio': OpenLayers,
    'note-header': NoteHeader,
    'pr-modal-component': ModalComponent,
    FeatureViewer
  },
  data() {
    return {
      showModal: false,
      modalType: 'basic',
      modalContent: NaN
    }
  },
  methods: {
    createModal(content) {
      this.modalContent = content;
      this.modalType = content.get('type');
      this.showModal = true;
    }
  }
}
</script>

<style scoped>
  .row, .col-lg-12 {
  }
</style>
