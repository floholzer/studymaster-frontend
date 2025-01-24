<script setup>
defineProps([
    'taskId',
    'taskName',
    'subject',
    'description',
    'due_date',
    'onDelete',
    'onDone',
]);
</script>

<template>
    <v-card class="task-card d-flex flex-column" outlined>
        <!-- Delete and Edit Icon -->
        <div class="control-items d-flex justify-space-between mx-1 mb-1 mt-1">
            <v-btn small icon class="edit-icon" color="blue" @click="console.log('Task edit clicked.')">
                <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon color="red" class="delete-icon" @click="onDelete(taskId)">
                <v-icon small>mdi-close</v-icon>
            </v-btn>
        </div>
        <v-divider></v-divider>
        <div class="task-name">{{ taskName }}</div>
        <div>until {{ due_date }}</div>
        <small class="task-subject">{{ subject }}</small>
        <div>{{ description }}</div>

        <!-- Done Button -->
        <v-btn class="btn-done" @click="onDone(taskId)">
            Done
            <v-icon right>mdi-check</v-icon>
        </v-btn>
    </v-card>
</template>

<style scoped>
.task-name {
    font-weight: bold;
    font-size: 1.2rem;
}

.task-subject {
    color: #4caf50;
    font-weight: 500;
    font-size: 1rem;
}

.task-card {
    width: 150px;
    height: 200px;
    border-radius: 8px;
    background-color: #fce5cd;
    text-align: center;
    font-size: 0.8rem;
    position: relative;
    border: dimgray solid 3px;
    transition: box-shadow 0.4s ease, transform 0.4s ease;
}
.task-card:hover {
    transform: scale(1.10);
}

.btn-done {
    position: absolute;
    bottom: 0;
    width: 100%;
    border-radius: 0;
    background-color: #4caf50;
    color: white;
    font-size: 0.8rem;
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
