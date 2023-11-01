<template>
    <div>
      <Header :headerClass="'bg-darkblue-100/30'"/>
      <div class="container py-40 px-20">
        <h1 class="text-2xl">Your Orders</h1>
        <ul v-if="order">
          <li v-for="order in orders" :key="order.order_id">
            <h3>Order ID: {{ order.order_id }}</h3>
            <p>User Email: {{ order.user_email }}</p>
            <p>Products: {{ order.products.join(', ') }}</p>
            <p>Total Price: ${{ order.total_price }}</p>
            <p>Phone Number: {{ order.phone_no }}</p>
          </li>
        </ul>
        <div class="mt-4 text-red-500" v-else>
            Nuk keni asnje porosi
        </div>
      </div>
      <Footer />
    </div>
  </template>
  
  <script>
  import Cookies from 'js-cookie';
  import axios from 'axios';
  import Header from './Header.vue';
  import Footer from './Footer.vue';
  
  export default {
    components: {
      Header,
      Footer
    },
    data() {
      return {
        orders: [], // Initialize an empty array to store orders
      };
    },
    mounted() {
      // Make an API request to get user's orders and update the 'orders' data
      this.getUserOrders();
    },
    methods: {
      getUserOrders() {
        const user_id = Cookies.get('luliflex_user_id');
  
        // Make an API request to fetch the user's orders from WordPress
        axios
          .get('https://api.luliflex.com/wp-json/custom-api/v1/user-orders', {
            params: {
              user_id: user_id, // Replace with the actual user ID
            },
          })
          .then((response) => {
            this.orders = response.data; // Update the 'orders' data with fetched orders
          })
          .catch((error) => {
            console.error('Error fetching orders:', error);
          });
      },
    },
  };
  </script>
  