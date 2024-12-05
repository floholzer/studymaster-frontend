<script setup>
defineProps(['progressPercentage', 'progressAbsolute']);
</script>

<template class="progressbar">
    <v-progress-linear :model-value="progressPercentage" color="green" height="20">
        <template v-slot:default>
            <span>{{ progressAbsolute}} / 30 ECTS</span>
        </template>
    </v-progress-linear>
</template>

<style scoped>

</style>