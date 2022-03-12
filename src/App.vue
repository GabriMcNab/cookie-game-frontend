<template>
  <div class="wrapper">
    <GameBoxComponent
      v-for="[pos, box] in gameBoard"
      :key="pos.toString()"
      :position="pos"
      :selected-borders="box.selectedBorders"
      @click:border="handleBorderClick"
    />
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import GameBoxComponent from "./components/GameBoxComponent.vue";
import { Border, Coordinates, GameBox } from "./types";

const gameBoard = reactive(generateGameBoard(9));

function generateGameBoard(size: number): Map<Coordinates, GameBox> {
  const gameBoard: Map<Coordinates, GameBox> = new Map();
  const midPoint = (size + 1) / 2;

  let elementsPerRow = 1;
  for (let y = 1; y <= size; y++) {
    const offset = (size - elementsPerRow) / 2;

    for (let x = 1; x <= elementsPerRow; x++) {
      gameBoard.set([x + offset, y], { selectedBorders: new Set() });
    }

    if (y < midPoint) {
      elementsPerRow += 2;
    } else {
      elementsPerRow -= 2;
    }
  }

  return gameBoard;
}

function getMapPosition(
  position: Coordinates,
  map: Map<Coordinates, GameBox>
): Coordinates | undefined {
  let mapPosition;

  for (let key of map.keys()) {
    if (key[0] === position[0] && key[1] === position[1]) {
      mapPosition = key;
      break;
    }
  }

  return mapPosition;
}

function getAdjacentPosition(position: Coordinates, side: Border): Coordinates {
  let adjacentPosition: Coordinates;
  switch (side) {
    case "east":
      adjacentPosition = [position[0] + 1, position[1]];
      break;
    case "south":
      adjacentPosition = [position[0], position[1] + 1];
      break;
    case "west":
      adjacentPosition = [position[0] - 1, position[1]];
      break;
    case "north":
      adjacentPosition = [position[0], position[1] - 1];
      break;
  }
  return adjacentPosition;
}

function getOppositeBorder(border: Border): Border {
  const oppositeBorders: Record<Border, Border> = {
    east: "west",
    north: "south",
    west: "east",
    south: "north",
  };
  return oppositeBorders[border];
}

function handleBorderClick(border: Border, position: Coordinates) {
  const adjacentBoxPosition = getAdjacentPosition(position, border);
  const adjacentBoxBorder = getOppositeBorder(border);

  const targetBox = gameBoard.get(position);
  if (targetBox) {
    targetBox.selectedBorders.add(border);
    gameBoard.set(position, targetBox);
  }

  const adjacentBox = gameBoard.get(
    getMapPosition(adjacentBoxPosition, gameBoard) || [0, 0]
  );
  if (adjacentBox) {
    adjacentBox.selectedBorders.add(adjacentBoxBorder);
    gameBoard.set(adjacentBoxPosition, adjacentBox);
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: inline-grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
}
</style>
