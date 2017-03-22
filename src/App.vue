<template>
  <div>
    <button v-side-nav:rightSidetext="rightSidenav" ref="rightSidetextTrigger"></button>
    <v-side-nav id="rightSidetext">
        <a href="#" data-activates="rightSidetext" id="closeSidetext-btn" @click="closeSidetext"><i id="closeSidetext-icon" class="material-icons">close</i></a>
        <feature-viewer v-if="sidetextContent" :feature="sidetextContent"></feature-viewer>
    </v-side-nav>

    <pr-modal-component v-if="showModal" @close="showModal = false" :modalType="modalType">
      <feature-viewer v-if="modalOpened" :feature="modalContent"></feature-viewer>
    </pr-modal-component>

    <openlayers-mio @modalRequest="createModal" @sidenavRequest="createSidenav"></openlayers-mio>

          <note-header>
          </note-header>
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
      modalType: 'basic',
      modalContent: NaN,
      showModal: false,
      rightSidenav: {
        edge: 'right'
      },
      sidetextContent: NaN
    }
  },
  methods: {
    createModal(content) {
      this.modalContent = content;
      this.modalType = content.get('type');
      this.modalOpened = true;
      this.showModal = true;
      // this.$refs.myModal.openModal();
    },
    createSidenav(content) {
      console.log("Creating side text");
      this.sidetextContent = content;
      this.$refs.rightSidetextTrigger.click();
    },
    closeSidetext() {
      $('#closeSidetext-btn').sideNav('hide');
    }
  }
}
</script>

<style lang="scss" scoped>
  .row, .col-lg-12 {
  }

  #rightSidetext {
    background-color: transparent;
    box-shadow: 0px 0px 0px;
    // background-image: url(assets/papel_viejo1.png);
    background-image: url("http://localhost:8080/src/assets/papel_viejo1.png");
    text-align: justify;
    width: 100%;
    padding: 40px;
  }

  #closeSidetext-btn {
    width: auto;
    height: auto;
    float: right;
    z-index: 10;
    text-align: center;
    position: relative;
    padding: 10px;
    margin: 0px;
    vertical-align: middle;
  }

  #closeSidetext-icon {
    width: auto;
    margin: 0 auto;
    padding: 10px;
    position: relative;
  }

  @media (min-width: 702px) {
    #rightSidetext {
      width: 702px;
    }
  }
</style>
