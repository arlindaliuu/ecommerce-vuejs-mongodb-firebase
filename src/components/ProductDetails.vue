<template>
    <Header />
    <div class="parallax w-full min-h-[1700px] bg-fixed bg-center flex flex-wrap">
    <div class="mt-[280px] grid md:grid-cols-2 w-full max-h-[1000px] bg-white">
        <div class="px-24">
            <h1 class="animate-fade-right text-center text-6xl font-light py-10">{{ product.title }}</h1>
            <p class="text-2xl font-light animate-fade-left mt-10">{{ product.description }}</p>
        </div>
        <div class="py-5">
            <img class="max-w-[900px] duration-300 hover:shadow-2xl hover:scale-110 max-h-[900px]" :src="product.imageField" />
        </div>
    </div>
    </div>
    <Footer />
  </template>
  
  <script>
  import Header from './Header.vue';
  import Footer from './Footer.vue';
  export default {
    name: 'ProductDetails',
    data() {
      return {
        product: {},
      };
    },
    components:{
        Header,
        Footer
    },
    mounted() {
        window.scrollTo(0, 0);
        // Fetch the details of the selected product
        const productId = this.$route.params.id;
        console.log(productId)
        fetch(`http://localhost:3000/product/${productId}`)
            .then(response => response.json())
            .then(data => {
            this.product = data;
            })
            .catch(error => {
            console.error(error);
            });
        },
  };
  </script>
<style>
  .parallax{
    background-image: url(../assets/image/mattresimg.jpg);
  }
</style>