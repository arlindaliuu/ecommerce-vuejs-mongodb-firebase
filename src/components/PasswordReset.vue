<template>
    <div class="p-6 mx-auto border mt-24 w-96">
      <h2 class="text-xl">Reseto Fjalëkalimin - LULIFlex</h2>
      <form class="flex flex-col" @submit.prevent="resetPassword">
        <label class="mt-4">Fjalëkalimi ri</label>
        <input class="border p-1" v-model="password" type="password" required />
        <label class="mt-4">Konfirmo Fjalëkalimin</label>
        <input class="border p-1" v-model="confirmPassword" type="password" required />
        <button type="submit p-5 border bg-blue-500">Reseto fjalëkalimin</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        token: this.$route.params.token, // Access the token from the route
        password: '',
        confirmPassword: '',
      };
    },
    methods: {
      async resetPassword() {
        if (this.password !== this.confirmPassword) {
          alert('Passwords do not match.');
          return;
        }
  
        try {
          // Send a request to your API to reset the password
          const response = await axios.post('https://api.luliflex.com/wp-json/custom/v1/reset-password', {
            token: this.token,
            newPassword: this.password,
          },{
                withCredentials: true,
            });
  
          alert('Password reset successful. You can now log in with your new password.');
          this.$router.push('/login'); // Redirect to the login page
        } catch (error) {
          console.error('Password reset request failed:', error);
          alert('Password reset request failed. Please try again later.');
        }
      },
    },
  };
  </script>
  