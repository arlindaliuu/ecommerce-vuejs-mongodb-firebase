<template>
  <Header :class="'bg-orange-600/30'" />
    <div class="bg-gray-100 pt-40">
      <ContactForm />
    </div>
  <Footer />
</template>
  
  <script>
  import Toaster from '../components/Toaster.vue';
  import axios from 'axios';
  import Header from '../components/Header.vue';
  import ContactForm from '../components/ContactForm.vue';
  import Footer from '../components/Footer.vue';
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
      Header,
      Footer,
      ContactForm
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