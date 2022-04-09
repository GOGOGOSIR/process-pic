<template>
  <layout :data="list"></layout>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import Layout from '@/components/layout.vue'
import { mock1 } from '@/components/mock'
import type { FlowItem } from '../components/data'

export default defineComponent({
  name: 'HomeView',
  components: {
    Layout,
  },
  setup() {
    const list = ref<FlowItem[]>([])

    onMounted(() => {
      setTimeout(() => {
        list.value = mock1
      }, 200)
    })

    return {
      list,
    }
  },
})
</script>
