<template>
  <div class="item">
    <i>
      <slot name="icon"></slot>
    </i>
    <div class="details">
      <h2 class="title kite-type-style--title-6">
        <slot name="heading"></slot>
      </h2>
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
.item {
  margin-top: 2rem;
  display: flex;
  position: relative;
}

.details {
  flex: 1;
  margin-left: 4rem;

  .title {
    margin-bottom: 0.5rem;
  }

  a {
    color: var(--kite-link-text-color);
    text-decoration: underline;
  }
}

i {
  background: var(--kite-color-gray-10);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  color: var(--kite-color-gray-30);
  display: flex;
  height: 32px;
  place-content: center;
  place-items: center;
  width: 32px;
}


@container (min-width: 996px) {
  .item {
    margin-top: 0;
    padding: 1rem 0 20rem calc(var(--section-gap) / 2);
    padding-bottom: 2rem;
  }

  i {
    top: calc(50% - 25px);
    left: -26px;
    position: absolute;
    width: 50px;
    height: 50px;
  }

  .item:before {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    bottom: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:after {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    top: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:first-of-type:before {
    display: none;
  }

  .item:last-of-type:after {
    display: none;
  }
}
</style>
