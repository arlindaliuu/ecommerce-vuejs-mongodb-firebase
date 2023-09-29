<template>
    <Header />
    <div :style="{ 'max-height': elementHeight + 'px' }" class="parallax w-full flex flex-wrap">
    <div ref="elementToMeasure" class="thisElement mt-[280px] w-full mb-[100%] bg-white">
      <Breadcrumbs class="col-span-2 pt-5 px-24 text-xl font-light"/>
      <div class="grid grid-cols-2">
        <div class="px-24">
          {{elementHeight}}
            <h1 class="animate-fade-right text-center text-6xl font-light py-10">{{ product.title }}</h1>
            <p class="text-2xl font-light animate-fade-left mt-10">{{ product.content }}asdddddddddddddddddddddddddd asdasd asd asda sdasdas das das dasd asd asdasd asd asdasd ad sas</p>
        </div>
        <div class="py-5">
            <img class="max-w-[500px] min-w-[500px] min-h[500px] max-h-[500px] duration-300 hover:shadow-2xl hover:scale-105" :src="product.post_image" />
        </div>
      </div>
    </div>
    </div>
    <button @click="downloadPDF" class="btn-download">Download as PDF</button>
    <Footer />
  </template>
  
  <script>
  import Header from './Header.vue';
  import Footer from './Footer.vue';
  import Breadcrumbs from './Breadcrumbs.vue';
  import jsPDF from 'jspdf';
  import mammoth from 'mammoth';


  export default {
    name: 'ProductDetails',
    data() {
      return {
        product: {},
        elementHeight: 0,
      };
    },
    components:{
        Header,
        Footer,
        Breadcrumbs
    },
    mounted() {
        const element = this.$refs.elementToMeasure;
        const rect = element.getBoundingClientRect();
        this.elementHeight = rect.height + 700; // 

        window.scrollTo(0, 0);
        // Fetch the details of the selected product
        const productId = this.$route.params.id;
        fetch(`https://api.luliflex.com/wp-json/custom/v1/post/${productId}`)
            .then(response => response.json())
            .then(data => {
            this.product = data;
            })
            .catch(error => {
            console.error(error);
            });
       
        },
        methods:{
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