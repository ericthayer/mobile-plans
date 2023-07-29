<template>
  <IntroductionItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Documentation</template>
    View project on
    <a href="https://github.com/ericthayer/mobile-plans/" target="_blank" rel="noopener">GitHub</a>
    to test this out locally.
  </IntroductionItem>

  <IntroductionItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>Tooling</template>

    This project is served and bundled with
    <a href="https://vitejs.dev/guide/features.html" target="_blank" rel="noopener">Vite</a>. The
    recommended IDE setup is
    <a href="https://code.visualstudio.com/" target="_blank" rel="noopener">VSCode</a> +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank" rel="noopener">Volar</a>. If
    you need to test your components and web pages, check out
    <a href="https://www.cypress.io/" target="_blank" rel="noopener">Cypress</a> and
    <a href="https://on.cypress.io/component" target="_blank">Cypress Component Testing</a>. More
    instructions are available in
    <a href="https://github.com/ericthayer/mobile-plans#readme/" target="_blank" rel="noopener"
      ><code>README.md</code></a
    >.
  </IntroductionItem>

  <IntroductionItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Ecosystem</template>

    Get official tools and libraries for your project:
    <a href="https://pinia.vuejs.org/" target="_blank" rel="noopener">Pinia</a>,
    <a href="https://router.vuejs.org/" target="_blank" rel="noopener">Vue Router</a>,
    <a href="https://test-utils.vuejs.org/" target="_blank" rel="noopener">Vue Test Utils</a>, and
    <a href="https://github.com/vuejs/devtools" target="_blank" rel="noopener">Vue Dev Tools</a>. If
    you need more resources, we suggest paying
    <a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">Awesome Vue</a>
    a visit.
  </IntroductionItem>

  <IntroductionItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>Community</template>

    Please reach out on Discord @ eric.thayer or send me an
    <a href="mailto:ethayer.design@gmail" target="_blank" rel="noopener">email</a> if you want to
    chat about this project, my process, or collaborate on something else.
  </IntroductionItem>

  <IntroductionItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>Thank You</template>
    This was an amazing expereince and chance to showcase what I can do. I plan on finishing the
    following:
    <!-- <button type="button" @click="setToDoList()">get list</button> -->
    <ul class="list">
      <li v-for="item in toDoListStore" :key="item.description" class="ml-0">
        <span v-if="item.completed && item.description == 'Setup data in store'" class="icon pr-1">🍍</span>
        <span v-else-if="item.completed" class="icon pr-1">✅</span>
        <span v-else class="pr-1">☒</span>
        {{ item.description }}
      </li>
    </ul>
  </IntroductionItem>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import useToDoListStore from '../../stores/ToDoList'

import IntroductionItem from './IntroductionItem.vue'
import DocumentationIcon from '../icons/IconDocumentation.vue'
import ToolingIcon from '../icons/IconTooling.vue'
import EcosystemIcon from '../icons/IconEcosystem.vue'
import CommunityIcon from '../icons/IconCommunity.vue'
import SupportIcon from '../icons/IconSupport.vue'

export default defineComponent({
  name: 'IntroductionItems',
  setup() {
    const toDoListStore = useToDoListStore()
    return {
      toDoListStore: computed(() => toDoListStore.getList)
    }
  },
  components: {
    IntroductionItem,
    DocumentationIcon,
    ToolingIcon,
    EcosystemIcon,
    CommunityIcon,
    SupportIcon
  },
  methods: {
    setToDoList() {
      const toDoList = [
        {
          description: 'Fix TypeScript errors',
          completed: true
        },
        {
          description: 'Setup data in store',
          completed: true
        },
        {
          description: 'Refactor JS/CSS',
          completed: false
        },
        {
          description: 'Breakout form into components',
          completed: false
        }
      ]
      useToDoListStore().setList(toDoList as [{ description: string, completed: boolean }])
    }
  },
  mounted() {
    this.setToDoList()
  }
})
</script>

