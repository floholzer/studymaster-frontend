<template>
    <v-dialog v-model="showDialog" max-width="500px">
        <v-card>
            <v-card-title class="headline">Edit Task</v-card-title>
            <v-card-text>
                <v-form ref="form">
                    <v-text-field
                        v-model="editedTask.title"
                        label="Task Name"
                        :rules="[v => !!v || 'Name is required']"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="editedTask.description"
                        label="Description"
                    ></v-text-field>

                    <v-select
                        v-model="editedTask.subjectId"
                        :items="formattedSubjects"
                        item-text="title"
                        item-value="id"
                        label="Subject"
                        :rules="[v => !!v || 'Subject is required']"
                        required
                    ></v-select>

                    <v-text-field
                        v-model="formattedDate"
                        label="Due Date"
                        type="date"
                        :rules="[v => !!v || 'Date is required']"
                        required
                    ></v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" @click="save">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const props = defineProps({
    taskData: {
        type: Object,
        required: true
    },
    show: {
        type: Boolean,
        required: true
    }
})
const emit = defineEmits(['close', 'save'])

const editedTask = ref({
    ...props.taskData,
    dueDate: props.taskData.dueDate ? new Date(props.taskData.dueDate).toISOString().split('T')[0] : ''
})

const formattedDate = computed({
    get: () => editedTask.value.dueDate,
    set: (value) => editedTask.value.dueDate = value
})

const formattedSubjects = computed(() => {
    return store.getters.getSubjects.map(subject => ({
        id: subject.id,
        title: subject.name
    }))
})

watch(() => props.taskData, (newVal) => {
    editedTask.value = {
        ...newVal,
        dueDate: newVal.dueDate ? new Date(newVal.dueDate).toISOString().split('T')[0] : ''
    }
})

const showDialog = computed({
    get: () => props.show,
    set: (value) => !value && emit('close')
})

const save = () => {
    if (editedTask.value.title && editedTask.value.subjectId && editedTask.value.dueDate) {
        emit('save', {
            ...editedTask.value,
            dueDate: new Date(editedTask.value.dueDate).toISOString()
        })
        emit('close')
    }
}

const close = () => {
    emit('close')
}
</script>