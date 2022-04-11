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
        branchIndex: 1,
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
              {
                branchIndex: 1,
              },
              {
                branchIndex: 2,
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
        branchIndex: 2,
        nodeList: [
          {
            type: 'branch',
            branchList: [
              {
                branchIndex: 1,
              },
              {
                branchIndex: 2,
                nodeList: [
                  {
                    type: 'branch',
                    branchList: [
                      {
                        branchIndex: 1,
                      },
                      {
                        branchIndex: 2,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        branchIndex: 3,
        nodeList: [
          {
            type: 'notice',
          },
          {
            type: 'branch',
            branchList: [
              {
                branchIndex: 1,
              },
              {
                branchIndex: 2,
              },
            ],
          },
        ],
      },
    ],
  },
]

export const mock: FlowItem[] = [
  {
    type: 'sponsor',
  },
]
