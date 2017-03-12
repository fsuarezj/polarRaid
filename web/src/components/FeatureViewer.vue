<template lang="html">
  <div class="">
    <div v-if="!thumbnail" class="">
      <p>
        {{ feature.get('name') }}
      </p>
      <p>
        {{ feature.get('type') }}
      </p>
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
  .my-thumbnail {
    width: 300px;
    padding: 0;
    margin-bottom: 0;
  }
</style>
