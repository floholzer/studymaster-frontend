<template>
    <v-dialog v-model="dialog" max-width="500px">
        <v-card>
            <v-card-title>
                <span class="headline">Enter Reached Points for {{ task.title }}</span>
            </v-card-title>

            <v-card-text>
                <v-form ref="form" v-model="valid">
                    <v-text-field
                        v-model.number="pointsEarned"
                        label="Reached Points"
                        type="number"
                        :rules="[
                            v => v > 0 || 'Points must be positive',
                            v => v <= task.pointsPerSubmission || `Max ${task.pointsPerSubmission} points allowed`
                        ]"
                        :max="task.pointsPerSubmission"
                        required
                    ></v-text-field>
                    <div class="text-caption">
                        Max possible points: {{ task.pointsPerSubmission }}
                    </div>
                </v-form>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" @click="save" :disabled="!valid">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: {
        task: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            dialog: true,
            valid: false,
            pointsEarned: this.task.pointsEarned || 0
        };
    },
    watch: {
        task: {
            immediate: true,
            handler(newTask) {
                this.pointsEarned = newTask.pointsEarned || 0
            }
        }
    },
    methods: {
        close() {
            this.dialog = false;
            this.$emit('close');
        },
        save() {
            if (this.$refs.form.validate()) {
                this.dialog = false;
                this.$emit('save', {
                    task: this.task,
                    pointsEarned: Number(this.pointsEarned)
                });
            }
        }
    }
};
</script>

<style scoped>
.text-caption {
    color: #666;
    margin-top: -8px;
    margin-bottom: 16px;
}
</style>