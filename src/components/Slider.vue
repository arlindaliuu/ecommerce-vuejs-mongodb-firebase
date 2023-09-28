<template>
    <div class="slider relative" v-touch:swipe.left="swipeLeft" v-touch:swipe.right="swipeRight">
      <div class="slider-container">
        <div
          class="slider-item duration-500"
          v-for="(item, index) in items"
          :key="index"
          :class="[animate, { active: index === currentIndex }]" >
          <img :src="item" alt="Slider Image" />
        </div>
      </div>
      <div class="slider-controls flex absolute bottom-1 left-1/2 transform -translate-x-1/2">
        <button @click="prevSlide" class="slider-arrow left-arrow">&#129028;</button>
        <button @click="nextSlide" class="slider-arrow right-arrow">&#129030;</button>
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
            }else{
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
  background-color: #333;
  color: #fff;
  border: none;
  padding: 10px 15px;
  margin: 0 5px;
  cursor: pointer;
}
</style>
