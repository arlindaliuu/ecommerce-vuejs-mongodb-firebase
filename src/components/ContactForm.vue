<template>
    <div class="bg-gray-100 py-12">
        <Toaster type="success" ref="toaster" />
        <Toaster type="wrong" ref="toasterError" />
        <div class="max-w-xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 class="text-xl lg:text-3xl font-bold tracking-tight text-gray-900">Na Kontakto!</h2>
          <p class="mt-2 text-base lg:text-lg text-gray-600">Keni një pyetje apo koment? Do të donim të dëgjonim nga ju. Plotësoni formularin e mëposhtëm dhe ne do t'ju kontaktojmë sa më shpejt të jetë e mundur.</p>
          <form ref="form" method="POST" class="mt-8 space-y-6">
              <div class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                <div>
                  <label for="first_name" class="block text-lg font-medium text-gray-700">Emri</label>
                  <div class="mt-1">
                    <input type="text" name="first_name" id="first_name" v-model="firstName" autocomplete="given-name" required class="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md">
                  </div>
                </div>
                <div>
                  <label for="last_name" class="block text-lg font-medium text-gray-700">Mbiemri</label>
                  <div class="mt-1">
                    <input type="text" name="last_name" id="last_name" v-model="lastName" autocomplete="family-name" required class="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md">
                  </div>
                </div>
              </div>
              <div>
                <label for="email" class="block text-lg font-medium text-gray-700">Email</label>
                <div class="mt-1">
                  <input id="email" name="email" type="email" v-model="email" autocomplete="email" required class="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md">
                </div>
              </div>
              <div>
                <label for="message" class="block text-lg font-medium text-gray-700">Mesazhi</label>
                <div class="mt-1">
                  <textarea id="message" name="message" rows="4" v-model="message" class="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"></textarea>
                </div>
              </div>
              <div>
              <button @click.prevent="checkForm" class="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Dërgo
                </button>
            </div>
          </form>
          <p v-if="errors.length">
              <b>Ju lutem përmirësoni gabimet mëposhtme:</b>
              <ul class="text-red-800">
                <li v-for="error in errors">{{ error }}</li>
              </ul>
            </p>
        </div>
      </div>
</template>

<script>
  import Toaster from '../components/Toaster.vue';
  import axios from 'axios';

  export default {
    name: 'ContactUs',
    data() {
      return {
        firstName: '',
        lastName: '',
        email: '',
        message: '',
        errors:[]
      }
    },
    components:{
      Toaster,
    },
    methods: {
        async handleSubmit() {
                try {
                    const response = await axios.post('https://api.luliflex.com/wp-json/custom/v1/send-email', {
                    first_name: this.firstName,
                    last_name: this.lastName,
                    email: this.email,
                    message: this.message
                    });
                    this.$refs.toaster.show(`Emaili u dergua me sukses!`, "success");

                    // clear the form fields after successful submission
                    this.firstName = '';
                    this.lastName = '';
                    this.email = '';
                    this.message = '';
                    this.errors = '';
                    this.$refs.form.reset(); // reset the form fields
                } catch (error) {
                    this.$refs.toasterError.show(`Ndodhi një gabim gjatë dërgimit të emailit!`, "wrong");
                }
        },
        checkForm: function (e) {
            if (this.firstName && this.lastName && this.email && this.message) {
                this.handleSubmit();
                return true;
            }
            this.errors = [];

            if (!this.firstName) {
                this.errors.push('Shkruani Emrin.');
            }
            if (!this.lastName) {
                this.errors.push('Shkruani Mbiemrin.');
            }
            if (!this.email) {
                this.errors.push('Shkruani Emailin.');
            }
            if (!this.message) {
                this.errors.push('Shkruani Mesazhin.');
            }

            e.preventDefault();
        }

    }
  }
</script>