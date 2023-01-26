<template>
  <Transition name="slide-y">
    <div class="table-cards" v-if="cardsLoaded && !cards.loading">
      <CardSingle :card="cards.enemy" @update:click="changeHp" can-beat />

      <CardList :cards="cards.my" can-use />
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useHearthstone } from "~/store/hearthstone";

const cardsLoaded = computed(() => cards.value.my.length);

const hearthstoneStore = useHearthstone();

const cards = computed(() => hearthstoneStore.cards);

const changeHp = () => {
  if (cards.value.enemy?.currentHp) {
    cards.value.enemy.currentHp -= 5;
  }
};
</script>

<style scoped lang="scss">
.table-cards {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  height: 100%;
  z-index: 3;
}
</style>
