<template>
    <v-footer class="footer" color="#182426">
        <v-row justify="center" no-gutters>
            <router-link>

            </router-link>
            <v-btn v-for="link in links" :href="link.href" :key="link" class="mx-2" color="#D9A79C" rounded="xl"
                   variant="text">
                {{ link.text }}
            </v-btn>
            <v-col class="text-center mt-2" id="footer-text" cols="12">
                {{ new Date().getFullYear() }} — <strong>StudyMaster</strong>
            </v-col>
        </v-row>
    </v-footer>
</template>
<script>
export default {
    name: 'Footer',
    data: () => ({
        links: [
            {
                text: 'Home',
                href: '/'
            },
            {
                text: 'About',
                href: '/about'
            },
            {
                text: 'Contact',
                href: '/contact'
            },
            {
                text: 'Privacy Policy',
                href: '/privacy'
            }
        ],
    })
};
</script>

<style scoped>
.footer {
    bottom: 0;
    width: 100%;
    height: 50px; /* Definiert die Höhe des Footers */
    padding: 0; /* Entfernt unnötiges Padding */
    display: flex; /* Flexbox verwenden, um Inhalte zu zentrieren */
    justify-content: center; /* Inhalte horizontal zentrieren */
    align-items: center; /* Inhalte vertikal zentrieren */
}

#footer-text {
    color: #D9A79C;
}
</style>