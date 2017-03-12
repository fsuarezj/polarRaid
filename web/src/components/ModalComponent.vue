<template lang="html">
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div :class="modalType + '-modal'" class="modal-container">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" @click="$emit('close')">&times;</button>
          </div>
          <div class="modal-body">
            {{ modalType }}
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    'modalType': {
      type: String,
      default: "basic"
    }
  }
}
</script>

<style lang="scss">
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 300px;
    margin: 0px auto;
    padding: 3px 3px 10px 10px;
    transition: all .3s ease;
  }

  .basic-modal {
    background-color: #DDF;
    font-family: Helvetica, Arial, sans-serif;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  }

  .modal-header {
    padding: 0;
    border: 0px;
  }

  .modal-body {
    margin: 0px 7px 0px 0px;
    padding: 0px;
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
</style>
