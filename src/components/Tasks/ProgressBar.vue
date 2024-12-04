<script setup>
defineProps(['completedEcts']);
</script>

<template class="progressbar">
    <v-progress-linear color="green" height="20">
        <template v-slot:default>
            <span>{{ (completedEcts / 30) * 100 }} / 30 ECTS</span>
        </template>
    </v-progress-linear>
</template>

<style scoped>

</style>