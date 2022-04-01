<template>
  <div
    class="GameBox"
    :style="{ gridColumn: position[0], gridRow: position[1] }"
  >
    <div
      v-for="border in borders"
      :key="border"
      :class="`GameBox__border GameBox__border--${border} ${
        selectedBorders.includes(border) ? 'selected' : ''
      } ${externalBorders.includes(border) ? `external--${border}` : ''}`"
      @click="() => handleBorderClick(border)"
    ></div>

    <CrossSvg v-if="completedBy === 'p1'" />
    <OvalSvg v-if="completedBy === 'p2'" />
  </div>
</template>

<script lang="ts" setup>
import CrossSvg from "@/assets/svg/cross.svg";
import OvalSvg from "@/assets/svg/oval.svg";
import { Border, Coordinates, Player } from "@/types";

interface Props {
  position: Coordinates;
  selectedBorders: Array<Border>;
  externalBorders: Array<Border>;
  completedBy?: Player;
}

interface Events {
  (e: "click:border", border: Border, position: Coordinates): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Events>();

const borders: Array<Border> = ["north", "east", "south", "west"];

function handleBorderClick(border: Border) {
  if (!props.selectedBorders.includes(border)) {
    emit("click:border", border, props.position);
  }
}
</script>

<style lang="scss" scoped>
.GameBox {
  position: relative;
  display: grid;
  grid-template-columns: rem(10) 1fr rem(10);
  grid-template-rows: rem(10) 1fr rem(10);

  width: rem(100);
  height: rem(100);
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
    border-width: 2px;
    cursor: default;
    pointer-events: none;
  }

  .external--north,
  .external--east,
  .external--south,
  .external--west {
    &::before {
      content: "";
      position: absolute;
      background-color: #333;
    }
  }

  .external--north::before {
    width: calc(100% + 1px);
    height: 2px;
    top: -1px;
  }

  .external--east::before {
    width: 2px;
    height: calc(100% + 1px);
    right: -1px;
  }

  .external--south::before {
    width: calc(100% + 1px);
    height: 2px;
    bottom: -1px;
  }

  .external--west::before {
    width: 2px;
    height: calc(100% + 1px);
    left: -1px;
  }
}
</style>
