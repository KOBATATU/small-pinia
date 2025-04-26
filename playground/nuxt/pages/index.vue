<template>
  <div>
    <div>
      <h2>small-counter</h2>
      <p>count: {{ counterSmallStore.count }}</p>
      <button @click="counterSmallStore.increment">increment</button>
    </div>
    <SmallCounter />
  </div>
</template>

<script setup lang="ts">
import { useCounterSmallStore } from "../stores/small-pinia-counter";

const counterSmallStore = useCounterSmallStore();
</script>
