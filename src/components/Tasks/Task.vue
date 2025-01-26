<script setup>
import { useStore } from 'vuex';
import {computed} from "vue";
const store = useStore();
const props = defineProps({
    task: {
        type: Object,
        required: true
    },
    subjects: {
        type: Array,
        default: () => []
    },
    onDelete: {
        type: Function,
        required: true
    },
    onDone: {
        type: Function,
        required: true
    },
    onEdit: {
        type: Function,
        required: true
    }
});

const subjectName = computed(() => {
    const allSubjects = store.getters.getSubjects;
    return allSubjects.find(s => s.id === props.task.subjectId)?.name || 'Unknown Subject';
});
</script>

<template>
    <v-card class="task-card d-flex flex-column" outlined>
        <!-- Delete and Edit Icon -->
        <div class="control-items d-flex justify-space-between mx-1 mb-1 mt-1">
            <v-btn small icon class="edit-icon" color="blue" @click="onEdit(task)">
                <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon color="red" class="delete-icon" @click="onDelete(task)">
                <v-icon small>mdi-close</v-icon>
            </v-btn>
        </div>
        <v-divider></v-divider>
        <div class="task-name">{{ task.title }}</div>
        <div>until {{ task.dueDate }}</div>
        <small class="task-subject">{{ subjectName }}</small>
        <!--<div>{{ task.description }}</div>-->
        <div>{{ task.pointsPerSubmission }} Points</div>

        <!-- Done Button -->
        <v-btn class="btn-done" @click="onDone(task)">
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
