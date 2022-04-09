import { defineStore } from "pinia";
import { io, Socket } from "socket.io-client";
import { Border, Coordinates, GameBoard, GameState, Player } from "@/types";

export const useGameStore = defineStore("game", {
  state: (): { game: GameState; socket?: Socket } => ({
    socket: undefined as Socket | undefined,
    game: {
      board: {} as GameBoard,
      activePlayer: undefined as Player["number"] | undefined,
      players: [] as Player[],
      gameReady: false,
      gameOver: false,
    },
  }),
  getters: {
    playerNumber: (state) =>
      state.game.players.find((p) => p.id === state.socket?.id)?.number,
  },
  actions: {
    /**
     * Method used to initialize a new socket connection
     */
    initSocket() {
      if (!this.socket) {
        this.socket = io("http://localhost:5000");

        this.socket.on("playerJoined", (game: GameState) => {
          console.log("player joined");
          this.game = game;
        });

        this.socket.on("gameUpdated", (game: GameState) => {
          this.game = game;
        });
      }
    },
    /**
     * Used to manually disconnect socket from server
     */
    disconnectSocket() {
      this.socket?.disconnect();
      this.socket = undefined;
    },
    /**
     * Emits a socket event to join a game
     * @param gameId ID of the game
     * @returns Promise
     */
    joinGame(gameId: string): Promise<void> {
      return new Promise((resolve, reject) => {
        this.socket?.emit(
          "joinGame",
          gameId,
          ({ status }: { status: "OK" | "KO" }) => {
            if (status === "KO") {
              reject("Could not join the game!");
            } else {
              resolve();
            }
          }
        );
      });
    },
    /**
     * Emits a socket event to update the board with the player's move
     * @param position Position of the GameBox clicked
     * @param border Border clicked
     */
    setPlayerMove(border: Border, position: Coordinates) {
      if (
        this.socket &&
        this.game.gameReady &&
        this.game.activePlayer === this.playerNumber
      ) {
        this.socket.emit(
          "playerMove",
          { border, position },
          ({ status }: { status: "OK" | "KO" }) => {
            if (status === "KO") {
              console.error("Error while setting the player's move!");
            }
          }
        );
      }
    },
  },
});
