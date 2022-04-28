<template>
  <div class="GameBoard" data-testid="game-board">
    <GameBox
      v-for="(box, key) in store.game.board"
      :key="key"
      :position="box.position"
      :selected-borders="box.selectedBorders"
      :external-borders="box.externalBorders"
      :completed-by="box.completedBy"
      @click:border="store.setPlayerMove"
    />
  </div>
</template>

<script lang="ts" setup>
import GameBox from "@/components/GameBox.vue";
import { useGameStore } from "@/stores/game";

const store = useGameStore();
</script>

<style lang="scss">
.GameBoard {
  display: inline-grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
}
</style>
