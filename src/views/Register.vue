<template>
    <div>
        <body>
            <div class="min-h-screen py-40" style="background-image: linear-gradient(115deg, #9F7AEA,#fee2fe);">
            <div class="container mx-auto bg-white">
                <div class="flex flex-col items-center bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
                    <div class=" w-full lg:w-1/2 py-16 px-12">
                        <h2 class="text-3xl mb-4 font-light">Regjistrohu</h2>
                        <p class="mb-4 font-light">
                            Krijo llogarinë tënde, është falas dhe merr vetëm një minutë.
                        </p>
                       <form @submit.prevent="Register">
                        <div class="grid grid-cols-2 gap-5">
                            <input v-model="register_form.username" type="text" placeholder="Emri" class="border focus:border-green-900 py-1 px-2" @blur="validateUsername">
                            <input type="text" placeholder="Mbiemri" class="border focus:border-green-900 py-1 px-2 ">
                        </div>
                        <p v-if="usernameError" class="text-red-500">{{ usernameError }}</p>
                        <div class="mt-5">
                            <input v-model="register_form.email" type="text" placeholder="Email" class="border focus:border-green-900 py-1 px-2 w-full" @blur="validateEmail">
                        </div>
                        <p v-if="emailError" class="text-red-500">{{ emailError }}</p>
                        <div class="mt-5">
                            <input v-model="register_form.password" type="password" placeholder="Password" class="border focus:border-green-900 py-1 px-2 w-full" @blur="validatePassword">
                            <span class="eye" onclick="myFunction()">
                            </span>
                        </div>
                        <p v-if="passwordError" class="text-red-500">{{ passwordError }}</p>
                        <div class="mt-5">
                            <input v-model="register_form_fake.confirmPassword"  type="password" placeholder="Konfirmo fjalëkalimin" class="border focus:border-green-900 py-1 px-2 w-full" @blur="validateConfirmPassword">
                        </div>
                        <p v-if="confirmPasswordError" class="text-red-500">{{ confirmPasswordError }}</p>
                        <button @click="registerWithGoogle" class="bg-white border py-2 w-full rounded-xl mt-5 hover:border-green-900 flex justify-center items-center text-sm hover:scale-110 duration-300">
                            <svg  xmlns="http://www.w3.org/2000/svg" width="25"  fill="currentColor" class="bi bi-google " viewBox="0 0 16 16 ">
                            <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
                            </svg>
                            Regjistrohu me Google</button>
                        <div class="mt-5">
                            <input type="checkbox" class="border border-green-900">
                            <span class="font-light"> 
                                Unë pranoj <a href="#" class="text-green-900">Kushtet e përdorimit</a> & <a href="#" class="text-green-900">Privatësisë</a>
                            </span>
                        </div>
                        <div class="mt-5">
                            <button :disabled="!isFormValid" type="submit" class="w-full bg-green-900 py-3 text-center text-white">Regjistrohu</button>
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
import {ref, computed} from 'vue';
import { mapActions, useStore } from 'vuex'
import 'firebase/auth'

export default{
    setup(){
        const register_form = ref({});
        const register_form_fake = ref({});
        const store = useStore();
        const usernameError = ref('');
        const emailError = ref('');
        const passwordError = ref('');
        const confirmPasswordError = ref('');

        const Register = () =>{
            store.dispatch('register', register_form.value);
        }

        // add validation function for username input
        const validateUsername = () => {
            if (!register_form.value.username) {
                usernameError.value = 'Please enter a username.';
                return false;
            } else if(register_form.value.username.length < 5){
                usernameError.value = 'Username duhet të jetë më i gjatë se 5 shkronja.';
                return false;
            } else {
                usernameError.value = '';
                return true;
            }
        };
        const validateEmail = () => {
            const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
            const emailValid = emailPattern.test(register_form.value.email)
            if(!emailValid){
                emailError.value = 'Shkruani një email valid.'
                return false;
            }else{
                emailError.value = ''
                return true;
            }
        };
        const validatePassword = () => {
            if (!register_form.value.password) {
                passwordError.value = 'Ju lutem shkruani fjalëkalimin.';
                return false;
            } else if(register_form.value.password.length < 8){
                passwordError.value = 'Fjalëkalimi duhet të jetë mbi 8 karaktere.';
                return false;
            } else {
                passwordError.value = '';
                return true;
            }
        };
        const validateConfirmPassword = () => {
            if (!register_form_fake.value.confirmPassword) {
                confirmPasswordError.value = 'Ju lutem konfirmoni fjalëkalimin.';
                return false;
            } else if(register_form.value.password != register_form_fake.value.confirmPassword){
                confirmPasswordError.value = 'Fjalëkalimet nuk përputhen';
                return false;
            } else {
                confirmPasswordError.value = '';
                return true;
            }
        };
        const isFormValid = computed(() => {
        return validateUsername() && validateEmail() && validatePassword() && validateConfirmPassword();
        });
        return{
            Register,
            register_form,
            register_form_fake,
            ...mapActions(['registerWithGoogle']),
            usernameError,
            emailError,
            passwordError,
            confirmPasswordError,
            validateUsername,
            validateEmail,
            validatePassword,
            validateConfirmPassword,
            isFormValid 
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

