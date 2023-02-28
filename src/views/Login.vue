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
<style scoped>
.container {
    position:relative;
    width: 768px;
    height: 480px;
    border-radius: 10px;
    overflow: hidden;
    background: linear-gradient(to bottom, #efefef, #ccc);
     box-shadow: 0 15px 30px rgba(0, 0, 0, .2),
                0 15px 30px rgba(0, 0, 0, .2),           
}
.overlay-container{
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transorm .5s ease-in-out;
    z-index: 100;
}
.overlay {
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    background: linear-gradient(to bottom,#7FD825, #009345 );
    color: #fff;
    transform: translateX(0);
    transition: transform .5s ease-in-out;
}
@mixin overlays($property) {
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    padding: 70px 40px;
    width: calc (50% - 80px);
    height: calc (100% - 140px);
    text-align: center;
    transform: translateX($property);
    transition: transform .5s ease-in-out;
}
.overlay-left{
    @include overlays(-20%);

}
.overlay-right { 
    @include overlays(0);
    right: 0;
}

h2{
    margin: 0;
}
p{
    margin: 20px 0 30px;
}
a{
    color: #222;
    text-decoration: none;
    margin: 15px 0;
    font-size: 1rem;

}
button {
    border-radius: 20px;
    border: 1px solid #009345;
    background-color: #009345;
    color: #fff;
    font-size: 1rem;
    font-weight: bold;
    padding: 10px 40px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform .1s ease-in;

 
}
button.invert{
    background-color: transparent;
    border-color: #fff;
}

form{
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    padding: 90px 60px;
    width: calc(50% - 120px);
    height: calc(100% - 180px);
    text-align: center;
    background: linear-gradient(to bottom, #efefef,#ccc);
    transition: all .5s ease-in-out;
    
}
input {
        background-color: #eee;
        border: none;
        padding: 8px 15px;
        margin: 6px 0;
        width: calc(100% - 30px);
        border-radius: 15px;
        border-bottom: 1px solid #ddd;
        box-shadow: inset 0 1px 2px rgba(0, 0, 0, .4),
                          0 -1px 1px #fff,
                          0 1px 0 #fff;
        overflow: hidden;
    }
  
.sign-in{
    left: 0;
    z-index: 2;
}
.sign-up{
    left: 0;
    z-index: 1;
    opacity: 0;
}
.sign-up {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
    
}
.overlay-container {
    transform: translateX(-100%);
    }
    .overlay {
        transform: translateX(50%);
    }

</style>