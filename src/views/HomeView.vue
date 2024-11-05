<template>
    <div v-if="isLoggedIn">
        <Tasklist/>
    </div>
    <div v-else class="d-flex flex-column align-center justify-center fill-height">
        <v-container class="text-center">
            <v-row>
                <v-col>
                    <h1>Welcome to StudyMaster</h1>
                    <p>Your journey to mastering your studies starts here</p>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn rounded="xl" color="#F87A53" variant="elevated" @click="$emit('open-login')" class="my-4"
                           size="x-large">
                        Get Started
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
        <v-spacer></v-spacer>
    </div>
</template>

<script>
import {defineComponent} from 'vue';
import Tasklist from '@/components/Tasklist.vue';

export default defineComponent({
    name: 'HomeView',
    components: {
        Tasklist
    },
    props: {
        isLoggedIn: {
            type: Boolean,
            required: true
        }
    }
});
</script>

<style scoped>
.fill-height {
    height: 100vh;
}
</style>