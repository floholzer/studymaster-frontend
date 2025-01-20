<template>
    <v-app>
        <router-view class="main-content"/>
        <Footer/>
    </v-app>
</template>

<script>
import Footer from "@/components/Footer.vue";

export default {
    name: 'App',
    components: {
        Footer,
    },
};
</script>
<style scoped>
.main-content {
    padding-top: 64px;
    padding-bottom: 84px;
}
</style>