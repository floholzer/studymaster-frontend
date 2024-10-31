<template>
    <Tasklist/>
</template>

<script>
import {defineComponent} from 'vue';

// Components
import Tasklist from '@/components/Tasklist.vue';


export default defineComponent({
    name: 'HomeView',
    components: {
        Tasklist // Tasklist-Komponente registrieren
    }

});
</script>
