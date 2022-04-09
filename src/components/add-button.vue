<template>
  <VDropdown placement="right-start" :distance="12">
    <button type="button" class="btn">
      <i class="iconfont iconfangda"></i>
    </button>
    <template #popper>
      <ul class="list">
        <li class="item">审批人</li>
        <li class="item">抄送人</li>
        <li class="item">分支条件</li>
      </ul>
    </template>
  </VDropdown>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AddButton',
  setup() {
    //
  },
})
</script>

<style lang="scss" scoped>
.btn {
  outline: none;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 10%);
  width: 30px;
  height: 30px;
  background: #3296fa;
  border-radius: 50%;
  border: none;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  color: #fff;
  cursor: pointer;
  position: relative;
  z-index: 1;
  &:hover {
    transform: scale(1.3);
    box-shadow: 0 13px 27px 0 rgb(0 0 0 / 10%);
  }
}
.list {
  width: 408px;
  padding: 12px 16px;
  background-color: #fff;
  box-sizing: border-box;
}
.item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 14px;
  color: #191f25;
  margin-right: 8px;
  margin-bottom: 8px;
  width: 160px;
  background: rgba(17, 31, 44, 0.02);
  padding: 8px;
  border-radius: 4px;
  &:hover {
    background: #3296fa;
    color: #fff;
  }
}
</style>
