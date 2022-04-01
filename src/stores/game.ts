import { defineStore } from "pinia";
import { io, Socket } from "socket.io-client";
import { getOppositeBorder, updateGameBox } from "@/services/gameBox";
import { getAdjacentGameBoxPosition } from "@/services/gameBoard";
import { Border, Coordinates, GameBoard, GameState, Player } from "@/types";

export const useGameStore = defineStore("game", {
  state: () => ({
    socket: undefined as Socket | undefined,
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
    /**
     * Method used to initialize a new socket connection
     */
    initSocket() {
      if (!this.socket) {
        this.socket = io("http://localhost:5000");

        this.socket.on("gameReady", (gameReady: boolean) => {
          this.gameReady = gameReady;
        });
      }
    },
    /**
     * Emits a socket event to join a game
     * @param gameId ID of the game
     */
    joinGame(gameId: string) {
      this.socket?.emit(
        "joinGame",
        gameId,
        ({ status, gameState }: { status: string; gameState: GameState }) => {
          if (status === "KO") {
            throw new Error("Could not join the game!");
          } else {
            this.player = gameState.players.find(
              (p) => p.id === this.socket?.id
            );
            this.activePlayer = gameState.activePlayer;
            this.board = gameState.board;
          }
        }
      );
    },
  },
});
