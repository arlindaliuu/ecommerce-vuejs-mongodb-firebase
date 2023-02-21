
<template>
    <header :class="this.classes" class="backdrop-blur-xl transition ease-in-out delay-150 duration-300 fixed  w-full h-32 grid md:grid-rows-1 md:grid-cols-2 grid-cols-1 text-orange-600 font-serif pr-20 pl-10">
        <div class="logo flex md:justify-self-start justify-self-center">
            <img src="../../dist/images/logo-luliflex.png" class="self-center w-96" />
        </div>
        <div :class="this.headerFontColor" class="flex animate-ease-linear animate-fade-down duration-1000 self-center md:justify-self-end justify-self-center text-xl">
            <router-link to="/" class="self-center md:ml-4 uppercase link link-underline link-underline-black">Ballina</router-link> 
            <router-link to="/about" class="self-center md:ml-4 uppercase link link-underline link-underline-black">Dyshek</router-link>
            <router-link to="/about" class="self-center md:ml-4 uppercase link link-underline link-underline-black">Ofertë</router-link>
            <router-link to="/about" class="self-center md:ml-4 uppercase link link-underline link-underline-black">Rreth nesh</router-link>
            <div v-if="userEmail" class="relative">
                <button @click="showDropdown = !showDropdown" id="dropdownHoverButton" :class="headerFontColor" class="animate-ease-linear animate-fade-down duration-1000 self-center items-center flex md:ml-4 uppercase" type="button">Profili<svg class="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
                <div v-if="showDropdown" id="dropdownHover" class="z-10 right-3 bg-white divide-y absolute overflow-y-auto max-h-[200px]: divide-gray-100  shadow w-44 dark:bg-gray-700">
                  <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
                    <li v-if="userEmail">
                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            {{ userEmail }}
                        </a>
                      </li>
                    <li>
                      <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                    </li>
                    <li>
                      <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Konfigurimet</a>
                    </li>
                    <li>
                      <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Preferencat</a>
                    </li>
                    <li>
                      <a @click="$store.dispatch('logout')" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Shkyçu</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div v-else>
                <router-link to="/register" class="self-center md:ml-4 uppercase text-orange-600 link link-underline link-underline-black">Register / </router-link>
                <router-link to="/login" class="self-center uppercase text-orange-600 link link-underline link-underline-black">Login</router-link>
            </div>

              
              
        <!-- <div id="nav" class="self-center md:ml-4 border-2 bg-white px-2" v-if="$store.state.user">
            <button @click="$store.dispatch('logout')">Logout</button>
        </div> -->
    </div>
    </header>


</template>
<script>

import store from '../store/index';
import HeaderUp from './HeaderUp.vue';
// Accessing state
export default {
    components:{
        HeaderUp
    },
    data() {
        return{
            title: "hi there",
            classes: "",
            newValue: "",
            headerFontColor: "text-white",
            windowTop: 0,
            showDropdown: false
        }
    },  
        mounted() {
        window.addEventListener("scroll", this.onScroll)
        },
        beforeDestroy() {
        window.removeEventListener("scroll", this.onScroll)
        },
            methods: {
            onScroll(e) {
            this.windowTop = e.target.documentElement.scrollTop 
            if(this.windowTop < 10){
                this.classes = ""
                this.headerFontColor = "text-white"
            }

            if(this.windowTop > 5){
                this.newValue = this.windowTop;
                this.classes = "animate-fade-down animate-ease-linear bg-white"
                this.headerFontColor = "text-orange-600 "
            }


            }
        },
        computed: {
            userEmail() {
                return this.$store.state.user ? this.$store.state.user.email : '';
            }
        }
}
</script>
<style scoped>

.link-underline {
    border-bottom-width: 0;
    background-image: linear-gradient(transparent, transparent), linear-gradient(#fff, #fff);
    background-size: 0 3px;
    background-position: 0 100%;
    background-repeat: no-repeat;
    transition: background-size .5s ease-in-out;
}

.link-underline-black {
    background-image: linear-gradient(transparent, transparent), linear-gradient(rgb(24, 50, 96), rgb(218, 127, 0))
}

.link-underline:hover {
    background-size: 100% 3px;
    background-position: 0 100%
}
.before-enter{
    opacity: 0;
    transform: translateY(100px);
    transition: all 2s ease-out;
  }
  .enter{
    opacity: 1;
    transform:translateY(0px)
  }
</style>