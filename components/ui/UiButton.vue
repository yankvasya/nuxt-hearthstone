<template>
  <button class="ui-button text" @click="clickHandler">
    {{ text }}
  </button>
</template>

<script setup lang="ts">
type Props = {
  text: string;
};

defineProps<Props>();

const emit = defineEmits(["update:click"]);

const clickHandler = () => {
  emit("update:click");
};
</script>

<style scoped lang="scss">
.ui-button {
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 5px 10px;

  cursor: pointer;
  background: $orange;
  color: $yellow;
  border: 1px solid $yellow;
  border-radius: 10px;
  text-transform: uppercase;
  transition: 0.2s;

  &:hover {
    background: $yellow;
    color: $orange;
    border: 1px solid $orange;
    transition: 0.4s;
  }

  &.disabled {
    pointer-events: none;
    background: $yellow;
    transition: 0.4s;
  }
}
</style>
