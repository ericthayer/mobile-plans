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
              <legend v-if="!editPlanName" class="legend w-auto" @click="toggleEditPlanName()">
                {{ plan.name }}
              </legend>
              <input
                v-else
                v-model="plan.name"
                class=""
                title="plan name"
                type="text"
                @keyup.enter="toggleEditPlanName()"
              />
              <button class="ml-4" type="button" @click="toggleEditPlanName()">
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
            <legend class="legend mb-0">Plan Options</legend>
            <div v-for="option in planOptions" :key="option.name" class="flex items-center">
              <label class="mr-2 mb-0" :for="`planOption` + option.name">{{ option.name }}</label>
              <input
                :id="`planOption` + option.name"
                name="planOptions"
                class="ml-4"
                type="radio"
                :checked="option.name === 'Basic'"
                @click="selectPlanOptionCost(option)"
              />
            </div>
          </fieldset>
          <!-- Device Options -->
          <fieldset>
            <legend class="legend mb-0">Device Options</legend>
            <div class="flex content-between">
              <!-- Device Manufacturers -->
              <div>
                <label for="device-manufacturer">Select Manufacturer</label>
                <select
                  v-model="this.deviceManufacturerSelected"
                  name="device-manufacturer"
                  id="device-manufacturer"
                  required
                  @input="setDeviceManufacturer($event)"
                >
                  <option
                    v-for="manufacturer in getDeviceManufacturers"
                    :key="manufacturer.name"
                    :value="manufacturer.name"
                    :selected="this.deviceManufacturerSelected"
                  >
                    {{ manufacturer.name }}
                  </option>
                </select>
              </div>
              <!-- Device Models -->
              <div>
                <label id="device-models-label" class="label" for="device-models">Select Phone</label>
                <select
                  v-model="this.deviceModelSelected"
                  name="device-models"
                  id="device-models"
                  aria-labelledby="device-models-label"
                  required
                  @input="setDeviceModel($event)"
                >
                  <option
                    v-for="device in getDeviceModelsByManufacturer"
                    :key="device.name"
                    :value="device.name"
                    :selected="this.deviceModelSelected"
                  >
                    {{ device.name }}
                  </option>
                </select>
              </div>
              <!-- Device Color -->
              <div>
                <div class="legend">Color</div>
                <div v-for="color in getDeviceColors" :key="color.name" class="input-radio">
                  <label class="mr-2 mb-0" :for="`device-color` + color.name">{{
                    color.name
                  }}</label>
                  <input
                    :id="`device-color` + color.name"
                    name="device-colors"
                    class="color-icon"
                    type="radio"
                    :style="{ background: color.hexcode }"
                    @input="selectedDeviceColor(color.hexcode)"
                  />
                </div>
              </div>
            </div>
            <!-- Storage -->
            <div>
              <div class="legend">Storage</div>
              <div v-for="option in getDeviceStorage" :key="option.size" class="flex items-center">
                <label class="ml-2 mb-0" :for="`device-storage-option` + option.size">{{
                  option.size
                }}</label>
                <input
                  :id="`device-storage-option` + option.size"
                  name="storage-options"
                  class="ml-4"
                  type="radio"
                />
              </div>
            </div>
            <!-- Payment Plan -->
            <div>
              <div class="legend">Payment Plan</div>
              <div class="flex content-between">
                <div class="mr-2">
                  <input
                    id="installment-plan"
                    name="installment-plan"
                    class="mr-4"
                    type="radio"
                    @change=""
                  />
                  <label class="ml-2 mb-0" for="installment-plan">Installment Plan</label>
                </div>
                <div class="ml-2">
                  <input id="pay-in-full" name="pay-in-full" class="mr-4" type="radio" @change="" />
                  <label class="ml-2 mb-0" for="pay-in-full">Pay in Full</label>
                </div>
              </div>
            </div>
            <!-- Protection Plan -->
            <div>
              <div class="legend">Protection Plan</div>
              <div class="flex content-between">
                <div class="mr-2">
                  <input
                    id="add-protection-plan"
                    name="add-protection-plan"
                    class="mr-4"
                    type="radio"
                    @change=""
                  />
                  <label class="ml-2 mb-0" for="add-protection-plan">Add Protection Plan</label>
                </div>
                <div class="ml-2">
                  <input
                    id="decline-protection-plan"
                    name="decline-protection-plan"
                    class="mr-4"
                    type="radio"
                    @change=""
                  />
                  <label class="ml-2 mb-0" for="decline-protection-plan"
                    >Decline Protection Plan</label
                  >
                </div>
              </div>
            </div>
          </fieldset>
          <fieldset>
            <legend class="legend">Trade-in Options</legend>
            <div class="flex">
              <!-- Carrier -->
              <div>
                <label for="device-carrier">Carrier</label>
                <select
                  v-model="this.deviceCarrierSelected"
                  name="device-carrier"
                  id="device-carrier"
                  required
                  @input="setDeviceCarrier($event)"
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
              <!-- IMEI Number -->
              <div>
                <label class="label" for="IMEI-number"
                  >IMEI
                  <button type="button" @click="showHelpText()">
                    <span class="material-icons">help</span>
                  </button>
                </label>
                <input id="IMEI-number" name="IMEI-number" class="" title="IMEI Number" type="text" required />
              </div>
            </div>
          </fieldset>
        </div>
      </form>
    </details>
    <dialog v-if="this.dialog" id="dialog">
      <p>{{ this.dialogMessage }}</p>
      <div>
        <button value="cancel" @click="this.dialog = false">
          <span class="material-icons">cancel</span>
          <span class="sr-only">Cancel</span>
        </button>
      </div>
    </dialog>
    <!-- <pre><code>{{ this.mobilePlan }}</code></pre> -->
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { type AppData } from '../../types'
import { type events } from '../../types'

export default {
  props: ['title'],
  data(): AppData {
    return {
      editPlanName: false,
      dialog: false,
      dialogMessage: '',
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
              },
              {
                name: 'iPhone 13 Pro',
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
                  }
                ]
              },              
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
      protectionPlans: [
        {
          cost: 5.0,
          description: 'This is the protection plan description'
        }
      ],
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
      deviceManufacturerSelected: '',
      deviceModelSelected: '',
      deviceCarrierSelected: '',
      IMEI: '',
      deviceModels: []
    }
  },
  mounted() {
    this.deviceManufacturerSelected = this.deviceOptions.manufacturers[0].name
    this.deviceModelSelected = this.deviceOptions.manufacturers[0].models[0].name
    // this.setDeviceManufacturer([devices])
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
            model: '',
            color: {
              name: '',
              hexcode: ''
            },
            storage: ''
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

        this.mobilePlan = newPlan

        plans.push(newPlan)
        return plans
      } else return plans
    },
    getDeviceManufacturers() {
      const manufacturers = this.deviceOptions.manufacturers
      return manufacturers
    },
    getDeviceModelsByManufacturer() {
      const selectedManufacturer = this.deviceManufacturerSelected
      const selectedManufacturerDevices = this.deviceOptions.manufacturers.filter(
        (manufacturer: { name: string }) => manufacturer.name == selectedManufacturer
      )
      const selectedManufacturerDeviceModels = selectedManufacturerDevices[0]?.models
      return selectedManufacturerDeviceModels
    },
    getDeviceColors() {
      const selectedModel = this.deviceModelSelected
      const selectedModels = this.deviceOptions.manufacturers[0]?.models.filter(
        (model: { name: string }) => model.name == selectedModel
      )
      const deviceColors = selectedModels[0]?.colors
      console.log('deviceColors', deviceColors)
      return deviceColors
    },
    getDeviceStorage() {
      const selectedModel = this.deviceModelSelected
      const selectedModels = this.deviceOptions.manufacturers[0]?.models.filter(
        (model: { name: string }) => model.name == selectedModel
      )
      const deviceStorage = selectedModels[0]?.storage
      console.log('deviceStorage', deviceStorage)
      return deviceStorage
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
    selectPlanOptionCost(optionPlan: { name: string; cost: number }) {
      const plans = this.mobilePlans
      const updatedPlans = plans.filter((plan: { editing: boolean }) => plan.editing == true)
      updatedPlans[0].price = optionPlan.cost
    },
    setDeviceManufacturer(manufacturer: { target: { value: string } }): void {
      const manufacturerName = manufacturer.target.value
      const manufacturers = this.deviceOptions.manufacturers
      const updatedDevices = manufacturers.filter((device: {name: string}) => device.name === manufacturerName)
      // this.mobilePlan.device = updatedDevices
      return updatedDevices
    },
    setDeviceModel(model: { target: { value: string } }): void {
      const modelName = model.target.value
      const updatedDeviceModels = this.deviceModels.filter((device: {name: string}) => device.name === modelName)
      // this.mobilePlan.device = updatedDeviceModels
      console.log("updatedDeviceModels", model, updatedDeviceModels)
      return updatedDeviceModels
    },
    selectedDeviceColor(color: string) {
      this.mobilePlan.device.color.hexcode = color
    },
    showHelpText() {
      this.dialog = true
      this.dialogMessage =
        'The International Mobile Equipment Identity (IMEI)[1] is a numeric identifier, usually unique'
    },
    setDeviceCarrier(model: { target: { value: string } }): void {
      const modelName = model.target.value
      const updatedDeviceModels = this.deviceModels.filter((device: {name: string}) => device.name === modelName)
      // this.mobilePlan.device = updatedDeviceModels
      console.log("updatedDeviceModels", model, updatedDeviceModels)
      return updatedDeviceModels
    }
  },
  watch: {
    deviceManufacturerSelected(manufacturer: string) {
      this.$emit('onChange', manufacturer)
    },
    deviceModelSelected(model: string) {
      this.$emit('onChange', model)
    },
    getDeviceModelsByManufacturer(devices: []): void {
      const selectedDeviceName = this.deviceManufacturerSelected
      const selectedDevice = devices.filter((device: {name: string}) => device.name == selectedDeviceName)
      this.mobilePlan.device = selectedDevice
      console.log('selectedDevice', selectedDeviceName, selectedDevice, devices)
    },
    getDeviceColors(colors) {
      this.deviceColors = colors
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

.input-radio {
  display: flex;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: start;
  position: relative;

  label {
    grid-column: 1 / 1;
  }

  input {
    border: 0;
    outline: 0;
  }

  input,
  .color-icon {
    grid-column: 2/2;
  }
}

.color-icon {
  position: relative;
  border-radius: 50px;
  display: block;
  height: 20px;
  width: 20px;

  &:before {
    background: inherit;
    border-radius: 50px;
    content: '';
    display: block;
    height: 20px;
    position: absolute;
    right: 0;
    width: 20px;
    z-index: 1;
  }
}
</style>