<template>
    <back-to-top   bottom="50px" right="50px" >        
         <button  type="button" class="btn btn-info rounded-full btn-to-top bg-green-900 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
            <img class="object-scale-down h-9  w-9" src="../../dist/images/up-arrow.png" alt="arrowup">
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

  