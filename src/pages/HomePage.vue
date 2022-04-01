<template>
  <h1>Create a new game</h1>
  <form>
    <button type="submit" @click.prevent="handleCreateNewGame">
      Create new game
    </button>
  </form>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter();

const handleCreateNewGame = async () => {
  const res = await fetch("http://localhost:5000/games/new", {
    method: "POST",
  });
  const data = await res.json();

  router.replace(`/game/${data.gameId}`);
};
</script>
