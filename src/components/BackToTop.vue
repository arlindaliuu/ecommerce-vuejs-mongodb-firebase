<template>
    <back-to-top bottom="58px" right="20px" >        
         <button type="button" class="btn drop-shadow-2xl w-9 border h-9 btn-info shadow-2xl btn-to-top bg-beige-100 hover:bg-darkblue-100 text-white font-bold p-3 hover:scale-105 duration-300 rounded-t-full">
            <img class="object-scale-down" src="../assets/icons/up-arrow.png" alt="arrowup">
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

