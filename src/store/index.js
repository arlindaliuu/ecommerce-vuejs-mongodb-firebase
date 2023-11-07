import { createStore } from 'vuex';
import router from '../router';
import apiRequest from '../utilities/apiRequest';
import axios from 'axios';
function getInitialState() {
  return {
    user: null,
    newProduct: null,
    listProduct: [],
    discountProduct: [],
    adminRole: null,
    aboutContent: [],
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || [], // Load cart items from localStorage
  };
}
const store = createStore({
    state: getInitialState(),

    getters:{
      listProduct: state => state.listProduct,
      getAdmin: state => state.adminRole,
      listDiscountProduct: state => state.discountProduct,
      listAboutContent: (state) => state.aboutContent, // Corrected property name
      cartItemCount: (state) => state.cartItems.length, // Get the number of items in the cart
      cartItems: (state) => state.cartItems, // Get all cart items
    },
    mutations: {
        SET_USER(state, user){
            state.user = user
        },
        CLEAR_USER(state){
            state.user = null
            localStorage.removeItem('cartItems');
        },
        SET_IS_ADMIN(state, isAdmin){
          if(isAdmin){
            state.adminRole = true
            localStorage.setItem('isAdmin', JSON.stringify(true))
          }else{
            state.adminRole = false
          }
        },
        removeCartItem(state, index) {
          state.cartItems.splice(index, 1); // Remove the item at the specified index
          localStorage.setItem('cartItems', JSON.stringify(state.cartItems)); // Update localStorage
        },
        removeAllCartItems(state) {
          state.cartItems = []; // Remove all items from the cart
          localStorage.removeItem('cartItems'); // Remove the cartItems from localStorage
        },
        addToCart(state, item) {
          state.cartItems.push(item);
          localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        addProduct(state, newProduct){
          state.newProduct = newProduct
        },
        listAllProducts(state, listProduct){
          state.listProduct = listProduct
        },
        listAboutContent(state, aboutFields){
          state.aboutContent = aboutFields
        },
        listDiscountProducts(state, discountProduct){
          state.discountProduct = discountProduct
        }
    },
    
    actions:{
      async deleteProduct({commit}, id){
        try {
          const res = await fetch(`http://localhost:3000/product/${id}`, {
            method: 'delete'
          });
          if (!res.ok) {
            throw new Error(`Failed to delete product with ID ${id}: HTTP status ${res.status}`);
          }
          const deletedProduct = await res.json();
          return true; // indicate success
        } catch (error) {
          console.error(error);
          return false; // indicate failure
        }
      },
      async listProducts({ commit }) {
        const timestamp = new Date().getTime();
        const apiUrl = `https://api.luliflex.com/wp-json/custom/v1/posts?timestamp=${timestamp}`;
        
        try {
          const response = await axios.get(apiUrl);
          const productList = response.data;
          commit('listAllProducts', productList);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      },      
      async listDiscountProducts({commit}){
        const timestamp = new Date().getTime();
        const apiUrl = `https://api.luliflex.com/wp-json/custom/v1/posts/discount?timestamp=${timestamp}`;

        try{
          const response = await axios.get(apiUrl)
          const discountProduct = response.data;
          commit('listDiscountProducts', discountProduct);
        }
        catch(error){
          console.error('Error fetching products:', error);
        }
      },
      async aboutContent({ commit }) {
        
        const timestamp = new Date().getTime();

        const apiUrl = `https://api.luliflex.com/wp-json/custom/v1/general?timestamp=${timestamp}`;
        try {
          const response = await axios.get(apiUrl);
          const aboutFields = response.data;
          commit('listAboutContent', aboutFields);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      }, 
        //logout 
        async logout ({ commit }) {
            localStorage.clear();
            commit('CLEAR_USER')
      
            router.push('/login')
          },
        }
      })
      export default store;