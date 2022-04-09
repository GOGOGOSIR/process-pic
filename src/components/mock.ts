import type { FlowItem } from './data'

export const mock1: FlowItem[] = [
  {
    type: 'sponsor',
  },
  {
    type: 'approver',
  },
  {
    type: 'notice',
  },
  {
    type: 'branch',
    branchList: [
      {
        nodeList: [
          {
            type: 'approver',
          },
          {
            type: 'notice',
          },
          {
            type: 'branch',
            branchList: [
              {},
              {
                nodeList: [
                  {
                    type: 'notice',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        nodeList: [
          {
            type: 'branch',
            branchList: [
              {},
              {
                nodeList: [
                  {
                    type: 'branch',
                    branchList: [{}, {}],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        nodeList: [
          {
            type: 'notice',
          },
          {
            type: 'branch',
            branchList: [{}, {}],
          },
        ],
      },
    ],
  },
]
