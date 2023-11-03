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
        <button aria-label="Prev Slide" @click="prevSlide" class="slider-arrow text-white backdrop-blur-md bg-beige-100/30 hover:scale-105 duration-150 ease-in hover:bg-orange-600 left-arrow">
          <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 11.25C20.4142 11.25 20.75 11.5858 20.75 12C20.75 12.4142 20.4142 12.75 20 12.75H10.75L10.75 18C10.75 18.3034 10.5673 18.5768 10.287 18.6929C10.0068 18.809 9.68417 18.7449 9.46967 18.5304L3.46967 12.5304C3.32902 12.3897 3.25 12.1989 3.25 12C3.25 11.8011 3.32902 11.6103 3.46967 11.4697L9.46967 5.46969C9.68417 5.25519 10.0068 5.19103 10.287 5.30711C10.5673 5.4232 10.75 5.69668 10.75 6.00002L10.75 11.25H20Z" fill="#1C274C"/>
          </svg>
        </button>
        <button aria-label="Next Slide" @click="nextSlide" class="slider-arrow text-white backdrop-blur-md bg-beige-100/30 hover:scale-105 duration-150 ease-in hover:bg-orange-600 right-arrow">
          <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M3.25 12C3.25 11.5858 3.58579 11.25 4 11.25H13.25V12.75H4C3.58579 12.75 3.25 12.4142 3.25 12Z" fill="#1C274C"/>
            <path d="M13.25 12.75V18C13.25 18.3034 13.4327 18.5768 13.713 18.6929C13.9932 18.809 14.3158 18.7449 14.5303 18.5304L20.5303 12.5304C20.671 12.3897 20.75 12.1989 20.75 12C20.75 11.8011 20.671 11.6103 20.5303 11.4697L14.5303 5.46969C14.3158 5.25519 13.9932 5.19103 13.713 5.30711C13.4327 5.4232 13.25 5.69668 13.25 6.00002V11.25V12.75Z" fill="#1C274C"/>
          </svg>
        </button>
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
