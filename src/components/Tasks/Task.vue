<script setup>
defineProps(['taskId', 'subject', 'ects', 'description', 'due_date', 'onDelete']);
</script>

<template>
    <v-card class="task-card d-flex flex-column" outlined>
        <!-- Delete and Edit Icon -->
        <div class="d-flex justify-space-between mx-1 mt-1">
            <v-btn small icon class="edit-icon" color="blue" @click="console.log('Task edit clicked.')">
                <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon color="red" class="delete-icon" @click="() => onDelete(taskId)">
                <v-icon small>mdi-close</v-icon>
            </v-btn>
        </div>
        <div class="task-name">{{ subject }}</div>
        <div>until {{ due_date }}</div>
        <small class="task-ects">{{ ects }} ECTS</small>
        <div>{{ description }}</div>

    </v-card>
</template>

<style scoped>
.task-name {
    font-weight: bold;
    font-size: 1.5rem;
}

.task-ects {
    color: #4caf50;
    font-weight: 500;
    font-size: 1rem;
}

.task-card {
    width: 150px;
    height: 200px;
    border-radius: 8px;
    background-color: #fce5cd;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    font-size: 0.8rem;
    position: relative;
}

.delete-icon {
    position: relative;
    z-index: 10;
    width: 24px;
    height: 24px;
    font-size: 12px;
}

.edit-icon {
    position: relative;
    z-index: 10;
    width: 24px;
    height: 24px;
    font-size: 12px;
}
</style>
