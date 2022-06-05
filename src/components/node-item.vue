<template>
  <div :class="{ 'node-wrapper': true, sponsor: type === 'sponsor' }">
    <div class="node-wrapper-box">
      <div class="title" :style="{ background: data.bgColor }">
        {{ data.text }}
        <span @click="deleteNode">删除</span>
      </div>
    </div>
    <div class="add-node-btn-box">
      <div class="add-node-btn">
        <add-button @add-node="handleAddNode" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import AddButton from './add-button.vue'
import useOperate from './use-operate'
import type { PropType } from 'vue'
import type { FlowItem, NodeItemType } from './data'

export default defineComponent({
  name: 'NodeItem',

  components: {
    AddButton
  },

  props: {
    type: {
      type: String as PropType<'sponsor' | 'approver' | 'notice'>,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    parentList: {
      type: Array as PropType<FlowItem[]>,
      required: true
    }
  },

  setup(props) {
    const dataMap = {
      sponsor: {
        bgColor: 'rgb(87, 106, 149)',
        text: '发起人'
      },
      approver: {
        bgColor: 'rgb(255, 148, 62)',
        text: '审批人'
      },
      notice: {
        bgColor: 'rgb(50, 150, 250)',
        text: '抄送人'
      }
    }
    const data = computed(() => {
      return dataMap[props.type]
    })
    const { addNode } = useOperate()

    const deleteNode = () => {
      const pList = props.parentList
      pList.splice(props.index, 1)
    }

    const handleAddNode = (type: NodeItemType) => {
      addNode({ type, list: props.parentList, index: props.index })
    }

    return {
      data,
      deleteNode,
      handleAddNode
    }
  }
})
</script>

<style lang="scss" scoped>
.node-wrapper {
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  box-sizing: border-box;
  padding: 0 50px;
  position: relative;
  &.sponsor {
    .node-wrapper-box {
      &::before {
        display: none;
      }
      .title {
        > span {
          display: none;
        }
      }
    }
  }
  .node-wrapper-box {
    display: inline-flex;
    flex-direction: column;
    position: relative;
    width: 220px;
    min-height: 72px;
    flex-shrink: 0;
    background: #ffffff;
    border-radius: 4px;
    cursor: pointer;
    box-shadow: 0 2px 5px 0 rgb(0 0 0 / 10%);
    &::before {
      box-sizing: border-box;
      content: '';
      position: absolute;
      top: -12px;
      left: 50%;
      -webkit-transform: translateX(-50%);
      transform: translateX(-50%);
      width: 0;
      height: 4px;
      border-style: solid;
      border-width: 8px 6px 4px;
      border-color: #cacaca transparent transparent;
      background: #f5f5f7;
    }
    .title {
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 10px;
      padding-right: 10px;
      width: 100%;
      height: 24px;
      line-height: 24px;
      font-size: 12px;
      color: #ffffff;
      text-align: left;
      background: #576a95;
      border-radius: 4px 4px 0px 0px;
    }
  }
  .add-node-btn-box {
    width: 240px;
    display: inline-flex;
    flex-shrink: 0;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 0;
      margin: auto;
      width: 2px;
      height: 100%;
      background-color: #cacaca;
    }
    .add-node-btn {
      box-sizing: border-box;
      user-select: none;
      width: 100%;
      padding: 20px 0px 32px;
      display: flex;
      justify-content: center;
      flex-shrink: 0;
      flex-grow: 1;
    }
  }
}
</style>
