<script setup lang="ts">
import GameBox from "./components/GameBox.vue";
</script>

<template>
  <div class="wrapper">
    <GameBox :pos="{ x: 3, y: 1 }" />
    <GameBox :pos="{ x: 2, y: 2 }" />
    <GameBox :pos="{ x: 3, y: 2 }" />
    <GameBox :pos="{ x: 4, y: 2 }" />
    <GameBox :pos="{ x: 1, y: 3 }" />
    <GameBox :pos="{ x: 2, y: 3 }" />
    <GameBox :pos="{ x: 3, y: 3 }" />
    <GameBox :pos="{ x: 4, y: 3 }" />
    <GameBox :pos="{ x: 5, y: 3 }" />
    <GameBox :pos="{ x: 2, y: 4 }" />
    <GameBox :pos="{ x: 3, y: 4 }" />
    <GameBox :pos="{ x: 4, y: 4 }" />
    <GameBox :pos="{ x: 3, y: 5 }" />
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: inline-grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
}
</style>
