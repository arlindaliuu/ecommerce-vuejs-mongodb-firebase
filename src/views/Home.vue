<template>
    <div>
        <h2>Home</h2>
        <p>Meso me shume</p>
    </div>
    <Footer />
</template>


<style scoped>
body{
    background-color: rebeccapurple;
    
}
h2{
    color:red;
}
</style>
<script>
import Footer from "../components/Footer.vue"
export default{
    components:{
        Footer
    }
    
}
</script>