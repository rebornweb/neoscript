<template>
  <div>
    <h1>I am vue</h1>
    <FastTracker />
  </div>
</template>

<script>
import FastTracker from "./components/FastTracker";

export default {
  name: "app",
  components: {
    FastTracker,
  },
};
</script>
