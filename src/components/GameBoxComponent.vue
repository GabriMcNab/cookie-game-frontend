<template>
  <div
    class="GameBoxComponent"
    :style="{ gridColumn: position[0], gridRow: position[1] }"
  >
    <div
      class="GameBoxComponent__border GameBoxComponent__border--north"
      :class="{
        selected: selectedBorders.has('north'),
      }"
      @click="$emit('click:border', 'north', position)"
    ></div>
    <div
      class="GameBoxComponent__border GameBoxComponent__border--east"
      :class="{
        selected: selectedBorders.has('east'),
      }"
      @click="$emit('click:border', 'east', position)"
    ></div>
    <div
      class="GameBoxComponent__border GameBoxComponent__border--south"
      :class="{
        selected: selectedBorders.has('south'),
      }"
      @click="$emit('click:border', 'south', position)"
    ></div>
    <div
      class="GameBoxComponent__border GameBoxComponent__border--west"
      :class="{
        selected: selectedBorders.has('west'),
      }"
      @click="$emit('click:border', 'west', position)"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { Border, Coordinates } from "@/types";

interface Props {
  position: Coordinates;
  selectedBorders: Set<Border>;
}

interface Events {
  (e: "click:border", border: Border, position: Coordinates): void;
}

defineProps<Props>();
defineEmits<Events>();
</script>

<style lang="scss" scoped>
.GameBoxComponent {
  display: grid;
  grid-template-columns: 10px 1fr 10px;
  grid-template-rows: 10px 1fr 10px;

  width: 100px;
  height: 100px;
  margin: -0.5px;

  &__border {
    height: 100%;
    width: 100%;
    cursor: pointer;
    box-sizing: border-box;

    &--north {
      border-top: 1px solid #333;
      grid-row: 1;
      grid-column: 1 / 4;
    }

    &--east {
      border-right: 1px solid #333;
      grid-row: 1 / 4;
      grid-column: 3;
    }

    &--south {
      border-bottom: 1px solid #333;
      grid-row: 3;
      grid-column: 1 / 4;
    }

    &--west {
      border-left: 1px solid #333;
      grid-row: 1 / 4;
      grid-column: 1;
    }
  }

  .selected {
    border-width: 3px;
  }
}
</style>
