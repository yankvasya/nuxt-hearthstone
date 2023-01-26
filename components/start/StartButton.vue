<template>
  <div
    class="start-button"
    :class="{
      'need-restart': bossDefeated,
    }"
  >
    <Transition name="slide-y">
      <UiButton
        v-if="needButton"
        class="start-button__button"
        :class="{
          disabled: cards.loading || (cards.value?.enemy && !bossDefeated),
        }"
        text="Start"
        @update:click="getCards"
      />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useHearthstone } from "~/store/hearthstone";

const hearthstoneStore = useHearthstone();

const getCards = () => hearthstoneStore.getCards("sets/Naxxramas");

const cards = computed(() => hearthstoneStore.cards);

const needButton = computed(
  () =>
    (loaded.value && !cards.value.my.length) ||
    cards.value?.enemy?.currentHp === 0
);

const loaded = ref(false);
const bossDefeated = computed(() => cards.value?.enemy?.currentHp === 0);

onMounted(() => {
  loaded.value = true;
});
</script>

<style scoped lang="scss">
.start-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;

  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &.need-restart {
    z-index: 3;
    background: $transparent;
  }

  &__button {
    z-index: 4;
  }
}
</style>
