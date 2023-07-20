<template>
  <div class="intro">
    <h1 class="kite-type-style--title-2">{{ msg }}</h1>
    <h2 class="kite-type-style--body-display">
      Technical interview submission of <a href="https://ethayer.design/">Eric Thayer</a>.
      <br/>      
      Please <a href="mailto:ethayer.design@gmail" target="_blank" rel="noopener">contact</a> me with any questions or comments.
    </h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Introduction',
  props: {
    msg: String
  },
})
</script>

<style lang="scss" scoped>

.intro {
  margin-top: 0;
  margin-right: auto;
  margin-bottom: 0;
  margin-left: auto;
  max-width: 65ch;
  text-align: center;

  a {
    color: var(--kite-link-text-color);
    text-decoration: underline;
  }
}

@container (min-width: 996px) {
  .intro {
    margin-left: 0;
    text-align: left;
  }
}
</style>
