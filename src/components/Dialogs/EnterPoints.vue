<template>
    <v-dialog v-model="dialog" max-width="500px">
        <v-card>
            <v-card-title>
                <span class="headline">Enter Reached Points</span>
            </v-card-title>

            <v-card-text>
                <v-form ref="form" v-model="valid">
                    <v-text-field
                        v-model="reachedPoints"
                        label="Reached Points"
                        type="number"
                        :rules="[v => v >= 0 || 'Points must be positive']"
                        required
                    ></v-text-field>
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
        taskId: {
            type: [String, Number],
            required: true,
        },
    },
    data() {
        return {
            dialog: true,
            valid: false,
            reachedPoints: null,
        };
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
                    taskId: this.taskId,
                    reachedPoints: this.reachedPoints,
                });
            }
        },
    },
};
</script>

<style scoped>
</style>
