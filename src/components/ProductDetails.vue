<template>
    <Header />
    <div class="parallax w-full min-h-[1700px] bg-fixed bg-center flex flex-wrap">
    <div class="mt-[280px] grid md:grid-cols-2 w-full mb-[280px] bg-white">
      <Breadcrumbs class="col-span-2 pt-5 px-24 text-xl font-light"/>
        <div class="px-24">
            <h1 class="animate-fade-right text-center text-6xl font-light py-10">{{ product.title }}</h1>
            <p class="text-2xl font-light animate-fade-left mt-10">{{ product.content }}</p>
        </div>
        <div class="py-5">
            <img class="max-w-[900px] duration-300 hover:shadow-2xl hover:scale-110 max-h-[900px]" :src="product.post_image" />
        </div>
    </div>
    </div>
    <Footer />
  </template>
  
  <script>
  import Header from './Header.vue';
  import Footer from './Footer.vue';
  import Breadcrumbs from './Breadcrumbs.vue';
  export default {
    name: 'ProductDetails',
    data() {
      return {
        product: {},
      };
    },
    components:{
        Header,
        Footer,
        Breadcrumbs
    },
    mounted() {
        window.scrollTo(0, 0);
        // Fetch the details of the selected product
        const productId = this.$route.params.id;
        console.log(productId)
        fetch(`https://api.luliflex.com/wp-json/custom/v1/post/${productId}`)
            .then(response => response.json())
            .then(data => {
              console.log(data)
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