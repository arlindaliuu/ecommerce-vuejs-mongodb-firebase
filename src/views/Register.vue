<template>
    <div>
        
        <body>
            <div class="min-h-screen py-40" style="background-image: linear-gradient(115deg, #9F7AEA,#fee2fe);">
            <div class="container mx-auto bg-white">
                <div class="flex flex-col lg:flex-row w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
                    
                    <div class="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center" style="background-image: url(../assets/image/register.jpg);">
                        <h1 class=" text-black text-3xl mb-3">Welcome</h1>
                        <img src="../assets/image/register.jpg">
                        
                        <div>
                            <p class="text-black">Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti ea obcaecati culpa numquam ad quasi asperiores error repudiandae, hic rerum incidunt, illum, explicabo itaque! Sint sunt soluta vero eum pariatur.</p>
                        </div>
                    </div>
                    <div class=" w-full lg:w-1/2 py-16 px-12">
                        <h2 class="text-3xl mb-4">Register</h2>
                        <p class="mb-4">
                            Create your account . it free and only take a minute
                        </p>
                       <form @submit.prevent="Register">
                        <div class="grid grid-cols-2 gap-5">
                            <input type="text" placeholder="Emri" class="border border-green-900 py-1 px-2">
                            <input type="text" placeholder="Mbiemri" class="border border-green-900 py-1 px-2">
                        </div>
                        <div class="mt-5">
                            <input v-model="register_form.email" type="text" placeholder="Email" class="border border-green-900 py-1 px-2 w-full">
                        </div>
                        <div class="mt-5">
                            <input v-model="register_form.password" type="password" placeholder="Password" class="border border-green-900 py-1 px-2 w-full">
                            <span class="eye" onclick="myFunction()">
                            </span>
                           

                        </div>
                        <div class="mt-5">
                            <input type="password" placeholder="Konfirmo fjalëkalimin" class="border border-green-900 py-1 px-2 w-full">
                        </div>
                        <button @click="registerWithGoogle">Regjistrohu me Google</button>
                        <div class="mt-5">
                            <input type="checkbox" class="border border-green-900">
                            
                            <span> 
                                Un pranoj <a href="#" class="text-green-900">Kushtet e përdorimit</a> & <a href="#" class="text-green-900"> privatësisë</a>
                            </span>
                        </div>
                        <div class="mt-5">
                            <button type="submit" class="w-full bg-green-900 py-3 text-center text-white">Regjistrohu</button>
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
import {ref} from 'vue';
import { mapActions, useStore } from 'vuex'
import 'firebase/auth'
export default{
    setup(){
        const register_form = ref({});
        const store = useStore();

        const Register = () =>{
            store.dispatch('register', register_form.value);
        }

        return{
            Register,
            register_form,
            ...mapActions(['registerWithGoogle'])
        }
    },

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

<!-- <form @submit.prevent="Register">
    <input type="text" placeholder="Email" v-model="register_form.email">
    <input type="password" placeholder="Password" v-model="register_form.password">
    <input type="submit" placeholder="Register">
    <p>Have an account? <router-link to="/login">Login here</router-link></p>
</form> -->