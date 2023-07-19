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
              <legend v-if="!editPlanName" class="legend w-auto" @click="toggleEditPlanName(plan)">
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
            <legend class="legend mb-0">Plan Options</legend>
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
            <legend class="legend mb-0">Device Options</legend>
            <div class="flex content-between">
              <!-- Device Manufacturers -->
              <div>
                <label for="device-manufacturer">Select Manufacturer</label>
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
                <label class="label" for="device-models">Select Phone</label>
                <select
                  v-model="deviceModelSelected"
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
                  >
                    {{ device.name }}
                  </option>
                </select>
              </div>
              <!-- Device Color -->
              <div>
                <div class="legend">Color</div>
                <div v-for="color in getDeviceColors" :key="color.name" class="flex items-center">
                  <label class="ml-2 mb-0" :for="`device-color` + color.name">{{
                    color.name
                  }}</label>
                  <input
                    :id="color.name"
                    :name="color.name"
                    :checked="getDeviceColors[0]"
                    class="ml-4"
                    type="radio"
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
                  :id="option.size"
                  :name="option.size"
                  :checked="getDeviceStorage[0]"
                  class="ml-4"
                  type="radio"
                />
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
                  v-model="deviceCarrierSelected"
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
                <label class="label" for="device-models"
                  >IMEI
                  <button type="button" @click="showHelpText()">
                    <span class="material-icons">help</span>
                  </button>
                </label>
                <input class="" title="IMEI Number" type="text" required />
              </div>
            </div>
          </fieldset>
        </div>
      </form>
    </details>
    <dialog v-if="this.dialog" id="dialog">
      <p>{{ dialogMessage }}</p>
      <div>
        <button value="cancel" @click="this.dialog = false">
          <span class="material-icons">cancel</span>
          <span class="sr-only">Cancel</span>
        </button>
      </div>
    </dialog>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { AppData } from '../../types'

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
  computed: {
    getMobilePlans() {
      const plans = this.mobilePlans

      if (plans.length === 0) {
        const newPlan = {
          name: 'Line Name',
          planOption: 'Basic',
          price: (39.99).toFixed(2),
          device: [
            {
              name: '',
              model: '',
              colors: [
                {
                  name: '',
                  hexcode: ''
                }
              ],
              storage: ''
            }
          ],
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
        (manufacturer) => manufacturer.name == selectedManufacturer
      )
      const selectedManufacturerDeviceModels = selectedManufacturerDevices[0]?.models
      this.deviceModel = selectedManufacturerDeviceModels
      this.setDeviceColors(selectedManufacturerDeviceModels)
      return selectedManufacturerDeviceModels
    },
    getDeviceColors() {
      const selectedModel = this.deviceModelSelected
      const selectedModels = this.deviceOptions.manufacturers[0]?.models.filter(
        (model) => model.name == selectedModel
      )
      const deviceColors = selectedModels[0]?.colors
      console.log('deviceColors', deviceColors)
      return deviceColors
    },
    getDeviceStorage() {
      const selectedModel = this.deviceModelSelected
      const selectedModels = this.deviceOptions.manufacturers[0]?.models.filter(
        (model) => model.name == selectedModel
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
    addPlanOptionCost(optionPlan: { name: string; cost: number }) {
      const plans = this.mobilePlans
      const updatedPlans = plans.filter((plan) => plan.editing == true)
      updatedPlans[0].price = optionPlan.cost
    },
    setDeviceManufacturer(manufacturer) {
      const manufacturerName = manufacturer.target.value
      const manufacturers = this.deviceOptions.manufacturers
      const updatedDevices = manufacturers.filter((device) => device.name === manufacturerName)
      return updatedDevices
    },
    setDeviceModel(model) {
      const modelName = model.target.value
      const updatedDeviceModels = this.deviceModels.filter((device) => device.name === modelName)
      this.setDeviceColors(updatedDeviceModels)
      console.log('updatedDeviceModels', updatedDeviceModels)
      return updatedDeviceModels
    },
    setDeviceColors(device) {
      // const selectedDevice = device
      // const selectedManufacturerDeviceColors = selectedDevice.filter(
      //   (device) => device.name == selectedDevice.name
      // )
      // const selectedColors = selectedManufacturerDeviceColors
      console.log('selectedColors', device)
      // return selectedColors
    },
    showHelpText() {
      this.dialog = true
      this.dialogMessage = "The International Mobile Equipment Identity (IMEI)[1] is a numeric identifier, usually unique"
    },
    setDeviceCarrier(carrier) {

    }
  },
  watch: {
    deviceManufacturerSelected(manufacturer: string) {
      this.$emit('onChange', manufacturer)
    },
    deviceModelSelected(model: string) {
      this.$emit('onChange', model)
    },
    getDeviceModelsByManufacturer(devices: []) {
      const selectedDeviceName = this.deviceManufacturerSelected
      const selectedDevice = devices.filter((device) => device.name == selectedDeviceName)
      // this.updateDevices(selectedDevice)
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
</style>