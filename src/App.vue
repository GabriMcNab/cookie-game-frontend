<template>
  <div class="wrapper">
    <GameBoxComponent
      v-for="(box, key) in gameBoard"
      :key="key"
      :position="box.position"
      :selected-borders="box.selectedBorders"
      :external-borders="box.externalBorders"
      @click:border="handleBorderClick"
    />
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import GameBoxComponent from "./components/GameBoxComponent.vue";
import { Border, Coordinates, GameBoard, GameBox } from "./types";

const gameBoard = reactive(generateGameBoard(9));

function generateGameBox(
  col: number,
  row: number,
  elementsPerRow: number,
  midPoint: number
): GameBox {
  const externalBorders: Border[] = [];

  if (col === 1 || col === elementsPerRow) {
    if (col === 1) externalBorders.push("west");
    if (col === elementsPerRow) externalBorders.push("east");
    if (row <= midPoint) externalBorders.push("north");
    if (row >= midPoint) externalBorders.push("south");
  }

  return {
    position: [col, row],
    selectedBorders: new Set<Border>(externalBorders),
    externalBorders: new Set<Border>(externalBorders),
  };
}

function generateGameBoard(size: number): GameBoard {
  const gameBoard: GameBoard = {};
  const midPoint = (size + 1) / 2;

  let elementsPerRow = 1;
  for (let y = 1; y <= size; y++) {
    const offset = (size - elementsPerRow) / 2;

    for (let x = 1; x <= elementsPerRow; x++) {
      const gameBox = generateGameBox(x, y, elementsPerRow, midPoint);
      gameBox.position = [x + offset, y];
      gameBoard[[x + offset, y].toString()] = gameBox;
    }

    if (y < midPoint) {
      elementsPerRow += 2;
    } else {
      elementsPerRow -= 2;
    }
  }

  return gameBoard;
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

  const targetBox = gameBoard[position.toString()];
  if (targetBox) {
    targetBox.selectedBorders.add(border);
    gameBoard[position.toString()] = targetBox;
  }

  const adjacentBox = gameBoard[adjacentBoxPosition.toString()];
  if (adjacentBox) {
    adjacentBox.selectedBorders.add(adjacentBoxBorder);
    gameBoard[adjacentBoxPosition.toString()] = adjacentBox;
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
