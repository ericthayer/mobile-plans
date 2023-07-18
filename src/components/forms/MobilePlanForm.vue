<template>
  <div>
    <h2 class="kite-type-style--title-2">{{ title }}</h2>
    <details v-for="plan in getMobilePlans" :key="plan" :open="plan.editing" class="plan">
      <summary>
        <div class="plan-name">{{ plan.name }}</div>
        <div class="plan-price ml-auto">
          {{ `$` + setPlanPrice }}
        </div>
      </summary>
      <form id="mobile-line-1" action="" @submit.prevent>
        <div class="form-body">
          <!-- Plan Name -->
          <fieldset>
            <div class="flex place-content-between">
              <legend v-if="!editPlanName" class="w-auto" @click="toggleEditPlanName(plan)">
                {{ plan.name }}
              </legend>
              <input
                v-else
                v-model="plan.name"
                class=""
                title="plan name"
                type="text"
                @keyup.enter="toggleEditPlanName(plan)"
              />
              <button class="ml-4" type="button" @click="toggleEditPlanName(plan)">
                <span v-if="editPlanName" class="material-icons">done</span>
                <span v-else class="material-icons">edit</span>
              </button>
              <div class="plan-price ml-auto">
                {{ `$` + setPlanPrice }}
              </div>
            </div>
          </fieldset>
          <!-- Plan Options -->
          <fieldset>
            <legend class="mb-0">Plan Options</legend>
            <div v-for="option in planOptions" :key="option.name" class="flex items-center">
              <label class="ml-2 mb-0" :for="`planOption` + option.name">{{ option.name }}</label>
              <input
                :id="`planOption` + option.name"
                name="planOptions"
                class="ml-4"
                type="radio"
                :checked="option.name === 'Basic'"
                @click="addPlanOptionCost(option)"
              />
            </div>
          </fieldset>
          <!-- Device Options -->
          <fieldset>
            <legend class="mb-0">Device Options</legend>
            <!-- Device Manufacturers -->
            <div>
              <label for="device-manufacturer" aria-required="required">Select Manufacturer</label>
              <select
                v-model="deviceManufacturerSelected"
                name="device-manufacturer"
                id="device-manufacturer"
                required
                @input="setDeviceManufacturer($event)"
              >
                <option
                  v-for="manufacturer in getDeviceManufacturers"
                  :key="manufacturer.name"
                  :value="manufacturer.name"
                >
                  {{ manufacturer.name }}
                </option>
              </select>
            </div>
            <!-- Device Models -->
            <div>
              <label id="device-models-label" for="device-models">Select Phone</label>
              <select
                v-model="deviceModelSelected"
                name="device-models"
                id="device-models"
                aria-labelledby="device-models-label"
                required
              >
                <option v-for="device in getDeviceModelsByManufacturer" :key="device.name" :value="device.name">
                  {{ device.name }}
                </option>
              </select>
            </div>
            <!-- Device Color -->
            <div>
              <div v-for="color in getDeviceColors" :key="color.name" class="flex items-center">
                <label class="ml-2 mb-0" :for="`device-color` + color.name">{{ color.name }}</label>
                <input
                  :id="color.name"
                  :name="color.name"
                  :checked="deviceColors[0]"
                  class="ml-4"
                  type="radio"
                />
              </div>
            </div>
          </fieldset>
        </div>
      </form>
    </details>
  </div>
</template>

<script lang="ts">
// import { ref } from 'vue'

export default {
  props: ['title'],
  setup() {
    // const mobilePlan = ref({})
  },
  data() {
    return {
      editPlanName: false,
      mobilePlans: [],
      mobilePlan: {},
      planOptions: [
        {
          name: 'Basic',
          cost: 39.99
        },
        {
          name: 'Standard',
          cost: 69.99
        },
        {
          name: 'Deluxe',
          cost: 99.99
        }
      ],
      deviceOptions: {
        manufacturers: [
          {
            name: 'Apple',
            models: [
              {
                name: 'iPhone 14 Pro Max',
                colors: [
                  {
                    name: 'Black',
                    hexcode: '#000000'
                  },
                  {
                    name: 'Gray',
                    hexcode: '#555555'
                  },
                  {
                    name: 'Rose',
                    hexcode: '#D8A9A9'
                  },
                  {
                    name: 'Silver',
                    hexcode: '#E0E0E0'
                  }
                ],
                storage: [
                  {
                    size: '128GB',
                    cost: 0
                  },
                  {
                    size: '256GB',
                    cost: 9.99
                  },
                  {
                    size: '512GB',
                    cost: 19.99
                  },
                  {
                    size: '1TB',
                    cost: 29.99
                  }
                ]
              }
            ]
          },
          {
            name: 'Google',
            models: [
              {
                name: 'Pixel 6a',
                colors: [
                  {
                    name: 'Black',
                    hexcode: '#121212'
                  },
                  {
                    name: 'Pink',
                    hexcode: '#DBC9D6'
                  },
                  {
                    name: 'Canary',
                    hexcode: '#FFDD41'
                  },
                  {
                    name: 'Alabaster',
                    hexcode: '#F7F4E8'
                  }
                ],
                storage: [
                  {
                    size: '256GB',
                    cost: 0
                  },
                  {
                    size: '512GB',
                    cost: 19.99
                  }
                ]
              }
            ]
          }
        ]
      },
      tradeInOptions: {
        carriers: [
          {
            name: 'At&t'
          },
          {
            name: 'Cricket'
          },
          {
            name: 'Google Voice'
          },
          {
            name: 'Verizon'
          }
        ],
        IMEINumber: {
          number: null
        },
        deviceConditionQuestions: [
          {
            question: 'Is the device free of major physical damage?',
            answer: null
          },
          {
            question: 'Does the device have a functional screen?',
            answer: null
          },
          {
            question: 'Does the device power on?',
            answer: null
          }
        ]
      },
      protectionPlans: [
        {
          cost: 5.0,
          description: 'This is the protection plan description'
        }
      ],
      deviceManufacturerSelected: '',
      deviceModelSelected: '',
      deviceModels: [],
      deviceColors: []
    }
  },
  computed: {
    getMobilePlans() {
      const plans = this.mobilePlans

      if (plans.length === 0) {
        const newPlan = {
          name: 'Line Name',
          planOption: 'Basic',
          price: (39.99).toFixed(2),
          device:[{
            name: '',
            model: '',
            colors: [
              {
                name: '',
                hexcode: ''
              }
            ],
            storage: ''
          }],
          tradeIn: {
            carrier: '',
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
          editing: true
        }

        this.mobilePlan = newPlan

        plans.push(newPlan)
        console.log(plans)
        return plans
      } else return plans
    },
    getDeviceManufacturers() {
      const manufacturers = this.deviceOptions.manufacturers
      return manufacturers
    },
    getDeviceModelsByManufacturer() {
      const selectedManufacturer = this.deviceManufacturerSelected
      const selectedManufacturerDevice = this.deviceOptions.manufacturers.filter(
        (manufacturer) => manufacturer.name == selectedManufacturer
      )
      return selectedManufacturerDevice 
    },
    setPlanPrice() {
      const plans = this.mobilePlans.filter((plan: { editing: boolean }) => plan.editing == true)
      return plans[0]?.price
    },
    getDeviceColors() {
      const plan = this.mobilePlan
      // const deviceColors = this.mobilePlan.device[0].colors
      // console.log("deviceColors", deviceColors)
      // return deviceColors
    }
  },
  methods: {
    toggleEditPlanName() {
      this.editPlanName = !this.editPlanName
    },
    addPlanOptionCost(optionPlan: { name: string; cost: number }) {
      const plans = this.mobilePlans
      const updatedPlans = plans.filter((plan) => plan.editing == true)
      updatedPlans[0].price = optionPlan.cost
    },
    setDeviceManufacturer(manufacturer) {
      const manufacturerName = manufacturer.target.value
      const manufacturers = this.deviceOptions.manufacturers
      const updatedDevices = manufacturers.filter((device) => device.name === manufacturerName)
      console.log('updatedDevices', manufacturers, updatedDevices, manufacturerName)
      return updatedDevices
    },
    setDeviceManufacturerModel(selectedDevice) {
      const updatedPlans = this.mobilePlans

      const updatedPlan = () => {
        
       updatedPlans.forEach(plan => {
          plan.device.model = selectedDevice.model
        }); return
      }

      this.mobilePlan = updatedPlan

      // updatedPlans.push(updatedPlan)
      console.log("updatedPlansInStore", updatedPlans)
      return updatedPlans
    },
    setDeviceColors(device) {
      const selectedDevice = device
      const selectedManufacturerDeviceColors = selectedDevice.filter(
        (device) => device.name == selectedDevice.name
      )
      const selectedColors = selectedManufacturerDeviceColors
      console.log('selectedColors', device, selectedColors)
      return selectedColors
    }
  },
  watch: {
    // trigger device type
    deviceManufacturerSelected(manufacturer) {
      this.$emit('onChange', manufacturer)
    },
    deviceModelSelected(model) {
      this.$emit('onChange', model)
    },
    // sets the device in the store
    getDeviceModelsByManufacturer(manufacturer) {
      const manufacturerName = manufacturer[0]?.name
      const selectedDevice = manufacturer[0]?.models
      this.mobilePlan.device = selectedDevice

       selectedDevice.forEach(device => {
          device.model = manufacturerName
        }); return
      
      this.deviceModels = selectedDevice
    },
    getDeviceColors(colors) {
      this.deviceColors = colors
    }
  }
}
</script>

<!-- <script setup lang="ts">
import { ref } from 'vue'

const editPlanName = ref(false)
const mobilePlans = ref([])
const mobilePlan = ref({})
const planOptions = ref([
  {
    name: 'Basic',
    cost: 39.99
  },
  {
    name: 'Standard',
    cost: 69.99
  },
  {
    name: 'Deluxe',
    cost: 99.99
  }
])
const deviceOptions = ref({
  manufacturers: [
    {
      name: 'Apple',
      models: [
        {
          name: 'iPhone 14 Pro Max',
          colors: [
            {
              name: 'Black',
              hexcode: '#000000'
            },
            {
              name: 'Gray',
              hexcode: '#555555'
            },
            {
              name: 'Rose',
              hexcode: '#D8A9A9'
            },
            {
              name: 'Silver',
              hexcode: '#E0E0E0'
            }
          ],
          storage: [
            {
              size: '128GB',
              cost: 0
            },
            {
              size: '256GB',
              cost: 9.99
            },
            {
              size: '512GB',
              cost: 19.99
            },
            {
              size: '1TB',
              cost: 29.99
            }
          ]
        }
      ]
    },
    {
      name: 'Google',
      models: [
        {
          name: 'Pixel 6a',
          colors: [
            {
              name: 'Black',
              hexcode: '#121212'
            },
            {
              name: 'Pink',
              hexcode: '#DBC9D6'
            },
            {
              name: 'Canary',
              hexcode: '#FFDD41'
            },
            {
              name: 'Alabaster',
              hexcode: '#F7F4E8'
            }
          ],
          storage: [
            {
              size: '256GB',
              cost: 0
            },
            {
              size: '512GB',
              cost: 19.99
            }
          ]
        }
      ]
    }
  ]
})
const tradeInOptions = ref({
  carriers: [
    {
      name: 'At&t'
    },
    {
      name: 'Cricket'
    },
    {
      name: 'Google Voice'
    },
    {
      name: 'Verizon'
    }
  ]
})
const IMEINumber = ref({
  number: null
})
const deviceConditionQuestions = ref([
  {
    question: 'Is the device free of major physical damage?',
    answer: null
  },
  {
    question: 'Does the device have a functional screen?',
    answer: null
  },
  {
    question: 'Does the device power on?',
    answer: null
  }
])
const protectionPlans = ref([
  {
    cost: 5.0,
    description: 'This is the protection plan description'
  }
])
const deviceManufacturerSelected = ref('')
const deviceModelSelected = ref('')
const deviceModels = ref([])

const toggleEditPlanName = () => {
  editPlanName(true)
}

const addPlanOptionCost = (optionPlan: { name: string; cost: number }) => {
  const plans = this.mobilePlans
  const updatedPlans = plans.filter((plan) => plan.editing == true)
  updatedPlans[0].price = optionPlan.cost
  // this.mobilePlan.planOption = optionPlan.name
  // this.mobilePlan.price = optionPlan.cost
}

const setDeviceManufacturer = (manufacturer: { name: string; models: []}}) => {
  const manufacturers = deviceOptions[0]
  const updatedDevices = manufacturers.filter((device: {name: string}) => device.name == manufacturer.name)
  console.log('updatedDevices', updatedDevices, manufacturers, manufacturer)
  updatedDevices[0].name = manufacturer.name
  updatedDevices[0].model = manufacturer.model
}
</script> -->

<style lang="scss">
.plan:not([open]) {
  summary {
    display: flex;
    justify-content: space-between;
  }
}

.plan[open] {
  summary {
    // height: 1rem;
    text-align: right;

    > * {
      display: none;
    }
  }
}
</style>