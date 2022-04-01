import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import HomePage from "@/pages/HomePage.vue";
import GamePage from "@/pages/GamePage.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", component: HomePage },
  { path: "/game/:id", component: GamePage },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
