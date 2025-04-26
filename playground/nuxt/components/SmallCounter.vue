<template>
  <div>
    <h2>small-counter Component</h2>
    <p>count: {{ counterSmallStore.count }}</p>
    <button @click="counterSmallStore.increment">increment</button>
  </div>
</template>

<script setup lang="ts">
import { useCounterSmallStore } from "../stores/small-pinia-counter";

const counterSmallStore = useCounterSmallStore();
</script>
