<template>
    <div>
        <h2>Register</h2>
        <form @submit.prevent="Register">
            <input type="text" placeholder="Email" v-model="register_form.email">
            <input type="password" placeholder="Password" v-model="register_form.password">
            <input type="submit" placeholder="Register">
            <p>Have an account? <router-link to="/login">Login here</router-link></p>
</form>
<button @click="registerWithGoogle">Register with Google</button>

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