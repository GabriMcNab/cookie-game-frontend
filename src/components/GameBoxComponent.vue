<template>
  <div
    class="GameBoxComponent"
    :style="{ gridColumn: position[0], gridRow: position[1] }"
  >
    <div
      v-for="border in borders"
      :key="border"
      :class="`GameBoxComponent__border GameBoxComponent__border--${border} ${
        selectedBorders.has(border) ? 'selected' : ''
      }`"
      @click="$emit('click:border', border, position)"
    ></div>
    <div
      v-for="externalBorder in externalBorders"
      :key="externalBorder"
      :class="`GameBoxComponent__external-border GameBoxComponent__external-border--${externalBorder}`"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { Border, Coordinates } from "@/types";

interface Props {
  position: Coordinates;
  selectedBorders: Set<Border>;
  externalBorders: Set<Border>;
}

interface Events {
  (e: "click:border", border: Border, position: Coordinates): void;
}

defineProps<Props>();
defineEmits<Events>();

const borders: Set<Border> = new Set(["north", "east", "south", "west"]);
</script>

<style lang="scss" scoped>
.GameBoxComponent {
  position: relative;
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

  &__external-border {
    background-color: #333;
    cursor: pointer;
    box-sizing: border-box;
    position: absolute;

    &--north {
      width: calc(100% + 1px);
      height: 2px;
      top: -1px;
    }

    &--east {
      width: 2px;
      height: calc(100% + 1px);
      right: -1px;
    }

    &--south {
      width: calc(100% + 1px);
      height: 2px;
      bottom: -1px;
    }

    &--west {
      width: 2px;
      height: calc(100% + 1px);
      left: -1px;
    }
  }

  .selected {
    border-width: 2px;
  }
}
</style>
