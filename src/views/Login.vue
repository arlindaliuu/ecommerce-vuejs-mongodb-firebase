<template>
    <div>
            <div class="min-h-screen py-40">
                <div class="absolute inset-0 bg-white opacity-50 bg-cover bg-no-repeat" style="background-image: url('../src/assets/image/hero-home.webp');"></div>
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
                            <input v-model="login_form.email" type="text" placeholder="Email" class="border-2 bg-slate-100 mt-2 border-gray-100 py-2 px-2 w-full rounded-3xl">
                        </div>
                        <div class="mt-5">
                            <label class="font-semibold">Fjalëkalimi</label>
                            <input  v-model="login_form.password" type="password" placeholder="Fjalëkalimi" class="border-2 mt-2 bg-slate-100 border-gray-100 py-2 px-2 w-full rounded-3xl">
                            <span class="eye" onclick="myFunction()">
                            </span>
                        </div>
                        <p id="infolog" class="text-red-500"></p>
                        <p class="mt-2 text-sm border-green-900 font-light">Ke harruar fjalëkalim?</p>
                        <div class="mt-5">
                            <button  type="submit" value="Login" class="w-full bg-green-900 py-3 text-center text-white rounded-lg hover:scale-105 duration-300">Login</button>
                        </div>
                       </form>
                    </div>
                    <div class="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 md:p-10 bg-login">
                        <div class="text-sm grid gap-4 justify-between items-center">
                            <p class="text-3xl">Mirësevini në Luliflex</p>
                            <p class="font-light whitespace-nowrap">Nuk keni llogari?</p>
                            <router-link to="/register" type="submit" class="w-full bg-green-900 py-3 text-center text-white rounded-lg hover:scale-105 duration-300">Regjistrohu</router-link>
                            <router-link to="/" class="w-full bg-beige-100 py-3 text-center text-green-900 rounded-lg hover:scale-105 duration-300 mt-10">Shko në faqen kryesore &#x2192;</router-link>
                        </div>
                    </div>
                </div>  
            </div>
            </div>
    </div>
    <Footer />
</template>

<script>
import {ref} from 'vue'
import { useStore, mapActions } from 'vuex'
import Toaster from '../components/Toaster.vue'
import Footer from '../components/Footer.vue'
export default{
    setup(){
        const login_form = ref({});
        const store = useStore();

        const login = () =>{
           store.dispatch('login', login_form.value);
        }

        return{
            login_form,
            login,
            ...mapActions(['registerWithGoogle'])
        }
    },
    components: {
        Toaster,
        Footer
    }

}
</script>
<style scoped>
body{
    background-color: rebeccapurple;
    
}
h2{
    color:red;
}
</style>

