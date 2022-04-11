<template>
  <layout :data="list"></layout>
  <div class="op-wrapper">
    <el-button @click="mockData">有数据</el-button>
    <el-button type="primary" @click="resetData">重置流程</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import Layout from '@/components/layout.vue'
import { mock1, mock } from '@/components/mock'
import type { FlowItem } from '../components/data'

export default defineComponent({
  name: 'HomeView',
  components: {
    Layout,
  },
  setup() {
    const list = ref<FlowItem[]>([])

    const mockData = () => {
      list.value = mock1
    }

    const resetData = () => {
      list.value = mock
    }

    onMounted(() => {
      setTimeout(() => {
        list.value = mock1
      }, 200)
    })

    return {
      list,
      mockData,
      resetData,
    }
  },
})
</script>

<style lang="scss" scoped>
.op-wrapper {
  position: fixed;
  top: 20px;
  left: 20px;
  padding: 5px 20px;
  background: #fff;
}
</style>
