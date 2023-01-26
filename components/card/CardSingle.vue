<template>
  <div
    @dragstart="startDrag($event)"
    @dragend="endDrag($event)"
    @dragover.prevent
    @dragenter.prevent
    @drop="onDrop($event)"
    :draggable="canUse"
    class="card"
    :class="{ 'can-use': canUse, dragged: draggable }"
  >
    <img class="card__image" :src="card.img" :alt="card.name" />
    <div v-if="card.currentHp !== undefined" class="card__hp text">
      {{ card.currentHp }}/30
    </div>
  </div>
</template>

<script setup lang="ts">
import { TCard } from "~/types/hearthstone";

type Props = {
  card: TCard;
  canUse?: boolean;
  canBeat?: boolean;
};

const props = defineProps<Props>();

const emit = defineEmits(["update:startDrag", "update:endDrag", "update:drop"]);

const draggable = ref(false);

const startDrag = (event: Event): void => {
  draggable.value = true;
  emit("update:startDrag", event, props.card);
};
const endDrag = (event: Event): void => {
  draggable.value = false;
  emit("update:endDrag", event, props.card);
};
const onDrop = (event: Event): void => {
  emit("update:drop", event, props.card);
};
</script>

<style scoped lang="scss">
.card {
  position: relative;
  display: inline-flex;
  max-width: 187.5px;
  transition: 0.3s;

  &.can-use {
    &:hover {
      cursor: pointer;
      transform: translateY(-40px);
      transition: 0.5s;
    }
  }

  &.dragged {
    transform: scale(1.2);
  }

  .card__image {
    pointer-events: none;
  }

  .card__hp {
    user-select: none;
    pointer-events: none;
    position: absolute;
    bottom: 30%;
    left: 16%;
    transform: translateX(50%);

    width: 64px;
    padding: 2px 5px;

    color: $red;
    background: $transparent;
    border-radius: 5px;
    backdrop-filter: blur(3px);
    text-align: center;
  }
}
</style>
