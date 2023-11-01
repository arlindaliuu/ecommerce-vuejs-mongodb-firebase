<template>
    <div>
    <Header />
    <RegisterModal />
    <!-- <Toaster message="Hello, World!" :duration="500000" :type="'pending'" /> -->
        <div v-if="pageIsLoaded" class="bg-beige-100 w-full h-full fixed z-50 top-0 left-0 overflow-clip flex justify-center items-center text-2xl">
           <div class="h-auto">
            <div class="flex flex-col justify-center items-center h-full">
              <img class="h-16 w-16 animate-spin animate-infinite animate-reverse" src="../assets/icons/spinner.png" alt="Spinner gif">
              Po mbingarkohet...
            </div>
        </div>
        </div>
        <Slider />
        <ListProducts />
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
        <div class="absolute inset-0 bg-orange-600 opacity-50 bg-cover bg-no-repeat -rotate-3">
          <img class="w-full" src="../assets/image/offer-bg.webp" />
        </div>
        <div class="max-w-5xl mx-6 lg:mx-auto grid items-center">
            <p class="relative text-white text-4xl font-serif">Ne jemi të përkushtuar t'ju sjellim gjumin <br> më të mirë të jetës suaj.</p>
            <router-link to="/shop" class="hover:px-10 h over:text-white hover:border-white hover:bg-main duration-200 relative text-green-900 text-2xl mt-6 font-serif border-2 rounded-full px-6 bg-white py-2 border-green-900 m-auto">Bleni tani!</router-link>
        </div>
    </div>
    <!-- <BackToTop /> -->
    <Map />
    <FAQComponent />
    <ContactForm />
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
import CookieAcceptDecline from "../components/CookieAcceptDecline.vue"
import ContactUs from "./ContactUs.vue"
import { mapActions, mapGetters } from 'vuex';
import { parse, differenceInSeconds } from 'date-fns';
import router from './../router'
import Slider from "../components/Slider.vue"
import ListProducts from "../components/ListProducts.vue"
import ContactForm from "../components/ContactForm.vue"
import FAQComponent from '../components/FAQComponent.vue';


export default{
    data(){
        return{
            showModal: true,
            slideIndex: 0,
            count: 0,
            active: 1,
            loading: true,
            formattedCountdownVariable: "",
            addValidity: false,
            pageIsLoaded: true,
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
        ContactForm,
        Slider,
        ListProducts,
        FAQComponent,
        Image
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
      window.scrollTo(0, 0);

      this.listDiscountProducts().then(()=>{
        this.loading = false;
      })

      this.listProducts().then(() => {
            this.loading = false;
            this.pageIsLoaded = false;
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
    created() {
      // Call the aboutContent action to fetch the data
      this.$store.dispatch('aboutContent').then(() => {
        // Data is now available, and the Footer component will receive it
      });
      },
}
</script>
