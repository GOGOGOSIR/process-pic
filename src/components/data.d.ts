// 条件项
export interface BranchItem {
  branchIndex: number // 条件分支的序列号
  duplicationNode?: boolean // 是否复制节点
  branchData?: Record<string, any> // 分支绑定的数据
  nodeList?: FlowItem[]
}

export interface FlowItem {
  type: 'branch' | 'sponsor' | 'approver' | 'notice' // 类型为条件类型和node类型
  nodeData?: Record<string, any> // 节点绑定的数据
  branchList?: BranchItem[] // 条件列表
}

export type NodeItemType = Exclude<FlowItem['type'], 'sponsor'>
