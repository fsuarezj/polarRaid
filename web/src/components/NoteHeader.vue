<template lang="html">
  <div class="note-header">
    <!-- <img src="src/assets/logo_notebook.png" alt=""> -->
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
  .note-header {
    background-image: url("http://localhost:8081/src/assets/logo_notebook.png");
    background-size: contain;
    color: #DDD;
    width: 350px;
    height: 350px;
    padding: 10px;
    margin-top: -15px;
    position: fixed;
    z-index: 10;
    vertical-align: middle;
    -ms-transform: rotate(-7deg); /* IE 9 */
    -webkit-transform: rotate(-7deg); /* Chrome, Safari, Opera */
    transform: rotate(-7deg);
  }
  h1 {
    margin: 0px 100px 0px 0px;
  }
</style>
