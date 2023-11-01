<template>
    <div>
        <div class="min-h-screen py-40">
            <div class="absolute inset-0 bg-white opacity-50 bg-cover bg-no-repeat">
                <img class="w-full" src="../assets/image/hero-home.webp" />
            </div>
                <div class="lg:max-w-4xl mx-5 lg:mx-auto bg-white rounded-xl">
                    <div class="flex flex-col lg:flex-row bg-white rounded-xl mx-auto shadow-lg overflow-hidden relative">
                    <div class="w-full lg:w-1/2 p-6 md:p-10">
                        <div class="flex justify-between">
                            <h2 class="text-3xl mb-4">Kyçu</h2>
                            <button @click="registerWithGoogle" class="hover:scale-110 duration-300 border rounded-full self-center p-2 shadow-lg">
                                <svg  xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-google " viewBox="0 0 16 16 ">
                                <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
                                </svg>
                            </button>
                        </div>
                    <form @submit.prevent="login">
                        <div class="grid grid-cols mt-4">
                            <label class="font-semibold">Email</label>
                            <input v-model="login_form.username" type="text" placeholder="Username" class="border-2 bg-slate-100 mt-2 border-gray-100 py-2 px-2 w-full rounded-3xl">
                        </div>
                        <div class="mt-5">
                            <label class="font-semibold">Fjalëkalimi</label>
                            <input v-model="login_form.password" type="password" placeholder="Fjalëkalimi" class="border-2 mt-2 bg-slate-100 border-gray-100 py-2 px-2 w-full rounded-3xl">
                            <span class="eye" onclick="myFunction()">
                            </span>
                        </div>
                        <p id="infolog" class="text-red-500"></p>
                        <div class="mt-5">
                            <button  type="submit" value="Login" class="w-full bg-green-900 py-3 text-center text-white rounded-lg hover:scale-105 duration-300">Kyçu</button>
                        </div>
                    </form>
                    <button class="font-light whitespace-nowrap text-sm mt-2 cursor-pointer hover:underline" @click="openModal">Keni harruar fjalëkalimin?</button>
                    </div>
                    <div class="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 md:p-10 bg-login">
                        <div class="text-sm grid gap-4 justify-between items-center">
                        <p class="text-3xl">Mirësevini në LULIflex</p>
                        <router-link to="/register" type="submit" class="w-full bg-green-900 py-3 text-center text-white rounded-lg hover:scale-105 duration-300">Regjistrohu</router-link>
                        <router-link to="/" class="w-full bg-beige-100 py-3 text-center text-green-900 rounded-lg hover:scale-105 duration-300 mt-10">Shko në faqen kryesore &#x2192;</router-link>
                        </div>
                    </div>
                </div>  
            </div>
        </div>
    </div>
    <div v-if="showModal" class="modal">
        <div class="modal-content">
        <div class="flex justify-between">
            <h2>Email Address</h2>
            <span @click="openModal" class="cursor-pointer">&#10006;</span>
        </div>
        <form @submit.prevent="forgotPassword">
            <input class="border" v-model="email" type="email" required />
            <button type="submit">Reset Password</button>
        </form>
        </div>
    </div>
    <Footer />
</template>

<script>
import {ref} from 'vue'
import { useStore, mapActions } from 'vuex'
import Toaster from '../components/Toaster.vue'
import Footer from '../components/Footer.vue'
import axios from 'axios';
import Cookies from 'js-cookie';

export default{
    components: {
        Toaster,
        Footer
    },
        data() {
            return {
            login_form: {
                email: ''
            },
            showModal: false,
            };
        },
        methods: {
            openModal(){
                this.showModal = !this.showModal;
            },
            async forgotPassword() {
                try {
                    // Extract the email address from the login form
                    const userEmailAddress = this.email;

                    // Make a request to initiate the password reset process
                    const response = await axios.post('https://api.luliflex.com/wp-json/custom/v1/send-password-reset-email', { email: userEmailAddress });

                    // Display a message to the user indicating that a password reset link has been sent
                    alert('Password reset instructions have been sent to your email address.');
                } catch (error) {
                    // Handle errors, e.g., display an error message to the user
                    console.error('Password reset request failed:', error);
                    alert('Password reset request failed. Please try again later.');
                }
            },
            async login() {
                try {
                    // Prepare the user data to send to the server
                    const userData = {
                    username: this.login_form.username,
                    password: this.login_form.password,
                    };
                    // Make a POST request to your custom login endpoint
                    const response = await axios.post('https://api.luliflex.com/wp-json/custom/v1/login', userData, {
                    withCredentials: true,
                    });

                    // Check the response status to determine if the login was successful
                    if (response.status === 200) {
                        // Successful login
                        // Split the string into lines
                        const lines = response.data.split('\n');
                        
                        // Extract the JSON part of the string
                        const jsonPart = lines[1];
                        
                        // Parse the JSON to access the user_id
                        const jsonObject = JSON.parse(jsonPart);
                        
                        const user_id = jsonObject.user_id;
                        console.log('User ID:', user_id);
                      
                        Cookies.set('luliflex_username', userData.username);
                        Cookies.set('luliflex_user_id', user_id)
                        // Redirect to the home page
                        this.$router.push('/');
                    } else {
                    // Show an error message to the user
                    document.getElementById('infolog').innerText = 'Kycja dështoi: ' + response.data.message;
                    }
                } catch (error) {
                    // Show an error message to the user
                    document.getElementById('infolog').innerText = 'Dicka shkoi gabim, rishiko të dhënat tua.'
                }
            },
        },
        mounted() {
            window.scrollTo(0, 0);
        },
    };
</script>
<style scoped>
.modal {
  /* Styling for a modal overlay */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  /* Styling for the modal content */
  background: white;
  padding: 20px;
  border-radius: 5px;
}
body{
    background-color: rebeccapurple;
    
}
h2{
    color:red;
}
</style>

