<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="intro">
    <h1 class="kite-type-style--title-2">{{ msg }}</h1>
    <h2 class="kite-type-style--body-display">
      Technical interview submission of <a href="https://ethayer.design/">Eric Thayer</a>.
      <br/>      
      Please <a href="mailto:ethayer.design@gmail" target="_blank" rel="noopener">email</a> me if you have any questions or comments.
    </h2>
  </div>
</template>

<style scoped>

.intro {
  margin-top: 0;
  margin-right: auto;
  margin-bottom: 0;
  margin-left: auto;
  max-width: 65ch;
  text-align: center;
}

@container (min-width: 996px) {
  .intro {
    margin-left: 0;
    text-align: left;
  }
}
</style>
