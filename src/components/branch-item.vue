<template>
  <div class="branch-wrap">
    <div class="branch-box-wrap">
      <div class="branch-box">
        <button class="add-branch">添加条件</button>
        <!-- 条件节点 -->
        <template v-for="(item, index) in list" :key="`p-${index}`">
          <div class="branch-col">
            <div
              v-if="index === 0"
              class="border-line border-left-top-line"
            ></div>
            <div
              v-if="index === 0"
              class="border-line border-left-bottom-line"
            ></div>
            <div
              v-if="index === list.length - 1"
              class="border-line border-right-top-line"
            ></div>
            <div
              v-if="index === list.length - 1"
              class="border-line border-right-bottom-line"
            ></div>
            <div class="condition-node">
              <div class="condition-node-box">
                <div class="auto-judge">
                  <div class="title-wrapper">
                    <span>条件1</span>
                    <span>优先级1</span>
                    <span>复制</span>
                    <span>删除</span>
                  </div>
                  <div class="content">请设置条件</div>
                  <div v-if="index !== 0" class="operate-item operate-left">
                    <i class="iconfont iconfanhui"></i>
                  </div>
                  <div
                    v-if="index !== list.length - 1"
                    class="operate-item operate-right"
                  >
                    <i class="iconfont iconjiantou"></i>
                  </div>
                </div>
                <div class="add-node-btn-box">
                  <div class="add-node-btn">
                    <add-button></add-button>
                  </div>
                </div>
              </div>
            </div>
            <!-- 递归子节点 -->
            <template v-if="item.nodeList && item.nodeList.length">
              <template
                v-for="(subItem, subIndex) in item.nodeList"
                :key="`sub-${index}-${subIndex}`"
              >
                <branch-item
                  v-if="subItem.type === 'branch'"
                  :list="subItem.branchList"
                ></branch-item>
                <node-item v-else :type="subItem.type"></node-item>
              </template>
            </template>
          </div>
        </template>
      </div>
      <div class="add-node-btn-box">
        <div class="add-node-btn">
          <add-button></add-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import AddButton from './add-button.vue'
import NodeItem from './node-item.vue'
import type { BranchItem } from './data'

export default defineComponent({
  name: 'BranchItem',
  props: {
    list: {
      type: Array as PropType<BranchItem[]>,
      required: true,
    },
  },
  components: {
    AddButton,
    NodeItem,
  },
  setup() {
    //
  },
})
</script>

<style lang="scss" scoped>
.branch-wrap {
  width: 100%;
  .branch-box-wrap {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    min-height: 270px;
    width: 100%;
    flex-shrink: 0;
    .branch-box {
      display: flex;
      min-height: 180px;
      height: auto;
      border-bottom: 2px solid #cccccc;
      border-top: 2px solid #cccccc;
      position: relative;
      margin-top: 15px;

      .add-branch {
        box-sizing: border-box;
        border: none;
        outline: none;
        user-select: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        padding: 0 10px;
        height: 30px;
        line-height: 30px;
        border-radius: 15px;
        color: #0089ff;
        background: #fff;
        box-shadow: 0 2px 4px 0 rgb(0 0 0 / 10%);
        position: absolute;
        top: -16px;
        left: 50%;
        transform: translateX(-50%);
        transform-origin: center center;
        cursor: pointer;
        z-index: 1;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        white-space: nowrap;
        &:hover {
          transform: translateX(-50%) scale(1.1);
          box-shadow: 0 8px 16px 0 rgb(0 0 0 / 10%);
        }
      }
      .branch-col {
        background: #f5f5f7;
        display: inline-flex;
        flex-direction: column;
        align-items: center;
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
        .border-line {
          position: absolute;
          width: 50%;
          height: 6px;
          background-color: #f5f5f7;
          z-index: 1;
        }
        .border-left-top-line {
          top: -3px;
          left: -3px;
        }
        .border-left-bottom-line {
          bottom: -3px;
          left: -3px;
        }
        .border-right-top-line {
          top: -3px;
          right: -3px;
        }
        .border-right-bottom-line {
          bottom: -3px;
          right: -3px;
        }
        .condition-node {
          min-height: 220px;
          display: inline-flex;
          flex-direction: column;
          .condition-node-box {
            box-sizing: border-box;
            padding-top: 30px;
            padding-right: 50px;
            padding-left: 50px;
            justify-content: center;
            display: inline-flex;
            align-items: center;
            flex-direction: column;
            flex-grow: 1;
            position: relative;
            &::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              margin: auto;
              width: 2px;
              height: 100%;
              background-color: #cacaca;
            }
            .auto-judge {
              position: relative;
              width: 220px;
              min-height: 72px;
              background: #ffffff;
              border-radius: 4px;
              overflow: hidden;
              padding: 14px 19px;
              cursor: pointer;
              border-color: transparent;
              box-sizing: border-box;
              transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
              &:hover {
                border: 1px solid #3296fa;
                box-shadow: 0 2px 5px 0 rgb(0 0 0 / 10%);
              }
              .title-wrapper {
                display: flex;
                align-items: center;
                justify-content: space-between;
                position: relative;
                font-size: 12px;
                color: #15bc83;
                text-align: left;
              }
              .content {
                font-size: 14px;
                color: #191f25;
                text-align: left;
                margin-top: 6px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
              }
              .operate-item {
                height: 100%;
                position: absolute;
                top: 0;
                display: flex;
                align-items: center;
                background-color: #fff;
                transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
                &:hover {
                  background-color: #e5e5e5;
                }
                > i {
                  font-size: 12px;
                  color: #999;
                }
              }
              .operate-left {
                left: 0;
              }
              .operate-right {
                right: 0;
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
                z-index: -1;
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
        }
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
        z-index: -1;
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
}
</style>
