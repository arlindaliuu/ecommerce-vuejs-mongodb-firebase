<template>
    <Header />
    <div :style="{ 'max-height': elementHeight + 'px' }" class="parallax w-full flex flex-wrap">
    <div ref="elementToMeasure"  class="thisElement mt-[280px] w-full mb-[100%] bg-white">
      <Breadcrumbs class="col-span-2 pt-5 px-6 lg:px-24 text-xl font-light"/>
      <div v-if="!isLoading">
        <div class="grid lg:grid-cols-2 py-6 justify-center">
          <div class="px-20 lg:px-24">
              <h1 class="animate-fade-right text-lg lg:text-3xl py-6">{{ product.title }}</h1>
              <p class="text-sm lg:text-lg font-light animate-fade-left">{{ product.content }}</p>
          </div>
          <div class="py-5 grid items-center justify-center px-24 lg:px-0">
              <img class="max-w-[300px] min-w-[300px] min-h-[300px] max-h-[300px] lg:max-w-[400px] lg:min-w-[400px] lg:min-h-[400px] lg:max-h-[400px] xl:max-w-[500px] xl:min-w-[500px] xl:min-h-[500px] xl:max-h-[500px] duration-300 hover:shadow-2xl hover:scale-105" :src="product.post_image" />
              <p class="py-4 text-base lg:text-lg" v-if="product.discount">Çmimi: <span class="text-red-600 line-through">{{ product.price }}€</span><span class="ml-2"> {{getDiscountPrice(product.discount_percentage, product.price)}}€ </span> <span class="px-2 p-1 border ml-1 text-white font-bold bg-red-600 animate-wiggle">{{ product.discount_percentage }}%</span></p>
              <p class="py-4 text-base lg:text-lg" v-else>Çmimi {{product.price}}€</p>
              <p class="italic text-sm">Informacion: {{ product.product_information }}</p>
              <div class="py-2">
                <button class="mt-2 bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out">Blej</button>
                <button @click="downloadPDF" class="ml-4 mt-2 bg-yellow-500 text-white py-2 px-6 rounded-lg hover:bg-yellow-600 transition duration-300 ease-in-out">Gjenero PDF</button>
              </div>
          </div>
        </div>
        <div class="grid lg:grid-cols-2 py-4 px-6 lg:px-24">
            <li class="text-sm lg:text-lg font-light items-center animate-fade-left list-none flex gap-4 my-2" v-if="product.mattress_features.length >= 1" v-for="(feature, index) in product.mattress_features">
              <img src="../assets/image/badge.png" class="max-w-[32px] max-h-[32px] min-h-[32px] min-w-[32px]" />
              {{ feature.features }}
            </li>
        </div>
      </div>
      <div v-else class="flex justify-center items-center w-full h-64">
        <div class="h-auto bg-white">
          <div class="flex justify-center items-center h-full">
            <img class="h-16 w-16" src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif" alt="">
          </div>
        </div>
      </div>
    </div>
    </div>
    <Footer />
  </template>
  
  <script>
  import Header from './Header.vue';
  import Footer from './Footer.vue';
  import Breadcrumbs from './Breadcrumbs.vue';
  import jsPDF from 'jspdf';

  export default {
    name: 'ProductDetails',
    data() {
      return {
        product: {},
        elementHeight: 1000,
        isLoading: true,
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
        const timestamp = new Date().getTime();
        const apiUrl = `https://api.luliflex.com/wp-json/custom/v1/post/${productId}?timestamp=${timestamp}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
            this.product = data;
            this.isLoading = false;
              // Now that the API data is fetched, measure the element height
              this.$nextTick(() => {
                const element = this.$refs.elementToMeasure;
                const rect = element.getBoundingClientRect();
                this.elementHeight = rect.height + 500;

                // Scroll to the top after everything is set
                window.scrollTo(0, 0);
              });
            })
            .catch(error => {
            console.error(error);
            });
       
        },
        methods:{
          getDiscountPrice(discount, price){
            if (discount) {
              const deletedPrice = price * discount / 100;
              const discountPrice = price - deletedPrice;
              return discountPrice.toFixed(2);
            } else {
              return price.toFixed(2);
            }
          },
          async fetchImageData(imageUrl) {
            try {
              const response = await fetch(imageUrl);
              if (response.ok) {
                const blob = await response.blob();
                return URL.createObjectURL(blob);
              } else {
                console.error('Failed to fetch image data');
                return null;
              }
            } catch (error) {
              console.error('Error fetching image data:', error);
              return null;
            }
          },

          async downloadPDF() {
            // Create a new jsPDF instance
            const doc = new jsPDF();

            // Add content to the PDF (e.g., product details)
            doc.text("Titulli: " + this.product.title, 10, 10);
            doc.text("Permbajtja: " + this.product.content, 10, 20);

            const imageUrl = this.product.post_image;
            const splitUrl = imageUrl.split('https://api.luliflex.com/');
            const imageData = await this.fetchImageData("/api/"+splitUrl[1]);
            
            if (imageData) {
              // Add the image to the PDF document
              // Adjust the coordinates, width, and height as needed
              doc.addImage(imageData, 'JPEG', 10, 30, 50, 50);
              const d = new Date();
              let year = d.getFullYear();

              // Add a watermark in the middle of the page
              doc.setFontSize(40);
              doc.setTextColor(200); // Adjust transparency here
              doc.text("LULIflex "+ year, doc.internal.pageSize.width / 2, doc.internal.pageSize.height / 2, 'center');

              // Save the PDF as a file
              doc.save('product_details.pdf');
            } else {
              // Handle the case when image data cannot be fetched
              console.error('Failed to fetch image data');
            }
          },
        }
  };
  </script>
<style>
  .parallax{
    background-image: url(../assets/image/mattresimg.jpg);
  }
</style>