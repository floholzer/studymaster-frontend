<template>
    <div class="d-flex flex-column align-center justify-center fill-height">
        <v-container class="text-center">
            <v-row>
                <v-col>
                    <v-img src="src/assets/StudyMaster_Logo_big.jpeg" max-height="400" contain></v-img>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <h1>Welcome to StudyMaster</h1>
                    <p>Your journey to mastering your studies starts here</p>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn rounded="xl" color="#F87A53" variant="elevated" @click="this.$router.push('/signup')"
                           class="my-4"
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
export default {
    name: 'HomeView',
};
</script>

<style scoped>
.fill-height {
    height: 100vh;
}
</style>