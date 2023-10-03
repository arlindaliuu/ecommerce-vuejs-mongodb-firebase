<template>
    <Header />
    <div :style="{ 'max-height': elementHeight + 'px' }" class="parallax w-full flex flex-wrap">
    <div ref="elementToMeasure"  class="thisElement mt-[280px] w-full mb-[100%] bg-white">
      <Breadcrumbs class="col-span-2 pt-5 px-24 text-xl font-light"/>
      <div class="grid lg:grid-cols-2 py-6 justify-center">
        <div class="px-24">
            <h1 class="animate-fade-right text-lg lg:text-3xl py-6">{{ product.title }}</h1>
            <p class="text-sm lg:text-lg font-light animate-fade-left">{{ product.content }}</p>
        </div>
        <div class="py-5 grid items-center justify-between px-24 lg:px-0">
            <img class="max-w-[300px] min-w-[300px] min-h-[300px] max-h-[300px] lg:max-w-[400px] lg:min-w-[400px] lg:min-h-[400px] lg:max-h-[400px] xl:max-w-[500px] xl:min-w-[500px] xl:min-h-[500px] xl:max-h-[500px] duration-300 hover:shadow-2xl hover:scale-105" :src="product.post_image" />
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

  export default {
    name: 'ProductDetails',
    data() {
      return {
        product: {},
        elementHeight: 1000,
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