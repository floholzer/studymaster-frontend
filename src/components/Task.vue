<script setup>
defineProps(['subject', 'ects', 'description', 'due_date']);
</script>

<template>
    <v-card
        class="task-card d-flex flex-column justify-space-between pa-2"
        outlined
    >
        <div>
            <div class="task-name">{{ subject }}</div>
            <div>until {{ due_date }}</div>
            <small class="task-ects">{{ ects }} ECTS</small>
            <div>{{ description }}</div>
        </div>
        <div class="d-flex justify-space-between mt-2">
            <v-btn small icon color="blue" @click="console.log('Task edit clicked.')">
                <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn small icon color="red" @click="console.log('Task removed clicked.')">
                <v-icon>mdi-delete</v-icon>
            </v-btn>
        </div>
    </v-card>
</template>

<style scoped>
.task-name {
    font-weight: bold;
}
.task-ects {
    color: #4caf50;
    font-weight: 500;
}
</style>