<template lang="html">
  <div class="feature-viewer-container">
    <div v-if="!thumbnail" :class="feature.get('type') + '-feature-container'">
      <img class="image-feature" v-if="feature.get('type') === 'image'" :src="feature.get('url')">
      <img class="souvenir-feature" v-if="feature.get('type') === 'souvenir'" :src="feature.get('url')">
    </div>
    <img class="my-thumbnail" v-if="thumbnail" :src="feature.get('url')">
  </div>
</template>

<script>
export default {
  props: {
    feature: {
      type: Object,
      required: true
    },
    thumbnail: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
  div {
    margin: 0;
    padding: 0;
  }
  .feature-viewer-container {
    position: relative;
  }

  .my-thumbnail {
    width: 300px;
    padding: 0;
    margin-bottom: 0;
  }

  .image-feature {
    position: relative;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 90vh;
    display: block;
    box-sizing: border-box;
    margin: 0 auto;
    padding: 0;
  }

  .souvenir-feature {
    position: relative;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 90vh;
    display: block;
    box-sizing: border-box;
    margin: 0 auto;
    padding: 0;
    -webkit-filter: drop-shadow(1px 2px 2px rgba(0, 0, 0, .66));
  }
</style>
