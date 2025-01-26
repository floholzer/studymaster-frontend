<script setup>
defineProps(['progressPercentage', 'progressAbsolute']);
</script>

<template class="progressbar">
    <v-progress-linear :model-value="progressPercentage" color="green" height="20">
    </v-progress-linear>
</template>

<style scoped>

</style>