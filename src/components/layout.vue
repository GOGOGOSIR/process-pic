<template>
  <div class="layout-wrapper">
    <div class="flow-design">
      <div class="zoom">
        <button @click="triggerCalcScale('reduce')">减少</button>
        <span>{{ scale }}%</span>
        <button @click="triggerCalcScale('add')">增加</button>
      </div>
      <div class="box-scale" :style="{ transform: `scale(${scale / 100})` }">
        <template v-for="(item, index) in list" :key="index">
          <branch-item
            v-if="item.type === 'branch'"
            :list="item.branchList"
          ></branch-item>
          <node-item v-else :type="item.type"></node-item>
        </template>
        <end-item v-if="list.length"></end-item>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, watch } from 'vue'
import NodeItem from './node-item.vue'
import EndItem from './end-item.vue'
import BranchItem from './branch-item.vue'
import type { FlowItem } from './data'

export default defineComponent({
  name: 'BaseLayout',
  props: {
    data: {
      type: Array as PropType<FlowItem[]>,
      required: true,
    },
  },
  components: {
    NodeItem,
    EndItem,
    BranchItem,
  },
  setup(props) {
    const scale = ref(100) // 放大倍数
    const list = ref<FlowItem[]>(props.data)

    watch(
      () => props.data,
      (val) => {
        list.value = val
      },
    )

    // 触发计算放大倍数
    const triggerCalcScale = (type: 'add' | 'reduce') => {
      if (type === 'add') {
        if (scale.value < 300) {
          scale.value += 10
        }
      } else {
        if (scale.value > 50) {
          scale.value -= 10
        }
      }
    }

    return {
      scale,
      list,
      triggerCalcScale,
    }
  },
})
</script>

<style lang="scss" scoped>
.layout-wrapper {
  position: relative;
  height: 100%;
  .flow-design {
    width: 100%;
    background-color: #f5f5f7;
    overflow: auto;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
  }
  .zoom {
    display: flex;
    position: fixed;
    margin-top: 30px;
    z-index: 10;
    right: 40px;
    background-color: #fff;
    padding: 10px;
  }
  .box-scale {
    position: relative;
    padding: 54px 0;
    min-width: 100%;
    display: inline-block;
    align-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;
    background-color: #f5f5f7;
    transform-origin: 50% 0px 0px;
  }
}
</style>
