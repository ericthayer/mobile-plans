<template>
  <IntroductionItems />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import IntroductionItems from '../components/text/IntroductionItems.vue'

export default defineComponent({
  name: 'Introduction View',
  components: {
    IntroductionItems
  },
})
</script>
