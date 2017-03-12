<template lang="html">
  <div class="">
    <p>
      {{ feature.get('name') }}
    </p>
    <p>
      {{ feature.get('type') }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    feature: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="css">
</style>
