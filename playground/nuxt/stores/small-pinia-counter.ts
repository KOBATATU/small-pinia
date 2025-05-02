import { defineStore } from "@small-pinia/store";

export const useCounterSmallStore = defineStore("counter", () => {
  const count = ref(0);
  const doubleCount = computed(() => count.value * 2);
  const increment = () => {
    count.value++;
  };

  return {
    count,
    doubleCount,
    increment,
  };
});

export const useCounterOptionsSmallStore = defineStore("options-counter", {
  state: () => {
    return {
      count: 0,
    };
  },
  getters: {
    doubleCount(): number {
      return this.count * 2;
    },
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});
