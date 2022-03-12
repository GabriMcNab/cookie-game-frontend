<template>
  <main class="wrapper">
    <GameBoxComponent
      v-for="(box, key) in store.gameBoard"
      :key="key"
      :position="box.position"
      :selected-borders="box.selectedBorders"
      :external-borders="box.externalBorders"
      @click:border="handleBorderSelect"
    />
  </main>
</template>

<script lang="ts" setup>
import GameBoxComponent from "@/components/GameBoxComponent.vue";
import { useBoardStore } from "@/stores/board";

import { getOppositeBorder } from "@/services/gameBox";
import {
  generateGameBoard,
  getAdjacentGameBoxPosition,
} from "@/services/gameBoard";

import { Border, Coordinates } from "@/types";

const store = useBoardStore();
store.$state = { gameBoard: generateGameBoard(9) };

function handleBorderSelect(border: Border, position: Coordinates) {
  const adjacentBoxPosition = getAdjacentGameBoxPosition(position, border);
  const adjacentBoxBorder = getOppositeBorder(border);

  store.updateGameBoxBorders(position, border);
  store.updateGameBoxBorders(adjacentBoxPosition, adjacentBoxBorder);
}
</script>

<style lang="scss">
@import "@/assets/scss/reset.scss";

.wrapper {
  display: inline-grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
}
</style>
