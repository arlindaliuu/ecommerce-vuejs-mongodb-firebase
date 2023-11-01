<template>
    <Header :headerClass="headerStyles" />
    <Toaster type="success" ref="toaster" />
    <Toaster type="wrong" ref="toasterError" />
    <div class="bg-beige-100">
    <div class="bg-gray-100 py-8 pt-40">
        <div class="max-w-screen-lg mx-auto p-4">
          <h1 class="text-3xl font-semibold mb-6">Shporta juaj e blerjeve</h1>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div v-for="(item, index) in cartItemsWithQuantity" :key="index" class="bg-white rounded-lg p-4 shadow-md">
              <div class="flex justify-between">
                <h2 class="text-lg font-semibold">{{ item.title }}</h2>
                <span class="text-gray-600">{{ item.totalPrice }}€</span>
              </div>
              <div class="my-4">
                <img class="w-full max-h-[250px] min-h-[250px]" :src="item.post_image" />
              </div>
              <p class="text-sm text-gray-500">{{ item.quantity >= 1 ? `Sasia: ${item.quantity}` : '' }}</p>
              <div class="mt-4">
                <button @click="removeItem(index)" class="text-red-600 hover:underline">Fshij</button>
              </div>
            </div>
          </div>
          <div v-if="cartItemsWithQuantity.length >= 1" class="mt-8">
            <div class="flex justify-between items-center">
              <div>
                <p class="text-xl font-semibold">Çmimi total:</p>
                <p class="text-gray-600">Përfshirë taksat dhe transportin</p>
              </div>
              <p class="text-2xl font-semibold">{{ totalCartPrice }}€</p>
            </div>
            <button v-if="cartItemsWithQuantity.length >= 1" @click="showCheckoutModal" class="mt-4 bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out">Blej</button>
            <button v-if="cartItemsWithQuantity.length >= 1" @click="generatePDF" class="ml-4 mt-4 bg-yellow-500 text-white py-2 px-6 rounded-lg hover:bg-yellow-600 transition duration-300 ease-in-out">Gjenero PDF</button>
            <button v-if="cartItemsWithQuantity.length >= 1" @click="removeAll" class="ml-4 mt-4 bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition duration-300 ease-in-out">Fshij të gjitha</button>
          </div>
          <div class="text-xl lg:text-3xl h-96 text-red-600" v-else>
            Ju nuk keni asgjë në shportë!
          </div>
        </div>
      </div>
    </div>
     <!-- Checkout Modal -->
     <div v-if="isCheckoutModalVisible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
      <div class="bg-white p-8 rounded-lg text-center mx-4 flex flex-col">
        <span>Shkruani numrin tuaj të telefonit.</span>
        <input class="rounded-sm border" v-model="phoneNo" />
        <button v-if="cartItemsWithQuantity.length >= 1" @click="createOrder" class="mt-4 bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out">Blej</button>
      </div>
      <!-- <div class="bg-white p-8 rounded-lg text-center mx-4">
        <h2>Zgjidhni një opsion të blerjes:</h2>
        <div class="mt-4 w-full">
          <button class="bg-green-600 w-full px-4 py-2 rounded-full text-white font-medium" @click="whatsappText">
            WhatsApp
          </button>
        </div>
        <div class="mt-2 w-full">
          <a class="bg-gray-600 px-4 w-full flex justify-center py-2 rounded-full text-white font-medium" href="mailto:contact@luliflex.com">
            Email
          </a>
        </div>
        <button @click="closeCheckoutModal" class="mt-4 bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition duration-300 ease-in-out">Mbyll</button>
      </div> -->
    </div>
    <div v-if="isPDFDownloaded" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white p-8 rounded-lg text-center mx-4">
        <p>Nëse dëshironi të vazhdoni porosinë përmes WhatsApp, sigurohuni që ta keni shkarkuar porosinë në formatin PDF</p>
        <div class="mt-4 w-full">
          <button class="bg-green-600 w-full lg:w-1/2 px-4 py-2 rounded-full text-white font-medium" @click="whatsappText">
            Po kam shkarkuar
          </button>
        </div>
        <div class="mt-2 w-full">
          <button class="bg-yellow-500 hover:bg-yellow-600 transition duration-300 ease-in-out w-full lg:w-1/2 px-4 py-2 rounded-full text-white font-medium" @click="generatePDF">
            Gjenero PDF
          </button>
        </div>
        <button @click="closeGeneratePDFModal" class="mt-4 bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition duration-300 ease-in-out">Mbyll</button>
      </div>
    </div>
    <Footer />
  </template>
  
  <script>
  import { mapGetters, mapMutations } from 'vuex';
  import Header from '../components/Header.vue';
  import Footer from '../components/Footer.vue';
  import jsPDF from 'jspdf';
  import Cookies from 'js-cookie';
  import axios from 'axios';
  import Toaster from '../components/Toaster.vue';

  export default {
    data(){
        return{
            phoneNo: '+381',
            headerStyles: 'bg-orange-600/30', // Define the class as a string
            isCheckoutModalVisible: false,
            isPDFDownloaded: false,
            whatsappMessage: "Hello, I want to inquire about a purchase.",
        }
    },
    components:{
    Header,
    Footer,
    Toaster
    },
    methods:{
    ...mapMutations(['removeCartItem']),
    ...mapMutations(['removeAllCartItems']),
        removeItem(index) {
        this.removeCartItem(index);
        },
        removeAll(){
          this.removeAllCartItems();
        },
        showCheckoutModal() {
         this.isCheckoutModalVisible = !this.isCheckoutModalVisible;
        },
        createOrder() {
          if(this.phoneNo.length < 12){
            return this.$refs.toasterError.show(`Shkruani numrin e saktë!`, "wrong");
          }else{
            const username = Cookies.get('luliflex_user_id');
            
            // Retrieve product data from local storage
            var localStorageData = localStorage.getItem('cartItems');
            localStorageData = JSON.parse(localStorageData);

            if (Array.isArray(localStorageData)) {
                // Extract product IDs from the retrieved data
                const productIds = localStorageData.map(item => item.id);

                // Phone number (replace with your actual data)
                const phone = this.phoneNo;

                // Create a data object to send to the API
                const requestData = {
                    user_id: username,  // Replace with the user's ID
                    product_ids: productIds,  // Array of product IDs
                    phone_number: phone,  // Replace with the user's phone number
                };

                // Make a POST request to your API endpoint
                axios.post('https://api.luliflex.com/wp-json/custom-api/v1/create-order', requestData)
                    .then(response => {
                      this.$refs.toaster.show(`Porosia u realizua, së shpëjti do të njoftoheni për konfirmim të porosisë!`, "success");
                      this.isCheckoutModalVisible = false;
                      localStorage.removeItem("cartItems");
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        // Handle the error, e.g., show an error message
                    });
            } else {
                console.error('Data retrieved from local storage is not an array.');
            }
          }
        },
        closeCheckoutModal() {
          this.isCheckoutModalVisible = false;
        },
        closeGeneratePDFModal() {
          this.isPDFDownloaded = false;
        },
        generatePDF() {
          // Generate the PDF
          const doc = new jsPDF();
          doc.text('Produktet në shportë:', 10, 10);

          this.cartItemsWithQuantity.forEach((item, index) => {
            const y = 20 + index * 10;
            doc.text(`Titulli: ${item.title}: ${item.totalPrice}€ - Sasia ${item.quantity} copë`, 10, y);
          });
          // Print the total cart price at the bottom
          const totalPriceY = doc.internal.pageSize.height - 20;
          doc.setFontSize(14); // Adjust font size as needed
          doc.text(`Çmimi total: ${this.totalCartPrice}€`, 10, totalPriceY);

          const d = new Date();
          let year = d.getFullYear();

          // Add a watermark in the middle of the page
          doc.setFontSize(40);
          doc.setTextColor(200); // Adjust transparency here
          doc.text("LULIflex "+ year, doc.internal.pageSize.width / 2, doc.internal.pageSize.height / 2, 'center');
       
          // Save the PDF
          doc.save('cart_items.pdf');
        },
        whatsappText() {
          if(!this.isPDFDownloaded){
            this.isPDFDownloaded = true;
            this.isCheckoutModalVisible = false
          }else{
            // Open WhatsApp with the message
            const phoneNumber = "0628444616"; // Replace with your phone number
            const encodedMessage = encodeURIComponent(this.whatsappMessage);
            const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
            window.open(whatsappUrl, "_blank");
          }
    
        }
    },
    computed: {
      ...mapGetters(['cartItems']),
      cartItemsWithQuantity() {
        // Create an array to store items with quantities
        const itemsWithQuantity = [];
  
        // Get the discount percentage from localStorage
        const discountPercentage = localStorage.getItem('discountPercentage') || 0; // Default to 0 if not found
  
        // Loop through the cart items and calculate quantities
        this.cartItems.forEach((item) => {
          // Calculate the discounted price based on the discount percentage
          const discountedPrice = item.price - (item.price * discountPercentage / 100);
  
          // Find the index of the item with the same ID in itemsWithQuantity
          const index = itemsWithQuantity.findIndex((x) => x.id === item.id);
  
          if (index === -1) {
            // If item doesn't exist in itemsWithQuantity, add it with quantity 1 and totalPrice
            itemsWithQuantity.push({ ...item, quantity: 1, totalPrice: discountedPrice });
          } else {
            // If item exists in itemsWithQuantity, increment the quantity and update the totalPrice
            itemsWithQuantity[index].quantity += 1;
            itemsWithQuantity[index].totalPrice += discountedPrice;
          }
        });
  
        return itemsWithQuantity;
      },
        totalCartPrice() {
          // Calculate the total price of all cart items, considering quantity
          return this.cartItemsWithQuantity.reduce((total, item) => total + (item.totalPrice * item.quantity), 0);
        },
    },
    mounted(){
      window.scrollTo(0, 0)
    }
  };
  </script>
 