import { nextTick } from 'vue'
import { scrollToCenter } from './utils'
import type { NodeItemType, FlowItem } from './data'

let addBranchCount = 0

export default () => {
  const addNode = (props: {
    type: NodeItemType
    list: FlowItem[]
    index: number
    data?: Record<string, any>
  }) => {
    const { type, list, index, data } = props
    const nextIndex = index + 1
    if (type === 'branch') {
      const len = list.length
      const othersNode = list.slice(nextIndex, len)
      addBranchCount++
      list.splice(nextIndex, len, {
        type: 'branch',
        sign: `add-branch-${addBranchCount}`,
        branchList: [
          {
            branchIndex: 1,
            nodeList: othersNode,
          },
          {
            branchIndex: 2,
          },
        ],
      })
      nextTick(() => {
        const el = document.querySelector(
          `[data-sign='add-branch-${addBranchCount}']`,
        ) as HTMLElement | null
        // console.log(el)
        if (el) {
          scrollToCenter(el)
        }
      })
    } else {
      const item = data ? { type, nodeData: data } : { type }
      list.splice(nextIndex, 0, item)
    }
  }

  return { addNode }
}
