<template>
  <div>
    <h1>Welcome to the cookie game!</h1>
    <h2>Create a new game</h2>
    <form>
      <button
        type="submit"
        data-testid="create-game-button"
        @click.prevent="handleCreateNewGame"
      >
        Create new game
      </button>
    </form>
    <h2>Join a game</h2>
    <form>
      <label for="gameId">Enter a game ID</label>
      <input v-model="gameId" name="gameId" type="text" />
      <button type="submit" @click.prevent="handleJoinGame">Join</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const gameId = ref("");

const handleCreateNewGame = async () => {
  const res = await fetch("http://localhost:5000/games/new", {
    method: "POST",
  });
  const data = await res.json();

  router.push(`/game/${data.gameId}`);
};

const handleJoinGame = () => {
  if (!gameId.value) {
    alert("You should enter a game ID");
  }

  router.push(`/game/${gameId.value}`);
};
</script>
