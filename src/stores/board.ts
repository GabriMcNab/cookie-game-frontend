import { defineStore } from "pinia";
import { Border, Coordinates, GameBoard } from "@/types";

export const useBoardStore = defineStore("board", {
  state: () => ({
    gameBoard: {} as GameBoard,
  }),
  actions: {
    /**
     * Updates the borders of a GameBox
     * @param boxPosition Position of the GameBox to update
     * @param border Border to add to the Set<Border>
     */
    updateGameBoxBorders(boxPosition: Coordinates, border: Border) {
      const targetBox = this.gameBoard[boxPosition.toString()];
      if (targetBox) {
        targetBox.selectedBorders.add(border);

        if (targetBox.selectedBorders.size === 4) {
          targetBox.completedBy = "p2";
        }

        this.gameBoard[boxPosition.toString()] = targetBox;
      }
    },
  },
});
