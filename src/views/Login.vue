<template>
    <div>
        <body>
            <div class="min-h-screen py-40" style="background-image: linear-gradient(115deg, #9F7AEA,#fee2fe);">
            <div class="container mx-auto bg-white">
                <div class="flex flex-col lg:flex-row p-4 md:p-10 bg-white rounded-xl mx-auto shadow-lg overflow-hidden ">
                    <div class="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center" style="background-image: url(../assets/image/register.jpg);">
                        <h1 class=" text-black text-3xl mb-3 font-light">Mirësevini</h1>
                        <img src="../assets/image/add1.jpg">
                        <div>
                            <p class="text-black font-light leading-7 mt-5">Luli Flex ofron shërbime dhe zgjedhje të shumta sa i përket gjumit tuaj, kyçuni apo krijoni llogarinë tuaj për të parë produktet më bashkëkohore qe Luli Flex ofron për ju!</p>
                        </div>
                    </div>
                    <div class=" w-full lg:w-1/2 py-5 md:py-16 px-12 ">
                        <h2 class="text-3xl mb-4">Kyçu</h2>
                       <form @submit.prevent="login">
                        <div class="grid grid-cols">
                            <input v-model="login_form.email" type="text" placeholder="Email" class="border border-green-900 py-1 px-2 w-full">
                        </div>
                        <div class="mt-5">
                            <input  v-model="login_form.password" type="password" placeholder="Password" class="border border-green-900 py-1 px-2 w-full">
                            <span class="eye" onclick="myFunction()">
                            </span>
                        </div>
                        <p id="infolog" class="text-red-500"></p>
                        <p class="mt-2 text-sm border-green-900 font-light">Ke harruar fjalëkalim?</p>
                        <div class="mt-5">
                            <button  type="submit" value="Login" class="w-full bg-green-900 py-3 text-center text-white">Login</button>
                        </div>
                        <button @click="registerWithGoogle" class="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-110 duration-300">
                    <svg  xmlns="http://www.w3.org/2000/svg" width="25"  fill="currentColor" class="bi bi-google " viewBox="0 0 16 16 ">
                    <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
                    </svg>
                    Kyçu me Google</button>
                    <img src="../../dist/images/logo-luliflex.png" alt="">
                <div class="text-sm flex justify-between items-center">
                <p class="font-light whitespace-nowrap">Nuk keni llogari?</p>
                <router-link to="/register" type="submit" class="ml-2 w-full bg-green-900 py-3 text-center text-white">Regjistrohu</router-link>
            </div>
                       </form>
                    </div>
                </div>  
            </div>
            </div>
            
        </body> 
   

    </div>
</template>

<script>
import {ref} from 'vue'
import { useStore, mapActions } from 'vuex'
import Toaster from '../components/Toaster.vue'
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
        Toaster
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

