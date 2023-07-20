export interface AppData {
  editPlanName?: boolean
  dialog?: boolean
  showDataPreview?: boolean
  dialogMessage?: string
  mobilePlans?: []
  mobilePlan?: {}
  newPlan: {
    created: string,
    name: string,
    planOption: string,
    price: string,
    device: {
      name: string,
      model: string,
      color: {
        name: string,
        hexcode: string
      },
      storage: string
    },
    protectionPlans: {
      description: string,
      cost: string
    },
    tradeInOptions: {
      carrier: string,
      IMEINumber: null,
      deviceConditionQuestions: [
        {
          answer: null
        },
        {
          answer: null
        },
        {
          answer: null
        }
      ]
    },
    editing: boolean
  },
  deviceOptions: {
    manufacturers: [
      {
        name?: string
        models?: [
          {
            name?: string
            colors?: [
              {
                name?: string
                hexcode?: string
              },
              {
                name?: string
                hexcode?: string
              },
              {
                name?: string
                hexcode?: string
              },
              {
                name?: string
                hexcode?: string
              }
            ]
            storage?: [
              {
                size?: string
                cost?: number
              },
              {
                size?: string
                cost?: number
              },
              {
                size?: string
                cost?: number
              },
              {
                size?: string
                cost?: number
              }
            ]
          },
          {
            name?: string
            colors?: [
              {
                name?: string
                hexcode?: string
              },
              {
                name?: string
                hexcode?: string
              },
              {
                name?: string
                hexcode?: string
              }
            ]
            storage?: [
              {
                size?: string
                cost?: number
              },
              {
                size?: string
                cost?: number
              },
              {
                size?: string
                cost?: number
              }
            ]
          }
        ]
      },
      {
        name?: string
        models?: [
          {
            name?: string
            colors?: [
              {
                name?: string
                hexcode?: string
              },
              {
                name?: string
                hexcode?: string
              },
              {
                name?: string
                hexcode?: string
              },
              {
                name?: string
                hexcode?: string
              }
            ]
            storage?: [
              {
                size?: string
                cost?: number
              },
              {
                size?: string
                cost?: number
              }
            ]
          }
        ]
      }
    ]
  }
  planOptions: [
    option: {
      name: string
      cost: number
    },
    option: {
      name: string
      cost: number
    },
    option: {
      name: string
      cost: number
    }
  ]
  protectionPlans: [
    {
      cost: number,
      description: string
    }
  ]
  tradeInOptions: {
    carriers: [
      {
        name: string
      },
      {
        name: string
      },
      {
        name: string
      },
      {
        name: string
      }
    ],
    IMEINumber: {
      number: null
    },
    deviceConditionQuestions?: [
      {
        question: string
        answer: null
      },
      {
        question: string
        answer: null
      },
      {
        question: string
        answer: null
      }
    ],
  }
  dynamicQuestionLabel?: string
  deviceManufacturerSelected?: string
  deviceModelSelected?: string
  deviceCarrierSelected?: string
  IMEI?: string
  deviceModels?: []
}
export interface events {
  setDeviceManufacturer: ($event: {}) => void
  setDeviceModel: ($event: {}) => void
  setDeviceCarrier: ($event: {}) => void
}

export interface ToDoList {
  toDoList: [
    {
      description: string,
      completed: boolean
    }
  ]
} 