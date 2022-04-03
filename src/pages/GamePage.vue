<template>
  <main class="GamePage">
    <aside>
      <h1>
        You're
        <span
          :class="`GamePage__player-tag GamePage__player-tag--p${store.playerNumber}`"
          >Player {{ store.playerNumber }}</span
        >
      </h1>
      <h1 v-if="store.activePlayer">
        Current Player:
        <span
          :class="`GamePage__player-tag GamePage__player-tag--p${store.activePlayer}`"
          >Player {{ store.activePlayer }}</span
        >
      </h1>
      <h2 v-for="player in store.players" :key="player.id">
        Player {{ player.number }} score: {{ player.score }}
      </h2>
    </aside>
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

onBeforeMount(() => {
  store.initSocket();
  store.joinGame(gameId).catch((err) => {
    console.error(err);
    router.push("/");
  });
});
</script>

<style lang="scss" scoped>
.GamePage {
  padding: 50px 80px;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;

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
