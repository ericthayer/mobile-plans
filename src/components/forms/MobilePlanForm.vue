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
          <!-- mobile plan -->
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
                @input="setDeviceManufacturer($event.target.value)"
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
            <!-- Devices -->
            <div>
              <label for="device-manufacturer" aria-required="required">Select Phone</label>
              <select
                v-model="deviceModelSelected"
                name="device-manufacturer"
                id="device-manufacturer"
                required
              >
                <option
                  v-for="device in deviceModles"
                  :key="device.name"
                  :value="device.name"
                >
                  {{ device.name }}
                </option>
              </select>
            </div>
          </fieldset>
        </div>
      </form>
    </details>
  </div>
</template>

<script lang="ts">
export default {
  props: ['title'],
  setup() {
    
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
      deviceModles: []
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
          device: {
            name: '',
            model: ''
          },
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
      const selectedManufacturerDevices = this.deviceOptions.manufacturers.filter((manufacturer) => manufacturer.name == selectedManufacturer)
      return selectedManufacturerDevices
    },
    setPlanName() {
      const plans = this.mobilePlans.filter((plan: { editing: boolean }) => plan.editing == true)
      return plans[0]?.name
    },
    setPlanPrice() {
      const plans = this.mobilePlans.filter((plan: { editing: boolean }) => plan.editing == true)
      return plans[0]?.price
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
      // this.mobilePlan.planOption = optionPlan.name
      // this.mobilePlan.price = optionPlan.cost
    },
    setDeviceManufacturer(manufacturer) {
      const manufacturers = this.deviceOptions.manufacturers
      const updatedDevices = manufacturers.filter((device) => device.name == manufacturer.name)
      console.log("updatedDevices", updatedDevices, manufacturers, manufacturer)
      updatedDevices[0].name = manufacturer.name
      updatedDevices[0].model = manufacturer.model
    },
  },
  watch: {
    deviceManufacturerSelected(manufacturer) {
      this.$emit('onChange', manufacturer)
    },
    deviceModelSelected(model) {
      this.$emit('onChange', model)
    },
    getDeviceModelsByManufacturer(manufacturer) {
      this.deviceModles = manufacturer[0].models
    },
    setDeviceManufacturer(manufacturer) {
      
    }
  }
}
</script>

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