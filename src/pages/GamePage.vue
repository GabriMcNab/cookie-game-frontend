<template>
  <main>
    <h1>You're now in {{ route.params.id }}</h1>
    <GameBoard />
  </main>
</template>

<script lang="ts" setup>
import { onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { io } from "socket.io-client";
import GameBoard from "@/components/GameBoard.vue";

const route = useRoute();
const router = useRouter();
const gameId = route.params.id;

onBeforeMount(() => {
  const socket = io("http://localhost:5000");
  socket.emit("joinGame", gameId, ({ status }: { status: string }) => {
    if (status === "KO") {
      console.error("Something is wrong!");
      router.push("/");
    }
  });
});
</script>
