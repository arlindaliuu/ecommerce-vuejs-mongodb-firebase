<template>
    <div>
        <div class="min-h-screen pt-40 pb-24">
            <Toaster type="success" ref="toaster" />
            <Toaster type="wrong" ref="toasterError" />
            <div class="absolute inset-0 bg-white opacity-50 bg-cover bg-no-repeat">
                <img class="w-full" src="../assets/image/hero-home.webp" />
            </div>
                <div class="lg:max-w-4xl  mx-5 lg:mx-auto bg-white relative rounded-lg">
                    <div class="flex flex-col lg:flex-row rounded-lg bg-white mx-auto shadow-lg overflow-hidden">
                        <div class="w-full p-6 md:p-10">
                            <div class="flex justify-between">
                                <h2 class="text-3xl mb-4 font-light">Regjistrohu</h2>
                                <button @click="registerWithGoogle" class="hover:scale-110 duration-300 border rounded-full self-center p-2 shadow-lg">
                                    <svg  xmlns="http://www.w3.org/2000/svg" width="15" height="15"  fill="currentColor" class="bi bi-google " viewBox="0 0 16 16 ">
                                    <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
                                    </svg>
                                </button>
                            </div>
                            <p class="mb-4 font-light">
                                Krijo llogarinë tënde, është falas dhe merr vetëm një minutë.
                            </p>
                        <form @submit.prevent="Register" ref="form" method="POST">
                            <div class="grid grid-cols-2 gap-5">
                                <div>
                                    <label class="font-semibold">Emri</label>
                                    <input v-model="register_form.username" type="text" placeholder="Emri" class="border-2 bg-slate-100 mt-2 border-gray-100 py-2 px-2 w-full rounded-3xl" @blur="validateUsername">
                                </div>
                                <div>
                                    <label class="font-semibold">Mbiemri</label>
                                    <input type="text" placeholder="Mbiemri" class="border-2 bg-slate-100 mt-2 border-gray-100 py-2 px-2 w-full rounded-3xl">
                                </div>
                            </div>
                            <p v-if="usernameError" class="text-red-500 text-sm">{{ usernameError }}</p>
                            <div class="mt-5">
                                <label class="font-semibold">Email</label>
                                <input v-model="register_form.email" type="text" placeholder="Email" class="border-2 bg-slate-100 mt-2 border-gray-100 py-2 px-2 w-full rounded-3xl" @blur="validateEmail">
                            </div>
                            <p v-if="emailError" class="text-red-500 text-sm">{{ emailError }}</p>
                            <div class="mt-5">
                                <label class="font-semibold">Fjalëkalimi</label>
                                <input v-model="register_form.password" type="password" placeholder="Fjalëkalimi" class="border-2 bg-slate-100 mt-2 border-gray-100 py-2 px-2 w-full rounded-3xl" @blur="validatePassword">
                                <span class="eye" onclick="myFunction()">
                                </span>
                            </div>
                            <p v-if="passwordError" class="text-red-500 text-sm">{{ passwordError }}</p>
                            <div class="mt-5">
                                <label class="font-semibold">Konfirmo Fjalëkalimi</label>
                                <input v-model="register_form_fake.confirmPassword"  type="password" placeholder="Konfirmo fjalëkalimin" class="border-2 bg-slate-100 mt-2 border-gray-100 py-2 px-2 w-full rounded-3xl" @blur="validateConfirmPassword">
                            </div>
                            <p v-if="confirmPasswordError" class="text-red-500 text-sm">{{ confirmPasswordError }}</p>
                            <div class="mt-5">
                                <input type="checkbox" class="border border-green-900">
                                <span class="font-light"> 
                                    Unë pranoj <a href="#" class="text-green-900">Kushtet e përdorimit</a> & <a href="#" class="text-green-900">Privatësisë</a>
                                </span>
                            </div>
                            <div class="mt-5">
                                <button :disabled="!isFormValid" type="submit" class="w-full bg-green-900 py-3 text-center text-white rounded-lg hover:scale-105 duration-300">Regjistrohu</button>
                            </div>
                        </form>
                        </div>
                        <div class="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 md:p-10 bg-login">
                            <div class="text-sm grid gap-4 justify-between items-center">
                                <p class="text-3xl">Mirësevini në LULIflex</p>
                                <p class="font-light whitespace-nowrap">Keni llogari?</p>
                                <router-link to="/login" class="w-full bg-green-900 py-3 text-center text-white rounded-lg hover:scale-105 duration-300">Kyçu</router-link>
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
import Cookies from 'js-cookie';
import axios from 'axios';
import Footer from '../components/Footer.vue';
import Toaster from '../components/Toaster.vue';

export default {
    components:{
        Footer,
        Toaster
    },
    data() {
        return {
        register_form: {},
        register_form_fake: {},
        usernameError: '',
        emailError: '',
        passwordError: '',
        confirmPasswordError: '',
        };
    },
    methods: {
        async Register() {
            const userData = {
                username: this.register_form.username,
                email: this.register_form.email,
                password: this.register_form.password,
            };

            try {
                const response = await axios.post('https://api.luliflex.com/wp-json/custom/v1/register', userData, {
                withCredentials: true,
                });

                if (response.status === 400) {
                    this.$refs.toasterError.show('Regjistrimi dështoi. Mesazhi: ' + response.statusText, 'wrong' );
                } 
                if(response.status === 200) {
                    this.$refs.form.reset(); // Reset the form fields
                    this.$refs.toaster.show('U regjistruat me sukses!', 'success' );
                    Cookies.set('luliflex_username', userData.username);
                    Cookies.set('luliflex_email', userData.email);
                    this.$router.push('/');
                }else{
                    this.$refs.toaster.show(
                    'Diçka shkoi gabim, provoni më vonë. Mesazhi: ' + response.statusText,
                    'wrong'
                );
                }
            } catch (error) {
                if (error instanceof Error && error.message === 'Network Error') {
                    this.$refs.toasterError.show('Network error, please check your internet connection.', 'wrong');
                } else {
                    this.$refs.toasterError.show('Diçka shkoi gabim, provoni më vonë. Mesazhi: ' + error.message, 'wrong');
                }
            }
        },
        validateUsername() {
        if (!this.register_form.username) {
            this.usernameError = 'Ju lutemi shkruani emrin e përdoruesit.';
            return false;
        } else if (this.register_form.username.length < 5) {
            this.usernameError = 'Emri duhet të jetë më i gjatë se 5 shkronja.';
            return false;
        } else {
            this.usernameError = '';
            return true;
        }
        },
        validateEmail() {
        const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        const emailValid = emailPattern.test(this.register_form.email);
        if (!emailValid) {
            this.emailError = 'Shkruani një email valid.';
            return false;
        } else {
            this.emailError = '';
            return true;
        }
        },
        validatePassword() {
        if (!this.register_form.password) {
            this.passwordError = 'Ju lutem shkruani fjalëkalimin.';
            return false;
        } else if (this.register_form.password.length < 8) {
            this.passwordError = 'Fjalëkalimi duhet të jetë mbi 8 karaktere.';
            return false;
        } else {
            this.passwordError = '';
            return true;
        }
        },
        validateConfirmPassword() {
        if (!this.register_form_fake.confirmPassword) {
            this.confirmPasswordError = 'Ju lutem konfirmoni fjalëkalimin.';
            return false;
        } else if (this.register_form.password !== this.register_form_fake.confirmPassword) {
            this.confirmPasswordError = 'Fjalëkalimet nuk përputhen';
            return false;
        } else {
            this.confirmPasswordError = '';
            return true;
        }
        },
    },
    computed: {
        isFormValid() {
        return (
            this.validateUsername() &&
            this.validateEmail() &&
            this.validatePassword() &&
            this.validateConfirmPassword()
        );
        },
    },
    };
    </script>


<style scoped>
body{
    background-color: rebeccapurple;
    
}
h2{
    color:red;
}
</style>

