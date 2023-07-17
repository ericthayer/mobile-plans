<template>
  <div class="container">
    <header class="app-header" role="banner">
      <div class="wrapper">
        <img alt="Mobile Plans logo" class="logo" src="@/assets/images/logo.svg" />
        <Introduction msg="Mobile Plans" />
        <nav class="main-menu" role="navigation">
          <RouterLink to="/" class="nav-item">Docs</RouterLink>
          <RouterLink to="/submission" class="nav-item">Submission</RouterLink>
        </nav>
      </div>
    </header>
    <main id="main" class="main" role="main">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Introduction from './components/text/Introduction.vue'
</script>

<style lang="scss">
.app {
  display: flex;
  flex-grow: 1;
}

.app-header {
  line-height: 1.5;
  margin-bottom: 2rem;
}

.main {
  place-self: stretch;
}

.logo {
  display: block;
  margin-top: 0;
  margin-right: auto;
  margin-bottom: 2rem;
  margin-left: auto;
  max-width: 150px;
}

.main-menu {
  margin-top: 2rem;
  text-align: center;
  width: 100%;
}

.nav-item {
  border-left: 1px solid var(--color-border);
  display: inline-block;
  padding: 0 1rem;

  &.router-link-exact-active {
    color: var(--focus-text-color);

    &:hover {
      background-color: transparent;
    }
  }
  &:first-of-type {
    border: 0;
  }
}

@container (min-width: 996px) {
  .app-header {
    display: flex;
    margin-bottom: 0;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
   
    .wrapper {
      display: flex;
      place-items: flex-start;
      flex-wrap: wrap;
    }
  }

  .logo {
    margin-left: 0;
    margin-bottom: 2rem;
  }

  .main-menu {
    font-size: 1rem;
    margin-top: 1rem;
    margin-left: -1rem;
    padding: 1rem 0;
    text-align: left;
  }
}
</style>
