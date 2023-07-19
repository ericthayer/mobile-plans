export interface AppData {
  editPlanName?: boolean
  dialog?: boolean
  dialogMessage?: string
  mobilePlans?: []
  mobilePlan?: {}
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
  deviceManufacturerSelected?: string,
  deviceModelSelected?: string,
  deviceCarrierSelected?: string,
  IMEI?: string,
  deviceModels?: []
}

export interface events {
  setDeviceManufacturer: ($event: {}) => void
  setDeviceModel: ($event: {}) => void
  setDeviceCarrier: ($event: {}) => void
}