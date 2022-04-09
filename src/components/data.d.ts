// 条件项
export interface BranchItem {
  branchData?: Record<string, any> // 分支绑定的数据
  nodeList?: FlowItem[]
}

export interface FlowItem {
  type: 'branch' | 'sponsor' | 'approver' | 'notice' // 类型为条件类型和node类型
  nodeData?: Record<string, any> // 节点绑定的数据
  branchList?: BranchItem[] // 条件列表
}
