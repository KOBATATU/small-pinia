<template>
  <div>
    <div>
      <h2>options-small-counter Component</h2>
      <p>count: {{ counterOptionsSmallStore.count }}</p>
      <button @click="counterOptionsSmallStore.increment">increment</button>
    </div>
    <SmallOptionsCounter />
  </div>
</template>

<script setup lang="ts">
import { useCounterOptionsSmallStore } from "../stores/small-pinia-counter";

const counterOptionsSmallStore = useCounterOptionsSmallStore();
</script>
