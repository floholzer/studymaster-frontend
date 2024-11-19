<template>
    <div class="d-flex flex-column align-center justify-center fill-height" style="background-color: #1F2A3A">
        <v-container class="text-center">
            <v-row>
                <v-col cols="12">
                    <v-img src="src/assets/StudyMaster_Logo_big.jpeg" max-height="300" contain></v-img>
                </v-col>
            </v-row>

            <v-row class="mt-6">
                <v-col>
                    <v-card class="pa-6" elevation="3" color="rgba(255, 255, 255, 0.9)">
                        <h1 class="display-1 mb-4">Welcome to StudyMaster</h1>
                        <p class="subtitle-1 mb-4">Your journey to mastering your studies starts here. Empower your learning with our comprehensive tools and resources.</p>
                        <p class="body-1 mb-4">
                            Explore a platform designed to streamline your study habits, boost your productivity, and keep you motivated throughout your learning experience.
                        </p>
                        <v-btn rounded="xl" color="#F87A53" variant="elevated" @click="this.$router.push('/signup')"
                               class="my-4"
                               size="x-large">
                            Get Started
                        </v-btn>
                    </v-card>
                </v-col>
            </v-row>

            <v-row class="mt-6">
                <v-col cols="12">
                    <v-divider></v-divider>
                </v-col>
            </v-row>

            <v-row class="mt-4">
                <v-col cols="12">
                    <h2 class="mt-6 mb-4">Why StudyMaster?</h2>
                    <v-row justify="space-evenly">
                        <v-col cols="12" md="4" class="text-center">
                            <v-icon large color="#F87A53">mdi-book-open-page-variant</v-icon>
                            <h3 class="headline mt-2">Extensive Resources</h3>
                            <p>Access a wide range of study materials tailored for your learning needs.</p>
                        </v-col>
                        <v-col cols="12" md="4" class="text-center">
                            <v-icon large color="#F87A53">mdi-calendar-check</v-icon>
                            <h3 class="headline mt-2">Organized Planning</h3>
                            <p>Stay on track with built-in planners and reminders that help manage your time effectively.</p>
                        </v-col>
                        <v-col cols="12" md="4" class="text-center">
                            <v-icon large color="#F87A53">mdi-chart-line</v-icon>
                            <h3 class="headline mt-2">Track Your Progress</h3>
                            <p>Visualize your achievements and keep motivated by monitoring your growth over time.</p>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    name: 'HomeView',
};
</script>

<style scoped>
.fill-height {
    min-height: 100vh;
}
.v-card {
    border-radius: 16px;
}
</style>