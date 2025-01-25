<template>
    <v-dialog v-model="showDialog" max-width="500px">
        <v-card>
            <v-card-title class="headline">Edit Task</v-card-title>
            <v-card-text>
                <v-form ref="form">
                    <v-text-field
                        v-model="editedTask.title"
                        label="Task Name"
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
                        required
                    ></v-select>

                    <v-text-field
                        v-model="editedTask.dueDate"
                        label="Due Date"
                        type="date"
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
import {ref, watch, computed} from 'vue'
import {useStore} from 'vuex'

const store = useStore()
const props = defineProps(['taskData', 'show'])
const emit = defineEmits(['close', 'save'])

const editedTask = ref({...props.taskData})

const formattedSubjects = computed(() => {
    return store.getters.getSubjects.map(subject => ({
        id: subject.id,
        title: `${subject.name} (${subject.ects} ECTS)`
    }))
})

watch(() => props.taskData, (newVal) => {
    editedTask.value = {...newVal}
})

const showDialog = computed({
    get: () => props.show,
    set: (value) => !value && emit('close')
})

const save = () => {
    emit('save', editedTask.value)
    emit('close')
}

const close = () => {
    emit('close')
}
</script>