<template>
    <div>
    <Header />
    <RegisterModal />
    <!-- <Toaster message="Hello, World!" :duration="500000" :type="'pending'" /> -->

        <div>
            <div  v-if="slideIndex == 0" class="animate-fade-left">
                <img class="object-cover w-full max-h-[1080px]" v-bind:src="data.images[0]" alt="Home Page Image">
            </div>
            <div v-if="slideIndex == 1" class="animate-fade-left">
                <img  class="object-cover w-full max-h-[1080px]" v-bind:src="data.images[1]" alt="Home Page Image">
            </div>

            <div class=" top-1/3 left-10 border-2 p-20 pb-52 grid bg-white">
                <p class=" text-orange-600 text-4xl font-serif">Ne jemi të përkushtuar t'ju sjellim gjumin <br> më të mirë të jetës suaj.</p>
                <router-link to="/shop" class="text-white text-4xl font-serif border-2 rounded-sm bg-orange-600 p-1 m-auto">Bleni tani!</router-link>
            </div>
        </div>
        <!----Discount products-->
        <div class="my-8 md:mx-20">
            <h1 class="text-left text-4xl font-light">Përfito nga zbritja...</h1>
            <hr class="h-3 w-1/2 my-4 bg-green-900 border-0 rounded-full md:my-10 dark:bg-green-900">
        </div>
        <div v-if="loading" class="flex justify-center items-center w-full h-64">
            <div class="h-screen bg-white">
                <div class="flex justify-center items-center h-full">
                  <img class="h-16 w-16" src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif" alt="">
                </div>
            </div>
        </div>
        <div v-else class="my-8 md:mx-20 gap-32 grid grid-cols-1 md:grid-cols-2  items-center justify-items-center">
            <Card v-for="listProduct in productList" :key="listProduct.id" :card-data="listProduct"/>
        </div>

        <div class="p-5 mb-32 w-full text-center">
            <router-link to="/shop" class="text-3xl !text-black hover:underline font-light">SHIKONI TË GJITHA PRODUKTET ></router-link>
        </div>
        
    <SecondBanner /> 
    <BannerBox />
    <BackToTop />
    <Map />
    <ContactUs />
    <CookieAcceptDecline />
    <Footer />
</div>

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
import Header from "../components/Header.vue"
import HeaderUp from "../components/HeaderUp.vue"
import RegisterModal from "../components/RegisterModal.vue"
import Card from "../components/parts/Card.vue"
import SecondBanner from "../components/SecondBanner.vue"
import Toaster from "../components/Toaster.vue"
import BannerBox from "../components/BannerBox.vue"
import BackToTop from "../components/BackToTop.vue"
import Map from "../components/Map.vue"
import CookieAcceptDecline from "../components/CookieAcceptDecline .vue"
import ContactUs from "./ContactUs.vue"
import { mapActions, mapGetters } from 'vuex';

export default{
    data(){
        return{
            slideIndex: 0,
            count: 0,
            active: 1,
            data:{
                images:[
                    "../src/assets/image/pexels-freemockupsorg-775219.jpg",
                    "../src/assets/image/secondbannerbg.jpg"
                ]
            },
            loading: true
        }
    },
    components:{
        Footer,
        Header,
        HeaderUp,
        RegisterModal,
        Card,
        SecondBanner,
        Toaster,
        BannerBox,
        BackToTop,
        Map,
        CookieAcceptDecline,
        ContactUs
        
    },
    computed: {
      ...mapGetters(['listDiscountProduct']),
      productList() {
        return this.listDiscountProduct;
      },

    },
    mounted() {
      this.listDiscountProducts().then(()=>{
        this.loading = false;
      })
      setInterval(() => {
        this.slideIndex = (this.slideIndex + 1) % this.data.images.length;
    }, 6000);
    },
    methods: {
      ...mapActions(['listDiscountProducts']),
    },

}
</script>
