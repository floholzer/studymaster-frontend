<template>
    <v-container class="about">
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title>About Us</v-card-title>
                    <v-card-text>
                        <p>We are a team of passionate developers dedicated to building high-quality web applications.</p>
                        <p>Our mission is to deliver exceptional software solutions that meet the needs of our clients.</p>
                        <v-divider></v-divider>
                        <v-list>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>Our Values</v-list-item-title>
                                    <v-list-item-subtitle>Integrity, Innovation, and Excellence</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>Contact Us</v-list-item-title>
                                    <v-list-item-subtitle>Email: contact@ourcompany.com</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
    name: 'AboutView',
});
</script>

<style>
@media (min-width: 1024px) {
    .about {
        display: flex;
        align-items: center;
    }
}
</style>
