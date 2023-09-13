<template>
    <Header :headerClass="headerStyles" />
    <div class="bg-beige-100">
    <div class="bg-gray-100 py-8 pt-40">
        <div class="max-w-screen-lg mx-auto p-4">
          <h1 class="text-3xl font-semibold mb-6">Your Shopping Cart</h1>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div v-for="(item, index) in cartItemsWithQuantity" :key="index" class="bg-white rounded-lg p-4 shadow-md">
              <div class="flex justify-between">
                <h2 class="text-lg font-semibold">{{ item.title }}</h2>
                <span class="text-gray-600">{{ item.totalPrice }}€</span>
              </div>
              <p class="text-sm text-gray-500">{{ item.quantity > 1 ? `Quantity: ${item.quantity}` : '' }}</p>
              <div class="mt-4">
                <button @click="removeItem(index)" class="text-red-600 hover:underline">Remove</button>
              </div>
            </div>
          </div>
          <div class="mt-8">
            <div class="flex justify-between items-center">
              <div>
                <p class="text-xl font-semibold">Total Price:</p>
                <p class="text-gray-600">Including taxes and shipping</p>
              </div>
              <p class="text-2xl font-semibold">{{ totalCartPrice }}€</p>
            </div>
            <button @click="checkout" class="mt-4 bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out">Checkout</button>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </template>
  
  <script>
  import { mapGetters, mapMutations } from 'vuex';
  import Header from '../components/Header.vue';
  import Footer from '../components/Footer.vue';
  export default {
    data(){
        return{
            headerStyles: 'bg-orange-600/30', // Define the class as a string
        }
    },
    components:{
    Header,
    Footer
    },
    methods:{
    ...mapMutations(['removeCartItem']),
        removeItem(index) {
        this.removeCartItem(index);
        },
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
        // Calculate the total price of all cart items
        return this.cartItemsWithQuantity.reduce((total, item) => total + item.totalPrice, 0);
        },
    },
  };
  </script>
  