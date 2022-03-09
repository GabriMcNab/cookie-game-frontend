<template>
  <div class="GameBox" :style="{ gridColumn: pos.x, gridRow: pos.y }">
    <div class="GameBox__border GameBox__border--north"></div>
    <div class="GameBox__border GameBox__border--east"></div>
    <div class="GameBox__border GameBox__border--south"></div>
    <div class="GameBox__border GameBox__border--west"></div>
  </div>
</template>

<script lang="ts" setup>
import { Coordinates } from "@/types";

interface Props {
  pos: Coordinates;
}

defineProps<Props>();
</script>

<style lang="scss" scoped>
.GameBox {
  background-color: white;
  display: grid;
  grid-template-columns: 10px 1fr 10px;
  grid-template-rows: 10px 1fr 10px;

  width: 50px;
  height: 50px;
  margin: -0.5px;
  border: 1px solid orangered;
  box-sizing: border-box;

  &__border {
    height: 100%;
    width: 100%;
    opacity: 0;
    cursor: pointer;

    &--north {
      border-top: 5px solid black;
      grid-row: 1;
      grid-column: 1 / 4;
    }

    &--east {
      grid-row: 1 / 4;
      grid-column: 3;
    }

    &--south {
      grid-row: 3;
      grid-column: 1 / 4;
    }

    &--west {
      grid-row: 1 / 4;
      grid-column: 1;
    }
  }
}
</style>
