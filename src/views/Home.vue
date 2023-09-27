<template>
    <div>
    <Header />
    <RegisterModal />
    <!-- <Toaster message="Hello, World!" :duration="500000" :type="'pending'" /> -->

        <Slider />
        <!----Discount products-->
        <div class="my-8 mx-6 md:mx-auto max-w-5xl">
            <h1 class="text-left text-4xl font-light">Përfito nga zbritja...</h1>
            <hr class="h-3 w-1/2 my-4 bg-green-900 border-0 rounded-full md:my-10 dark:bg-green-900">
        </div>
        <div v-if="loading" class="flex justify-center items-center w-full h-64">
            <div class="h-auto bg-white">
                <div class="flex justify-center items-center h-full">
                  <img class="h-16 w-16" src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif" alt="">
                </div>
            </div>
        </div>
        <div v-else class="my-8 mx-6 md:mx-auto max-w-5xl gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-items-center">
            <Card v-for="listProduct in productList" :key="listProduct.id" :card-data="listProduct"/>
        </div>

        <div class="p-5 mb-32 w-full text-center">
            <router-link to="/shop" class="text-3xl !text-black hover:underline font-light">SHIKONI TË GJITHA PRODUKTET ></router-link>
        </div>
        <div v-if="addValidity && showModal">
  <div v-for="productWithCountdown in formattedCountdownForProduct" :key="productWithCountdown.id">
    <div v-if="productWithCountdown?.offer" class="fixed inset-0 flex items-center justify-center z-50">
      <!-- Modal Background -->
      <div class="fixed inset-0 bg-black opacity-50" @click="closeModal"></div>
      <div class="bg-white shadow-lg z-20 flex flex-col lg:grid lg:grid-cols-2 animate-fade-down min-h-[400px] w-2/3 md:w-1/2 lg:w-2/4">
        <div class="relative">
          <img src="../assets/image/bg-countdown.jpg" class="w-full h-64 sm:h-full" />
          <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full flex-col gap-4 sm:gap-10 block">
            <p class="text-xs sm:text-xl text-white font-semibold uppercase">Përfitoni ofertën deri në <span class="text-2xl sm:text-4xl font-bold text-darkgreen-100">20%</span> zbritje</p>
            <p class="text-sm sm:text-lg flex justify-center gap-1" v-html="formattedCountdownVariable"></p>
            <a @click="navigateToProduct(productWithCountdown.id)" class="mt-4 mx-4 rounded-full px-6 py-2 bg-white block text-sm sm:text-lg self-center text-pink-100 hover:text-white hover:bg-darkgreen-100 cursor-pointer hover:scale-105 duration-300">Blej tani</a>
          </div>
          <button @click="closeModal" class="text-red absolute flex lg:hidden justify-center items-center -top-4 -right-1 rounded-full p-1 w-6 h-6 bg-white"> &cross;</button>
        </div>
        <div class="relative">
          <img :src="productWithCountdown.post_image" alt="Image Add" class="w-full h-[300px] lg:h-full" />
          <button @click="closeModal" class="text-red absolute justify-center items-center -top-4 -right-1 rounded-full p-1 w-6 h-6 bg-white lg:flex hidden"> &cross;</button>
        </div>
      </div>
    </div>
  </div>
</div>


    <SecondBanner /> 
    <BannerBox />
    <div class="top-1/3 border-2 p-20 pb-52 grid bg-orange-600 overflow-hidden relative">
        <div class="absolute inset-0 bg-orange-600 opacity-50 bg-cover bg-no-repeat -rotate-3" style="background-image: url('../src/assets/image/offer-bg.webp');"></div>
        <div class="max-w-5xl mx-6 lg:mx-auto grid items-center">
            <p class="relative text-orange-600 text-4xl font-serif">Ne jemi të përkushtuar t'ju sjellim gjumin <br> më të mirë të jetës suaj.</p>
            <router-link to="/shop" class="relative text-white text-4xl mt-6 font-serif border-2 rounded-sm bg-orange-600 p-1 m-auto">Bleni tani!</router-link>
        </div>
    </div>
    <!-- <BackToTop /> -->
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
import { parse, differenceInSeconds } from 'date-fns';
import router from './../router'
import Slider from "../components/Slider.vue"

export default{
    data(){
        return{
            showModal: true,
            slideIndex: 0,
            count: 0,
            active: 1,
            loading: true,
            formattedCountdownVariable: "",
            addValidity: false
        }
    },
    components:{
        Footer,
        Header,
        RegisterModal,
        Card,
        SecondBanner,
        Toaster,
        BannerBox,
        BackToTop,
        Map,
        CookieAcceptDecline,
        ContactUs,
        Slider
        
    },
    computed: {
      ...mapGetters(['listDiscountProduct']),
      productList() {
        return this.listDiscountProduct;
      },
      ...mapGetters(['listProduct']),
        productListAll() {
        return this.listProduct;
      },
      formattedCountdownForProduct() {
        return this.productListAll.map(product => ({
            ...product,
            formattedCountdown: this.formatCountdown(product.countdown),
        }));
        },
    },
    mounted() {
      this.listDiscountProducts().then(()=>{
        this.loading = false;
      })

      this.listProducts().then(() => {
            this.loading = false;
      });
    setInterval(this.updateCountdownVariable, 1000);
    },
    methods: {
      ...mapActions(['listDiscountProducts']),
      ...mapActions(['listProducts']),
      navigateToProduct(id) {
      router.push({ name: 'ProductDetails', params: { id: id } });
      },
      //Close modal
      closeModal(){
        this.showModal = false
      },
      formatCountdown(dateString) {
        const targetTime = parse(dateString, 'dd/MM/yyyy', new Date());

        if (targetTime) {
            const now = new Date();
            const timeDifference = targetTime - now;
            this.addValidity = true;

            if (timeDifference > 0) {
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            const formattedCountdown = `<div class="xl:p-2 p-1 flex flex-col bg-white shadow-lg rounded-lg"><span class="text-pink-100 text-xs lg:text-xl">days</span><span class="text-darkgreen-100 font-bold text-xs lg:text-2xl">${days}</span></div> 
            <div class="xl:p-2 p-1 flex flex-col bg-white shadow-lg rounded-lg"><span class="text-pink-100 text-xs lg:text-xl">hours</span><span class="text-darkgreen-100 font-bold text-xs lg:text-2xl">${hours}</span></div>
            <div class="xl:p-2 p-1 flex flex-col bg-white shadow-lg rounded-lg"><span class="text-pink-100 text-xs lg:text-xl">minutes</span> <span class="text-darkgreen-100 font-bold text-xs lg:text-2xl"> ${minutes}</span></div>
            <div class="xl:p-2 p-1 flex flex-col bg-white shadow-lg rounded-lg"><span class="text-pink-100 text-xs lg:text-xl">seconds</span> <span class="text-darkgreen-100 font-bold text-xs lg:text-2xl">${seconds}</span></div>`;
            this.formattedCountdownVariable = formattedCountdown;
            }else{
                this.addValidity = false
            }
        }
        return ''; // Invalid date or countdown has expired
    },

    updateCountdownVariable() {
        const formattedCountdownVariables = this.productListAll
        .map((product) => {
            const formattedCountdown = product.countdown != null ? this.formatCountdown(product.countdown) : null;

            return {
            ...product,
            formattedCountdown,
            };
        })
        .filter((product) => product.formattedCountdown !== null);
        },
    },
}
</script>
