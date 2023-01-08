<template>
    <div>
        <h2>Register</h2>
        <form @submit.prevent="Register">
            <input type="text" placeholder="Email" v-model="email">
            <input type="password" placeholder="Password" v-model="password">
            <input type="submit" placeholder="Register">
            <p>Have an account? <router-link to="/login">Login here</router-link></p>
        </form>
    </div>
</template>
<script>
import {ref} from 'vue';
import * as firebase from "firebase/app";
import 'firebase/auth'
export default{
    setup(){
        const email = ref("");
        const password = ref("");

        const Register = () =>{
            firebase
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value)
                .then(user =>{
                    alert(user);
                })
                .catch(err => alert(err.message));
        }
        return{
            Register,
            email,
            password
        }
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