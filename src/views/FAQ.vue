<template>
    <Header :class="'bg-orange-600/30'"/>
    <FAQComponent />
    <Footer />
  </template>
  
  <script>
  import Footer from '../components/Footer.vue';
  import Header from '../components/Header.vue';
  import FAQComponent from '../components/FAQComponent.vue';

  export default {
        components:{
            Header,
            Footer,
            FAQComponent
        }
    }
   
  </script>
  