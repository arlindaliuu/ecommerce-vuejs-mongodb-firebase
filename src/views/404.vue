<template>
    <Header/>
    <div class="bg-white m-auto w-full h-full grid grid-cols-1 justify-center p-32  space-y-2">
        <h1 class="w-full text-center text-[200px] font-extrabold">Oops!</h1>
        <h3 class="w-full text-center text-xl font-bold">Faqja nuk u gjet</h3>
        <p class="text-center">Faqja qe po kërkoni mund të jetë fshirë, t'i jetë ndërruar emri apo të jetë e padisponueshme për momentin</p>
        
        <router-link to="/" class="bg-green-900 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full w-32 justify-self-center text-center">KTHEHU</router-link>
    </div>
</template>
<script>
import Header from "../components/Header.vue"
    export default{
        components:{
            Header
        }
    }
</script>
   
<style scoped>
h1 {

    background-image: url('../assets/icons/Oopsstyle.png');
    background-clip: text;
    -webkit-background-clip: text;
  color: transparent;
  }
</style>