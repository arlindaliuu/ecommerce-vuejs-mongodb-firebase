<template>
    <div class="my-8 mx-6 lg:mx-auto max-w-5xl">
      <p class="text-left text-lg lg:text-3xl font-light">Përfito nga zbritja...</p>
      <hr class="h-1 lg:h-3 w-1/2 my-4 bg-green-900 border-0 rounded-full md:my-10 dark:bg-green-900">
    </div>
    <div v-if="loading" class="flex justify-center items-center w-full h-64">
      <div class="h-auto bg-white">
        <div class="flex justify-center items-center h-full">
          <img class="h-16 w-16" src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif" alt="">
        </div>
      </div>
    </div>
    <div v-else class="my-8 mx-6 lg:mx-auto max-w-5xl">
      <div class="overflow-hidden">
        <div class="slider-container grid justify-center" :style="`transform: translateX(${sliderPosition}px)`">
        <transition-group name="slide" tag="div" class="slider lg:flex justify-between gap-10">
          <Card v-for="(listProduct, index) in displayedProducts" :key="listProduct.id" :card-data="listProduct" />
        </transition-group>        
        </div>
      </div>
    </div>
    <div class="p-5 mb-32 w-full text-center">
      <router-link to="/shop" class="text-3xl !text-black hover:underline font-light">SHIKONI TË GJITHA PRODUKTET ></router-link>
    </div>
  </template>
  
  <script>
  import { mapActions, mapGetters } from 'vuex';
  import Card from './parts/Card.vue';
  import router from './../router';
  
  export default {
    data() {
      return {
        loading: true,
        currentIndex: 0,
      };
    },
    components: {
      Card,
    },
    computed: {
      ...mapGetters(['listProduct']),
      displayedProducts() {
        const allProducts = this.listProduct;
        const numProducts = allProducts.length;
  
        if (numProducts <= 3) {
          return allProducts;
        } else {
          return [
            allProducts[(this.currentIndex + numProducts - 1) % numProducts],
            allProducts[this.currentIndex % numProducts],
            allProducts[(this.currentIndex + 1) % numProducts],
          ];
        }
      },
    },
    mounted() {
      window.scrollTo(0, 0);
      
      this.listProducts().then(() => {
        this.loading = false;
        this.startSlider();
         // Check screen width and hide cards if it's a mobile screen
         setTimeout(() => {
        if (window.innerWidth <= 1024) {
          const cards = document.getElementsByClassName('card-main');
          if (cards.length >= 3) {
            cards[1].style.display = "none";
            cards[2].style.display = "none";
          }
        }
      }, 100);
      });
    },
    methods: {
      ...mapActions(['listProducts']),
      navigateToProduct(id) {
        router.push({ name: 'ProductDetails', params: { id: id } });
      },
      startSlider() {
        const numProducts = this.listProduct.length;
        if (numProducts > 3) {
          setInterval(() => {
            if (window.innerWidth <= 1024) {
              const cards = document.getElementsByClassName('card-main');
              if (cards.length >= 3) {
                cards[1].style.display = "none";
                cards[2].style.display = "none";
              }
            }
            
            // Update the card index outside of the mobile screen condition
            this.currentIndex = (this.currentIndex + 1) % numProducts;
          }, 5000); // Adjust the interval as needed
        }
      },
    },
  };
  </script>
  
  <style scoped>
/* Add some CSS to style the slider container */
.slider-container {
  overflow: hidden;
  position: relative;
  width: 100%;
}
/* Style for the slider */
.slider {
  transition: transform 0.5s ease-in-out; /* Adjust the transition duration for slide speed */
}
  /* Modify the transition properties for sliding left */
  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.5s;
  }
  .slide-enter, .slide-leave-to /* .slide-leave-active in <2.1.8 */ {
    opacity: 0;
    transform: translateX(-100%); /* Slide left */
  }
  
</style>