<template>
  <div class="relative">
    <div v-if="loading" class="flex justify-center items-center w-full h-96 pt-40">
        <div class="h-auto bg-white">
            <div class="flex flex-col justify-center items-center h-full">
              <img class="h-16 w-16" src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif" alt="">
              Po mbingarkohet
            </div>
        </div>
    </div>
    <div v-else class="slider relative" v-touch:swipe.left="swipeLeft" v-touch:swipe.right="swipeRight">
      <div class="slider-container">
        <div
          class="slider-item duration-500 relative"
          v-for="(item, index) in items"
          :key="index"
          :class="[animate, { active: index === currentIndex }]" >
          <img :src="item" alt="Slider Image" />
        </div>
      </div>
      <div class="slider-controls flex absolute bottom-1 left-1/2 transform -translate-x-1/2">
        <button @click="prevSlide" class="slider-arrow text-white backdrop-blur-md bg-beige-100/30 hover:scale-105 duration-150 ease-in hover:bg-orange-600 left-arrow">&#129028;</button>
        <button @click="nextSlide" class="slider-arrow text-white backdrop-blur-md bg-beige-100/30 hover:scale-105 duration-150 ease-in hover:bg-orange-600 right-arrow">&#129030;</button>
      </div>
    </div>
        <div class="absolute bg-beige-100/40 top-1/2 lg:w-1/3 transform -translate-y-1/2 lg:left-10 p-6 mx-4">
            <div class="w-full h-full bg-beige-100/50 px-4 py-16 flex flex-col hover:bg-beige-100/40 duration-300 hover:scale-105">
              <h1 class="text-bold text-xl lg:text-3xl text-gray-700">Mirësevini në <span class="text-orange-600">LULIflex</span>,</h1>
              <br>
                <span class="text-left text-base lg:text-lg font-medium text-gray-700">
                destinacioni juaj i fundit për dyshek më të cilin mund të merrni pjesë në botimin e komfortit dhe rinovimit të pamatuar.
                Kërkoni një botë të pa-përshkallur komoditeti dhe rinovimit, ndërsa eksploroni seleksionin tonë të kujdesshëm të zgjedhur më hir të Zotit të dyshekeve të shkëlqyera. Qoftë se kerkoni gjumën e pefërmë të përditshme apo po përmirësoni dhomen tuaj, në në keni dyshekun e përfekt dhënë juve.
                Hedhuni në një botë cilësie, luksoze dhe netë rehatshme me ne!
                </span>
            </div>
        </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

    export default {
        data() {
            return {
            items: [],
            currentIndex: 0,
            intervalId: null,
            animate: "",
            loading: true,
            };
        },
        computed: {
          ...mapGetters(['listAboutContent']),  // Map the correct getter
          productList() {
            return this.listAboutContent;  // Use the getter to access the data
          },
        },
        methods: {
        nextSlide() {
            this.currentIndex = (this.currentIndex + 1) % this.items.length;
            this.animate = "animate-fade-left"
        },
        prevSlide() {
            this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
            this.animate = "animate-fade-right"
        },
        startAutoSlide() {
            this.intervalId = setInterval(this.nextSlide, 8000); // Change slide every 5 seconds
        },
        swipeLeft(iitem) {		
            this.nextSlide();
        },
        swipeRight() {
            this.prevSlide();
        },
        },
        mounted() {
        this.startAutoSlide();
        },
        beforeDestroy() {
            clearInterval(this.intervalId);
        },
        created() {
          // Call the aboutContent action to fetch the data
          this.$store.dispatch('aboutContent').then(()=>{
            if(this.productList[0].slider_array.length > 0){
              this.items = this.productList[0].slider_array.map(item => item.image_field);
              this.loading = false;
            }else{
              this.loading = false;
              this.items = [
                "../../src/assets/image/pexels-freemockupsorg-775219.jpg",
                "../../src/assets/image/secondbannerbg.jpg",
              ]
            }
          })
        },
    };
</script>
<style scoped>
.slider {
  margin: 0 auto;
  position: relative;
}

.slider-container {
  display: flex;
  overflow: hidden;
}

.slider-item {
  flex: 1;
  min-width: 100%;
  text-align: center;
  transition: transform 0.3s;
  display: none;
}

.slider-item.active {
  transform: translateX(0);
  display: block;
}

/* Add styles for the images */
.slider-item img {
  width: 100%;
  min-height: 800px;
  max-height: 800px;
  object-fit: cover;
}

.slider-arrow {
  border: none;
  padding: 10px 15px;
  margin: 0 5px;
  cursor: pointer;
}
</style>
