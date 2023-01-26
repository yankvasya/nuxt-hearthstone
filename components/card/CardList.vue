<template>
  <div class="card__list">
    <CardSingle
      v-for="card of cards"
      :key="card.cardId"
      :card="card"
      :can-use="canUse"
    />
  </div>
</template>

<script setup lang="ts">
import { TCards } from "~/types/hearthstone";

type Props = {
  cards: TCards;
  canUse?: boolean;
};

defineProps<Props>();
</script>

<style scoped lang="scss">
.card__list {
  display: flex;
}
</style>
