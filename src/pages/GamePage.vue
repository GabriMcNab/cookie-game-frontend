<template>
  <main class="GamePage">
    <aside>
      <h1>
        You're
        <span
          :class="`GamePage__player-tag GamePage__player-tag--p${playerNumber}`"
          >Player {{ playerNumber }}</span
        >
      </h1>
      <h1 v-if="game.activePlayer">
        Current Player:
        <span
          :class="`GamePage__player-tag GamePage__player-tag--p${game.activePlayer}`"
          >Player {{ game.activePlayer }}</span
        >
      </h1>
      <h2
        v-for="player in game.players"
        :key="player.id"
        :data-testid="`game-score-player-${player.number}`"
      >
        Player {{ player.number }} score: {{ player.score }}
      </h2>
    </aside>
    <dialog v-if="game.gameOver" :open="game.gameOver">
      <h2>Game Over</h2>
      <h3 v-if="winningPlayer">Player {{ winningPlayer }} wins!</h3>
      <h3 v-else>Draw!</h3>
      <ul>
        <li
          v-for="player in game.players"
          :key="player.id"
          :data-testid="`game-score-player-${player.number}`"
        >
          Player {{ player.number }} score: {{ player.score }}
        </li>
      </ul>
      <button @click="router.push('/')">Exit</button>
    </dialog>
    <dialog
      v-else-if="!game.gameReady"
      :open="!game.gameReady"
      data-testid="wait-player-dialog"
    >
      <h2>Waiting for other players</h2>
      <h3>Invite other players to join</h3>
      <p>Game ID: {{ route.params.id }}</p>
    </dialog>
    <GameBoard v-else />
  </main>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount } from "vue";
import {
  onBeforeRouteLeave,
  onBeforeRouteUpdate,
  useRoute,
  useRouter,
} from "vue-router";
import { storeToRefs } from "pinia";
import GameBoard from "@/components/GameBoard.vue";
import { useGameStore } from "@/stores/game";

const store = useGameStore();
const { game, playerNumber } = storeToRefs(store);
const route = useRoute();
const router = useRouter();
const gameId = route.params.id as string;

const initializeGame = () => {
  console.log("init");
  store.initSocket();
  store.joinGame(gameId).catch((err) => {
    console.error(err);
    router.push("/");
  });
};

onBeforeMount(initializeGame);
onBeforeRouteUpdate(initializeGame);

onBeforeRouteLeave(store.disconnectSocket);

const winningPlayer = computed(() => {
  const playersScore = game.value.players.map((p) => p.score);

  if (playersScore.every((s) => s === playersScore[0])) {
    return;
  }

  const maxScore = Math.max(...playersScore);
  const playerWithHighestScore = game.value.players.find(
    (p) => p.score === maxScore
  );

  return playerWithHighestScore?.number;
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
