<template>
  <main>
    <h1>
      You're
      <span
        :class="`GamePage__player-tag GamePage__player-tag--p${store.player?.number}`"
        >Player {{ store.player?.number }}</span
      >
    </h1>
    <h1>
      Current Player:
      <span
        :class="`GamePage__player-tag GamePage__player-tag--p${store.activePlayer.number}`"
        >Player {{ store.activePlayer.number }}</span
      >
    </h1>
    <h1>Game Ready: {{ store.gameReady.toString() }}</h1>
    <GameBoard />
  </main>
</template>

<script lang="ts" setup>
import { onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { io, Socket } from "socket.io-client";
import GameBoard from "@/components/GameBoard.vue";
import { useGameStore } from "@/stores/game";
import { GameState } from "@/types";

const store = useGameStore();
const route = useRoute();
const router = useRouter();
const gameId = route.params.id;
let socket: Socket;

onBeforeMount(() => {
  socket = io("http://localhost:5000");

  socket.emit(
    "joinGame",
    gameId,
    ({ status, gameState }: { status: string; gameState: GameState }) => {
      if (status === "KO") {
        console.error("Something is wrong!");
        router.push("/");
      } else {
        store.player = gameState.players.find((p) => p.id === socket.id);
        store.activePlayer = gameState.activePlayer;
        store.board = gameState.board;
      }
    }
  );

  socket.on("gameReady", (gameReady: boolean) => {
    store.gameReady = gameReady;
  });
});
</script>

<style lang="scss" scoped>
.GamePage {
  &__player-tag {
    &--p1 {
      color: orangered;
    }

    &--p2 {
      color: dodgerblue;
    }
  }
}
</style>
