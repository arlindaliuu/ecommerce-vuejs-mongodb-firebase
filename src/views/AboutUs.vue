<template>
    <Header />
    <div>
        <h2>AboutUs</h2>
        <p>Meso me shume</p>
    </div>
    <Footer />
</template>

<style scoped>
body{
    background-color: red;
}
</style>
<script>
import Footer from "../components/Footer.vue"
import Header from "../components/Header.vue"
export default{
    components:{
        Footer,
        Header
    },
}
</script>

