<template>
    <back-to-top bottom="50px" right="50px" >        
         <button type="button" class="btn drop-shadow-2xl btn-info shadow-2xl btn-to-top bg-green-900 hover:bg-green-700 text-white font-bold p-3 hover:scale-105 duration-300 rounded-full">
            <img class="object-scale-down w-7 h-7" src="../assets/icons/up-arrow.png" alt="arrowup">
        </button>
    </back-to-top>
</template>

  <script>
   import BackToTop from 'vue-backtotop'
   export default{
        components:{
            BackToTop
        }
   }
</script>


  