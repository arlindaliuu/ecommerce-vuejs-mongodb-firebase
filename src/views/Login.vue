<template>
    <main>
        <section class="forms">
            <form @submit.prevent="login" class="login">
                <h2>Login</h2>
                <input type="email" placeholder="Email adress" v-model="login_form.email" />
                <input type="password" v-model="login_form.password" />
                <input type="submit" value="Login">
                <p id="infolog" class="text-red-500"></p>
            </form>
            <button @click="registerWithGoogle">Login with Google</button>

        </section>
    </main>
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
