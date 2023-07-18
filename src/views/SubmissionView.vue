<template>
  <MobilePlanForm title="Mobile Plans" @onChange="setDeviceManufacturer" />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import MobilePlanForm from '../components/forms/MobilePlanForm.vue'

export default defineComponent({
  name: 'SubmissionView',
  components: {
    MobilePlanForm
  },
  data() {
    return {

    }
  },
  setup() {
    // const platformStore = usePlatformStore()
    return {
    }
  },
  computed: {

  },
  methods: {
    setDeviceManufacturer(deviceManufacturer: string) {
      console.log("deviceManufacturer", deviceManufacturer)
    }
  },
})
</script>

<style lang="scss">
</style>
