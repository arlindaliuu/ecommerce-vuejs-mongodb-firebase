<template>
    <div>
    <Header />
    <RegisterModal />
    <!-- <Toaster message="Hello, World!" :duration="500000" :type="'pending'" /> -->

        <div>
            <img class="object-contain w-full" src="../../dist/images/pexels-freemockupsorg-775219.jpg" alt="Home Page Image">
            <div class=" top-1/3 left-10 border-2 p-20 pb-52 grid bg-white">
                <p class=" text-orange-600 text-4xl font-serif">Ne jemi të përkushtuar t'ju sjellim gjumin <br> më të mirë të jetës suaj.</p>
                <button class="text-white text-4xl font-serif border-2 rounded-sm bg-orange-600 p-1 m-auto">Bleni tani!</button>
            </div>
        </div>
        <div class="my-8  sm:mx-20 gap-5 p-5 grid sm:grid-cols-3 grid-cols-1 items-center justify-items-center">
            <Card v-for="(card, index) in cardData" :key="index" :card-data="card" />
        </div>
        
    <SecondBanner /> 
    <BannerBox />
    <BackToTop />
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
import Carousel from "../components/Carousel.vue"
import Card from "../components/parts/Card.vue"
import SecondBanner from "../components/SecondBanner.vue"
import Toaster from "../components/Toaster.vue"
import BannerBox from "../components/BannerBox.vue"
import BackToTop from "../components/BackToTop.vue"
export default{
    data() {
        return {
            cardData: [
                {
                name: 'Classic',
                email: 'john.doe@example.com',
                age: 30,
                src: '../dist/images/1.png'
                },
                {
                name: 'Deluxe',
                email: 'jane.doe@example.com',
                age: 28,
                src: '../dist/images/2.png'
                },
                {
                name: 'Deluxe Plus',
                email: 'jane.doe@example.com',
                age: 28,
                src: '../dist/images/3.png'
                },
            ],
        }
    },
    components:{
        Footer,
        Header,
        HeaderUp,
        RegisterModal,
        Carousel,
        Card,
        SecondBanner,
        Toaster,
        BannerBox,
        BackToTop
        
    },
}
</script>
