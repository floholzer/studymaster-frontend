<script setup>
defineProps(['text']);
</script>

<template>
  <v-btn>
    {{ text }}
  </v-btn>
</template>

<style scoped>
button {
  --bg: #27ae60;
  --text-color: #fff;
  position: relative;
  width: 200px;
  border: none;
  background: var(--bg);
  color: var(--text-color);
  font-weight: bold;
  text-transform: uppercase;
  font-size: large;
  transition: 0.2s;
  border-radius: 5px;
  opacity: 0.8;
  letter-spacing: 1px;
  box-shadow: #1e8449  0px 10px 2px, #000 0px 8px 5px;

  padding-top: 0.8em;
  padding-bottom: 1.6em;
}

button:hover {
  opacity: 1;
  box-shadow: #1e8449  0px 10px 2px, #000 0px 8px 5px;
}

button:active {
  top: 4px;
  box-shadow: #1e8449  0px 3px 2px,#000 0px 3px 5px;
}
</style>