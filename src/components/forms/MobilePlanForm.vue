<template>
  <div class="content" :class="{ 'preview-visible': showDataPreview }">
    <div class="code-build">
      <h2 class="flex justify-between mb-0 kite-type-style--title-4">
        {{ title }}
        <button
          v-if="$route.name == 'submission'"
          class="button-icon code-preview-button ml-2"
          @click="this.showDataPreview = !this.showDataPreview"
        >
          <span v-if="!showDataPreview" class="material-icons icon">code</span>
          <span v-else class="material-icons icon">visibility_off</span>
        </button>
      </h2>
      <details v-for="plan in getMobilePlans" :key="plan" :open="plan.editing" class="plan">
        <summary>
          <div class="plan-name">{{ plan.name }}</div>
          <div class="plan-price ml-auto">
            {{ `$` + getPlanPrice }}
          </div>
        </summary>
        <form id="mobile-line-1" class="form" action="post" @submit.prevent>
          <div class="form-body">
            <!-- Plan Name -->
            <fieldset class="fieldset">
              <div class="plan-title flex place-content-between pt-2">
                <div class="flex place-content-between">
                  <legend
                    v-if="!editPlanName"
                    class="plan-name legend mb-0 w-auto"
                    @click="toggleEditPlanName()"
                  >
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
                  <button
                    class="button-link button-small ml-4"
                    type="button"
                    @click="toggleEditPlanName()"
                  >
                    <span v-if="editPlanName" class="material-icons icon">done</span>
                    <span v-else class="material-icons icon">edit</span>
                  </button>
                </div>
                <div class="plan-price kite-type-style--title-5 m-0 ml-auto">
                  {{ `$` + getPlanPrice }}
                </div>
              </div>
            </fieldset>
            <!-- Plan Options -->
            <fieldset class="fieldset">
              <legend class="legend mb-0">Plan Options</legend>
              <div class="flex place-content-evenly">
                <div
                  v-for="option in planOptions"
                  :key="option.name"
                  class="flex items-center py-1 px-2"
                >
                  <input
                    :id="`planOption` + option.name"
                    name="planOptions"
                    class="ml-4"
                    type="radio"
                    :checked="option.name === 'Basic'"
                    @click="selectPlanOption(option)"
                  />
                  <label class="ml-1 mb-0" :for="`planOption` + option.name">{{
                    option.name
                  }}</label>
                </div>
              </div>
            </fieldset>
            <!-- Device Options -->
            <fieldset class="fieldset">
              <legend class="legend mb-0">Device Options</legend>
              <div class="flex justify-between gap-10 mb-8">
                <div class="device-select flex flex-col grow pr-10">
                  <!-- Device Manufacturers -->
                  <div class="flex flex-col mb-5">
                    <label for="device-manufacturer" class="required">Select Manufacturer</label>
                    <select
                      v-model="this.deviceManufacturerSelected"
                      name="device-manufacturer"
                      id="device-manufacturer"
                      required
                      @change="setDeviceManufacturer(this.deviceManufacturerSelected)"
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
                  <div class="flex flex-col">
                    <label id="device-models-label" class="required" for="device-models"
                      >Select Phone</label
                    >
                    <select
                      v-model="this.deviceModelSelected"
                      name="device-models"
                      id="device-models"
                      aria-labelledby="device-models-label"
                      required
                      @change="setDeviceModel(this.deviceModelSelected)"
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
                </div>
                <!-- Device Color -->
                <div class="device-colors">
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
                      @change="selectedDeviceColor(color.hexcode)"
                    />
                  </div>
                </div>
              </div>
              <div class="flex justify-between gap-10 mb-8">
                <!-- Storage -->
                <div class="plan-storage grow">
                  <div class="legend">Storage</div>
                  <div class="grid grid-cols-2 gap-1 pt-1 pr-4">
                    <div
                      v-for="option in getDeviceStorage"
                      :key="option.size"
                      class="flex items-center"
                    >
                      <input
                        :id="`device-storage-option` + option.size"
                        name="storage-options"
                        class="ml-1"
                        type="radio"
                      />
                      <label class="ml-2 mb-0" :for="`device-storage-option` + option.size">{{
                        option.size
                      }}</label>
                    </div>
                  </div>
                </div>
                <!-- Payment Plan -->
                <div class="payment-plan">
                  <div class="legend">Payment Plan</div>
                  <div class="flex flex-col gap-1 pt-1">
                    <div class="flex">
                      <input
                        id="installment-plan"
                        name="payment-plan"
                        class="mr-1"
                        type="radio"
                        @change=""
                      />
                      <label class="ml-2 mb-0" for="installment-plan">Installment Plan</label>
                    </div>
                    <div class="flex">
                      <input
                        id="pay-in-full"
                        name="payment-plan"
                        class="mr-1"
                        type="radio"
                        @change=""
                      />
                      <label class="ml-2 mb-0" for="pay-in-full">Pay in Full</label>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Protection Plan -->
              <div>
                <div class="legend">Protection Plan</div>
                <div class="flex gap-5">
                  <div class="flex items-center mr-2">
                    <input
                      id="add-protection-plan"
                      name="protection-plan"
                      class="mr-1"
                      type="radio"
                      @change=""
                    />
                    <label class="ml-1 mb-0" for="add-protection-plan">Add Protection Plan</label>
                  </div>
                  <div class="flex items-center ml-2">
                    <input
                      id="decline-protection-plan"
                      name="protection-plan"
                      class="mr-1"
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
            <!-- Trade in Options -->
            <fieldset class="fieldset">
              <legend class="legend">Trade-in Options</legend>
              <div class="flex justify-between gap-10">
                <!-- Carrier -->
                <div class="flex flex-col grow">
                  <label class="required" for="device-carrier">Carrier</label>
                  <select
                    v-model="this.deviceCarrierSelected"
                    name="device-carrier"
                    id="device-carrier"
                    class=""
                    title="Select Carrier"
                    required
                    @input="setDeviceCarrier(this.deviceCarrierSelected)"
                  >
                    <option
                      v-for="carrier in getDeviceCarriers"
                      :key="carrier.name"
                      :value="carrier.name"
                      :selected="this.deviceCarrierSelected"
                    >
                      {{ carrier.name }}
                    </option>
                  </select>
                </div>
                <!-- IMEI Number -->
                <div class="flex flex-col grow">
                  <label class="flex required" for="IMEI-number"
                    >IMEI
                    <button class="button-link ml-1" @click.stop="showHelpText()">
                      <span v-if="!this.dialog" class="material-icons icon">help</span>
                      <span v-else class="material-icons icon">cancel</span>
                    </button>
                  </label>
                  <input
                    v-model="this.mobilePlan.tradeInOptions.IMEINumber"
                    id="IMEI-number"
                    name="IMEI-number"
                    class="IMEI-number"
                    title="IMEI Number"
                    type="text"
                    required
                  />
                </div>
              </div>
            </fieldset>
            <!-- Device Condition Questions -->
            <fieldset class="fieldset">
              <legend class="legend">Device Condition Questions</legend>
              <div class="mb-2 py-2">
                <div
                  v-for="(question, index) in tradeInOptions.deviceConditionQuestions"
                  :key="question.question"
                  class="flex justify-between mb-2"
                >
                  <label
                    class="mb-0 pointer-events-none"
                    :for="`question-` + index + this.dynamicQuestionLabel"
                    >{{ question.question }}</label
                  >
                  <div class="flex justify-between">
                    <div class="mr-2">
                      <input
                        :id="`question-` + index + `-answer-yes`"
                        :name="`question-` + index"
                        class="mr-1"
                        type="radio"
                        @change="setAnswer(true)"
                      />
                      <label class="ml-1 mb-0" :for="`question-` + index + `-answer-yes`"
                        >Yes</label
                      >
                    </div>
                    <div class="ml-4">
                      <input
                        :id="`question-` + index + `-answer-no`"
                        :name="`question-` + index"
                        class="mr-1"
                        type="radio"
                        @change="setAnswer(false)"
                      />
                      <label class="ml-1 mb-0" :for="`question-` + index + `-answer-no`">No</label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex place-content-center gap-10">
                <a class="link" href="#0">Check Trade-in</a>
                <a class="link" href="#0">Send IMEI Instructions</a>
              </div>
            </fieldset>
          </div>
        </form>
      </details>
      <!-- Form Actions -->
      <div class="form-actions flex items-center justify-between mt-5">
        <button class="button-link" @click="addMobilePlan()">
          <span class="material-icons icon">add_circle</span>
          <small class="">Add Line</small>
        </button>
        <div class="ml-a flex items-center place-content-between">
          <button class="button-icon mr-3" @click="clearForm()">
            <span class="material-icons icon">clear</span>
            <span class="sr-only">Clear Order</span>
          </button>
          <button class="button-outline">
            <span>Back</span>
          </button>
          <button class="button-primary ml-2" @click="savePlan(this.mobilePlan)">
            <span>Next</span>
          </button>
        </div>
      </div>
      <dialog v-if="this.dialog" id="dialog" class="dialog">
        <p>{{ this.dialogMessage }}</p>
        <div>
          <button value="cancel" @click="this.dialog = false">
            <span class="material-icons icon">cancel</span>
            <span class="sr-only">Cancel</span>
          </button>
        </div>
      </dialog>
    </div>
    <div class="code-preview" :class="{ 'fade-in': showDataPreview }">
      <pre><code>{{ this.mobilePlan }}</code></pre>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { type AppData } from '../../types'
import { type events } from '../../types'

export default defineComponent({
  name: 'MobilePlanForm',
  props: ['title'],
  inheritAttrs: false,
  data(): AppData {
    return {
      editPlanName: false,
      dialog: false,
      showDataPreview: false,
      dialogMessage: '',
      mobilePlans: [],
      mobilePlan: {},
      newPlan: {
        created: Date().toString(),
        name: 'New Line',
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
        protectionPlans: {
          cost: '',
          description: ''
        },
        tradeInOptions: {
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
      },
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
          description: 'This is the protection plan description',
          cost: 5.0
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
      dynamicQuestionLabel: '-answer-no',
      deviceManufacturerSelected: '',
      deviceModelSelected: '',
      deviceCarrierSelected: '',
      IMEI: '',
      deviceModels: []
    }
  },
  mounted() {
    // this.deviceManufacturerSelected = this.deviceOptions.manufacturers[0].name
    // this.deviceModelSelected = this.deviceOptions.manufacturers[0].models[0].name
  },
  computed: {
    getMobilePlans() {
      const plans = this.mobilePlans

      if (plans.length === 0) {
        const plan = this.newPlan

        this.mobilePlan = plan

        plans.push(plan)
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
      // console.log('deviceColors', deviceColors)
      return deviceColors
    },
    getDeviceStorage() {
      const selectedModel = this.deviceModelSelected
      const selectedModels = this.deviceOptions.manufacturers[0]?.models.filter(
        (model: { name: string }) => model.name == selectedModel
      )
      const deviceStorage = selectedModels[0]?.storage
      // console.log('deviceStorage', deviceStorage)
      return deviceStorage
    },
    getPlanPrice() {
      const plans = this.mobilePlans.filter((plan: { editing: boolean }) => plan.editing == true)
      return plans[0]?.price
    },
    getDeviceCarriers() {
      const carriers = this.tradeInOptions?.carriers
      return carriers
    }
  },
  methods: {
    toggleEditPlanName() {
      this.editPlanName = !this.editPlanName
    },
    selectPlanOption(optionPlan: { name: string; cost: number }) {
      const plans = this.mobilePlans
      const updatedPlans = plans.filter((plan: { editing: boolean }) => plan.editing == true)
      updatedPlans[0].price = optionPlan.cost
      this.mobilePlan.planOption = optionPlan.name
    },
    setDeviceManufacturer(manufacturer: string) {
      const manufacturerName = manufacturer
      const manufacturers = this.deviceOptions.manufacturers
      const updatedDevices = manufacturers.filter(
        (device: { name: string }) => device.name == manufacturerName
      )
      this.deviceModels = updatedDevices
      this.mobilePlan.device.name = updatedDevices[0]?.name
      console.log('updatedManufacturer', updatedDevices)
    },
    setDeviceModel(model: string) {
      const modelName = model
      const updatedDeviceModels = this.deviceModels[0]?.models.filter(
        (device: { name: string }) => device.name == modelName
      )
      this.mobilePlan.device.model = updatedDeviceModels[0]?.name
    },
    selectedDeviceColor(color: string) {
      this.mobilePlan.device.color.hexcode = color
    },
    showHelpText() {
      this.dialog = !this.dialog
      this.dialogMessage =
        'The International Mobile Equipment Identity (IMEI)[1] is a numeric identifier, usually unique,[2][3] for 3GPP and iDEN mobile phones, as well as some satellite phones.'
    },
    setDeviceCarrier(carrier: string) {
      const carrierName = carrier
      const updatedDeviceCarriers = this.tradeInOptions.carriers.filter(
        (carrier: { name: string }) => carrier.name === carrierName
      )
      this.mobilePlan.tradeInOptions.carrier = carrierName
      return carrierName
    },
    setAnswer(answer: boolean) {
      if (answer) {
        this.dynamicQuestionLabel = '-answer-yes'
      } else {
        this.dynamicQuestionLabel = '-answer-no'
      }
    },
    addMobilePlan() {
      const plans = this.mobilePlans
      const newPlan = this.newPlan
      newPlan.name = 'Another Line'
      //  TODO: change the last plan's title
      // const lastPlan = plans.filter((plan: {created: string}) => plan.created > Date.now().toString())
      plans.push(newPlan)
    },
    clearForm() {
      console.log('Clear Form')
    },
    savePlan(plan: {}) {
      console.log('Save Plan', plan)
    }
  },
  watch: {
    deviceManufacturerSelected(manufacturer: string) {
      this.$emit('onChange', manufacturer)
    },
    deviceModelSelected(model: string) {
      this.$emit('onChange', model)
    },
    deviceCarrierSelected(carrier: string) {
      this.$emit('onChange', carrier)
    }
    // getDeviceModelsByManufacturer(devices: []): void {
    //   const selectedDeviceName = this.deviceManufacturerSelected
    //   const selectedDevice = devices.filter(
    //     (device: { name: string }) => device.name == selectedDeviceName
    //   )
    //   this.mobilePlan.device = selectedDevice
    // },
    // getDeviceModelsByManufacturer() {
    //   const selectedManufacturer = this.deviceManufacturerSelected
    //   const selectedManufacturerDevices = this.deviceOptions.manufacturers.filter(
    //     (manufacturer: { name: string }) => manufacturer.name == selectedManufacturer
    //   )
    //   const selectedManufacturerDeviceModels = selectedManufacturerDevices[0]?.models
    //   return selectedManufacturerDeviceModels
    // },
  }
})
</script>

<style lang="scss" scoped>
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
.plan-title {
  > * {
    margin-bottom: 0;
  }
}

.fieldset {
  border-bottom: 1px solid var(--kite-color-gray-20);
  margin-bottom: 1rem;
  padding-bottom: 1.5rem;

  &:last-of-type {
    border-bottom: none;
    margin-bottom: 0;
  }
}

.legend:not(.plan-name) {
  color: var(--kite-color-gray-30);
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.plan-name {
  font-size: 1.3rem;
  font-weight: 500;
}

.payment-plan {
  flex-basis: 15rem;
}

.device-colors {
  flex-basis: 10rem;
  padding-right: 1rem;
}

.IMEI-number {
  height: 25px;
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

.dialog {
  box-shadow: 0.25rem 0.25rem 15rem 0 rgba(0, 0, 0, 0.25);
  border: 1px solid var(--kite-color-gray-20);
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -250px;
  width: 500px;
}
</style>