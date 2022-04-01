<template>
  <main>
    <h1>
      Current Player:
      <span
        :style="{
          color: store.activePlayer === 'p1' ? 'orangered' : 'dodgerBlue',
        }"
        >{{ currentPlayer }}</span
      >
    </h1>
    <div class="wrapper">
      <GameBox
        v-for="(box, key) in store.board"
        :key="key"
        :position="box.position"
        :selected-borders="box.selectedBorders"
        :external-borders="box.externalBorders"
        :completed-by="box.completedBy"
        @click:border="store.setPlayerMove"
      />
    </div>
  </main>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import GameBox from "@/components/GameBox.vue";
import { useGameStore } from "@/stores/game";

const store = useGameStore();

const currentPlayer = computed(() => {
  return store.activePlayer === "p1" ? "Player 1" : "Player 2";
});
</script>

<style lang="scss">
.wrapper {
  display: inline-grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
}
</style>
