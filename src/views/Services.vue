<template>
    <Header :class="'bg-orange-600/30'" />
    <div v-if="generalDataList && generalDataList.length > 0" class="px-4 pb-10 pt-40 max-w-5xl mx-auto">
        <div v-html="generalDataList[0].services"></div>
    </div>
    <Footer />
</template>
<script>
import Footer from '../components/Footer.vue';
import Header from '../components/Header.vue';
import { mapGetters } from 'vuex';

export default {
    components: {
        Header,
        Footer
    },
    computed: {
        ...mapGetters(['listAboutContent']),  // Map the correct getter
        generalDataList() {
            return this.listAboutContent;  // Use the getter to access the data
        },
    },
    mounted(){
        window.scrollTo(0, 0);
    },
    created() {
        // Call the aboutContent action to fetch the data
        this.$store.dispatch('aboutContent');
    },
};
</script>
