<template>
  <div>
    <form id="mobile-line-1" action="" @submit.prevent>
      <h2 class="kite-type-style--title-2">{{ title }}</h2>
      <!-- mobile plan -->
      <fieldset>
        <div class="flex place-content-between">
          <legend v-if="!editPlanName" class="plan-title w-auto" @click="toggleEditPlanName()">
            {{ this.mobilePlan.name }}
          </legend>
          <input
            v-else
            v-model="this.mobilePlan.name"
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
            {{ `$` + planPrice }}
          </div>
        </div>
        <div v-for="option in planOptions" :key="option.name" class="flex items-center">
          <input
            :id="`planOption` + option.name"
            name="planOptions"
            class="ml-4"
            type="radio"
            :checked="option.name == 'Basic'"
            @click="addPlanOptionCost(option)"
          />
          <label class="ml-2 mb-0" :for="`planOption` + option.name">{{ option.name }}</label>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script lang="ts">
export default {
  props: ['title'],
  setup() {},
  data() {
    return {
      editPlanName: false,
      mobilePlan:
      {
        name: 'Mobile Line 1',
        option: 'Basic',
        price: 39.99,
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
      ]
    }
  },
  computed: {
    planPrice(): Number {
      // const updatedPlans = this.mobilePlans.filter((plan) => {
      //   plan.editing === true
      // })
      return (this.mobilePlan.price).toFixed(2)
    },
    setDefaultPlanOption() {
      return this.planOptions.filter((option) => option.name == 'Basic') ? true : false
    }
  },
  methods: {
    toggleEditPlanName() {
      this.editPlanName = !this.editPlanName
    },
    addPlanOptionCost(optionPlan: {name: string, cost: Number}) {
      // const updatedPlans = this.mobilePlans.filter((plan) => {
      //   plan.editing === true
      // })
      // updatedPlans[0].price = cost
      this.mobilePlan.option = optionPlan.name
      this.mobilePlan.price = optionPlan.cost
    }
  },
  watch: {
    
  }
}
</script>

<style lang="scss">
</style>