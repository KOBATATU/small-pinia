<template>
  <div>
    <h2>options-small-counter Component</h2>
    <p>count: {{ counterOptionsSmallStore.count }}</p>
    <p>double count: {{ counterOptionsSmallStore.doubleCount }}</p>

    <button @click="counterOptionsSmallStore.increment">increment</button>
  </div>
</template>

<script setup lang="ts">
import { useCounterOptionsSmallStore } from "../stores/small-pinia-counter";

const counterOptionsSmallStore = useCounterOptionsSmallStore();
</script>
