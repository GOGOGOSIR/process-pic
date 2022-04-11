import type { NodeItemType, FlowItem } from './data'

export default () => {
  const addNode = (
    type: NodeItemType,
    list: FlowItem[],
    index: number,
    data?: Record<string, any>,
  ) => {
    const nextIndex = index + 1
    if (type === 'branch') {
      const len = list.length
      const othersNode = list.slice(nextIndex, len)
      list.splice(nextIndex, len, {
        type: 'branch',
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
    } else {
      const item = data ? { type, nodeData: data } : { type }
      list.splice(nextIndex, 0, item)
    }
  }

  return { addNode }
}
