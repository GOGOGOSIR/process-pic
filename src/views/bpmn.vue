<template>
  <bpmn-layout />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BpmnLayout from '@/bpmn/layout.vue'

export default defineComponent({
  name: 'Bpmn',

  components: {
    BpmnLayout
  },

  setup() {

  }
})
</script>
