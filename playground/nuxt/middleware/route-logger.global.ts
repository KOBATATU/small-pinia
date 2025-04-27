import { useCounterSmallStore } from "../stores/small-pinia-counter";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const counterSmallStore = useCounterSmallStore();

  console.log(counterSmallStore.count);
});
