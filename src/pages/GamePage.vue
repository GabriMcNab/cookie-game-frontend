<template>
  <main>
    <h1>
      You're
      <span
        :class="`GamePage__player-tag GamePage__player-tag--p${store.player?.number}`"
        >Player {{ store.player?.number }}</span
      >
    </h1>
    <h1 v-if="store.activePlayer">
      Current Player:
      <span
        :class="`GamePage__player-tag GamePage__player-tag--p${store.activePlayer.number}`"
        >Player {{ store.activePlayer.number }}</span
      >
    </h1>
    <h2>Game Ready: {{ store.gameReady.toString() }}</h2>
    <dialog v-if="!store.gameReady" :open="!store.gameReady">
      <h2>Waiting for other players</h2>
      <h3>Invite other players to join</h3>
      <p>Game ID: {{ route.params.id }}</p>
    </dialog>
    <GameBoard v-else />
  </main>
</template>

<script lang="ts" setup>
import { onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import GameBoard from "@/components/GameBoard.vue";
import { useGameStore } from "@/stores/game";

const store = useGameStore();
const route = useRoute();
const router = useRouter();
const gameId = route.params.id as string;

store.$onAction(({ name, onError }) => {
  if (name === "joinGame") {
    onError((err) => {
      console.error(err);
      router.push("/");
    });
  }
});

onBeforeMount(() => {
  store.initSocket();
  store.joinGame(gameId);
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
