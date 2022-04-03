import { defineStore } from "pinia";
import { io, Socket } from "socket.io-client";
import { Border, Coordinates, GameBoard, GameState, Player } from "@/types";

export const useGameStore = defineStore("game", {
  state: () => ({
    socket: undefined as Socket | undefined,
    board: {} as GameBoard,
    playerNumber: undefined as Player["number"] | undefined,
    activePlayer: undefined as Player["number"] | undefined,
    players: [] as Player[],
    gameReady: false,
  }),
  actions: {
    /**
     * Method used to initialize a new socket connection
     */
    initSocket() {
      if (!this.socket) {
        this.socket = io("http://localhost:5000");

        this.socket.on("gameReady", (gameReady: boolean) => {
          this.gameReady = gameReady;
        });

        this.socket.on("gameUpdated", (game: GameState) => {
          this.board = game.board;
          this.activePlayer = game.activePlayer;
          this.players = game.players;
        });
      }
    },
    /**
     * Emits a socket event to join a game
     * @param gameId ID of the game
     */
    joinGame(gameId: string): Promise<void> {
      return new Promise((resolve, reject) => {
        this.socket?.emit(
          "joinGame",
          gameId,
          ({
            status,
            gameState,
          }: {
            status: "OK" | "KO";
            gameState: GameState;
          }) => {
            if (status === "KO") {
              reject("Could not join the game!");
            } else {
              this.playerNumber = gameState.players.find(
                (p) => p.id === this.socket?.id
              )?.number;
              this.activePlayer = gameState.activePlayer;
              this.board = gameState.board;
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
        this.gameReady &&
        this.activePlayer === this.playerNumber
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
