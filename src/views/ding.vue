<template>
  <layout :data="list" />
  <div class="op-wrapper">
    <el-button @click="mockData">
      有数据
    </el-button>
    <el-button type="primary" @click="resetData">
      重置流程
    </el-button>
    <el-button type="primary" @click="previewJSON">
      控制台查看json
    </el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import Layout from '@/components/layout.vue'
import { mock, mock1 } from '@/components/mock'
import type { FlowItem } from '../components/data'

export default defineComponent({
  name: 'HomeView',
  components: {
    Layout
  },
  setup() {
    const list = ref<FlowItem[]>([])

    const mockData = () => {
      list.value = mock1
    }

    const resetData = () => {
      list.value = mock
    }

    const previewJSON = () => {
      console.log(JSON.stringify(list.value))
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
      previewJSON
    }
  }
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
