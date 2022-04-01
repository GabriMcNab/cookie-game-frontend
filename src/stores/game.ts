import { defineStore } from "pinia";
import { getOppositeBorder, updateGameBox } from "@/services/gameBox";
import { getAdjacentGameBoxPosition } from "@/services/gameBoard";
import { Border, Coordinates, GameBoard, Player } from "@/types";

export const useGameStore = defineStore("game", {
  state: () => ({
    player: undefined as Player | undefined,
    board: {} as GameBoard,
    activePlayer: undefined as Player | undefined,
    gameReady: false,
  }),
  actions: {
    /**
     * Handles the player's move by updating the corresponding game boxes
     * @param position Position of the GameBox clicked
     * @param border Border clicked
     */
    setPlayerMove(border: Border, position: Coordinates) {
      const targetBox = this.board[position.toString()];
      const updatedBox = updateGameBox(
        targetBox,
        border,
        this.activePlayer ?? { id: "", number: 1 }
      );

      const adjBoxPosition = getAdjacentGameBoxPosition(position, border);
      const adjBorder = getOppositeBorder(border);
      const adjBox = this.board[adjBoxPosition.toString()];
      const updatedAdjBox = updateGameBox(
        adjBox,
        adjBorder,
        this.activePlayer ?? { id: "", number: 1 }
      );

      if (!updatedBox.completedBy && !updatedAdjBox.completedBy) {
        //this.toggleActivePlayer();
      }

      this.board[position.toString()] = updatedBox;
      this.board[adjBoxPosition.toString()] = updatedAdjBox;
    },
  },
});
