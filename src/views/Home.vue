<template>
    <div>
    <Header />
    <RegisterModal />
        <div class="">
            <img class="object-contain w-full" src="../../dist/images/pexels-freemockupsorg-775219.jpg" alt="Home Page Image">
            <div class=" top-1/3 left-10 border-2 p-20 pb-52 grid bg-white">
                <p class=" text-orange-600 text-4xl font-serif">Ne jemi të përkushtuar t'ju sjellim gjumin <br> më të mirë të jetës suaj.</p>
                <button class="text-white text-4xl font-serif border-2 rounded-sm bg-orange-600 p-1 m-auto">Bleni tani!</button>
            </div>
        </div>
        <div class="mt-4 p-5 grid grid-cols-3 items-center justify-items-center">
            <Card :card-data="cardData"  />

        </div>
    
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
export default{
    data() {
        return {
            cardData:{
                dysheku: {
                name: 'John Doe',
                email: 'john.doe@example.com',
                age: 30,
                }
            }
        }
    },
    components:{
        Footer,
        Header,
        HeaderUp,
        RegisterModal,
        Carousel,
        Card
        
    },
}
</script>