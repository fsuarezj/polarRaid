<template lang="html">
  <div class="box">
    <div class="note-header"></div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  .box {
    background-image: url("http://localhost:8081/src/assets/logo_notebook.png");
    background-size: contain;
    color: #DDD;
    width: 20%;
    padding: 10px;
    margin-top: -2%;
    margin-left: -1%;
    position: fixed;
    z-index: 10;
    vertical-align: middle;
    -ms-transform: rotate(-12deg); /* IE 9 */
    -webkit-transform: rotate(-12deg); /* Chrome, Safari, Opera */
    transform: rotate(-12deg);
    position: relative;
  }
  .box:before {
    content: "";
    display: block;
    padding-top: 97.94%;
  }
  .note-header {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  h1 {
    margin: 0px 100px 0px 0px;
  }
</style>
