<template>
  <Transition name="slide-y">
    <div class="table-cards" v-if="cardsLoaded && !cards.loading">
      <CardSingle :card="cards.enemy" can-beat @update:drop="onDrop" />

      <div class="table-cards__list">
        <CardSingle
          v-for="card of cards.my"
          :key="card.cardId"
          :card="card"
          can-use
          @update:startDrag="startDrag"
        />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useHearthstone } from "~/store/hearthstone";
import { TCard, TCards } from "~/types/hearthstone";

const cardsLoaded = computed(() => cards.value.my.length);

const hearthstoneStore = useHearthstone();

const cards = computed(() => hearthstoneStore.cards);

const changeHp = (value = 0) => {
  if (cards.value.enemy?.currentHp) {
    cards.value.enemy.currentHp =
      cards.value.enemy.currentHp - value >= 0
        ? cards.value.enemy.currentHp - value
        : 0;
  }
};

const startDrag = (
  evt: Event & { dataTransfer: DataTransfer },
  card: TCard
) => {
  evt.dataTransfer.dropEffect = "move";
  evt.dataTransfer.effectAllowed = "move";
  evt.dataTransfer.setData("card", JSON.stringify(card));
};

const onDrop = (evt: Event & { dataTransfer: DataTransfer }) => {
  const attackingCard: TCard = JSON.parse(evt.dataTransfer.getData("card"));
  changeHp(attackingCard.attack);
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

  &__list {
    display: flex;
  }
}
</style>
