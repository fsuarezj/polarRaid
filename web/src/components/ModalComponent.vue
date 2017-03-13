<template lang="html">
  <div class="">
  <transition name="modal">
    <div class="modal-mask">
    </div>
  </transition>
    <div class="modal-wrapper-outer" @click="$emit('close')">
      <div class="modal-wrapper">
        <div class="modal-container-outer">
          <div :class="modalType + '-modal'" class="modal-container">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" @click="$emit('close')">{{ closeButton }}</button>
            </div>
            <div class="modal-body">
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    'modalType': {
      type: String,
      default: "basic"
    }
  },
  data() {
    return {
      closeButton: "❌"
    }
  },
  mounted() {
    if (this.modalType === "image") {
    }
  }
}
</script>

<style lang="scss" scoped>
  div {
    display: block;
  }

  .modal-mask, .modal-wrapper-outer, .modal-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .modal-mask {
    z-index: 9000;
    background-color: rgba(0, 0, 0, .5);
    display: block;
    transition: opacity .3s ease;
  }

  .modal-wrapper-outer {
    z-index: 9010;
  }

  .modal-wrapper {
    // display: table-cell;
    // vertical-align: middle;
    position: absolute;
    text-align: center;
    vertical-align: middle;
  }

  .modal-wrapper:before {
    content: "";
    display: inline-block;
    color: #000;
    height: 100%;
    vertical-align: middle;
  }

  .modal-container-outer {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    margin: 0px auto;
    // padding: 0 1em;
    padding: 0px;
    box-sizing: border-box;
    z-index: 9200;
    text-align: left;
    max-width: 90%;
  }

  .modal-container {
    position: relative;
  }

  .image-modal {
    background-color: #FFF;
    padding: 2.5%;
    -ms-transform: rotate(0.8deg); /* IE 9 */
    -webkit-transform: rotate(0.8deg); /* Chrome, Safari, Opera */
    transform: rotate(0.8deg);
    box-shadow: 2px 4px 4px rgba(0, 0, 0, .66);
    .modal-header {
      height: 0px;
      background-color: #0F0;
      .close {
        color: #F00;
        margin-top: -5%;
        margin-right: -4%;
        font-size: 3vw;
      }
    }
  }

  .modal-header {
    padding: 0;
    border: 0px;
  }

  .modal-body {
    margin: 0px 0px 0px 0px;
    padding: 0px;
    max-width: 100%;
    height: auto;
  }

  .modal-default-button {
    float: right;
  }

  /*
  * The following styles are auto-applied to elements with
  * transition="modal" when their visibility is toggled
  * by Vue.js.
  *
  * You can easily play with the modal transition by editing
  * these styles.
  */

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

  // @media (min-width: 767px) {
  //   .modal-container {
  //     max-width: 700px;
  //   }
  // }
  //
  // @media (min-width: 979px) {
  //   .modal-container {
  //     max-width: 900px;
  //   }
  // }
  //
  // @media (min-width: 1200px) {
  //   .modal-container {
  //     max-width: 1100px;
  //   }
  // }

</style>
