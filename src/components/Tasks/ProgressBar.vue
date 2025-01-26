<script setup>
defineProps(['progress']);
</script>

<template class="progressbar">
    <v-progress-linear :model-value="progress" color="green" height="20">
        {{ progress }}%
    </v-progress-linear>
</template>

<style scoped>

</style>