<template>
    <header :class="[this.classes, headerClass]" class="backdrop-blur-xl bg-white/30 z-30 transition ease-in-out delay-150 duration-300 fixed w-full  grid md:grid-rows-1 grid-cols-2  text-orange-600 font-serif md:pr-20 md:pl-10">
        <div class="logo flex lg:justify-self-start justify-self-center ">
            <img src="../assets/icons/logo-luliflex.png" class="self-center w-64 xl:w-96 max-h-[130px]" />
        </div>
        <div class="items-center lg:hidden flex justify-end p-10">
          <button @click="hadleShowMenu"><img src="../assets/icons/menu.png" /></button>
        </div>
        <div v-if="showMenu" :class="this.headerFontColor" class="grid grid-cols-1 whitespace-nowrap lg:flex col-span-2 lg:col-span-1 animate-ease-linear gap-y-1 lg:gap-y-0 animate-fade-down duration-1000 self-center justify-self-start lg:justify-self-end pl-5 lg:pl-0 text-xl">
            <router-link to="/" class="self-center lg:ml-4  uppercase link link-underline link-underline-black">Ballina</router-link> 
            <router-link to="/shop" class="self-center lg:ml-4 uppercase link link-underline link-underline-black">Dyshek</router-link>
            <router-link to="/shop" class="self-center lg:ml-4 uppercase link link-underline link-underline-black">Ofertë</router-link>
            <router-link to="/about" class="self-center lg:ml-4 lg:pr-4 uppercase link link-underline link-underline-black border-none lg:border-r-2">Rreth nesh</router-link>
            <router-link to="/cartitems" class="self-center relative lg:ml-4 uppercase link link-underline link-underline-black hidden lg:block">
              <img class="max-w-[32px] min-w-[32px] max-h-[32px] min-h-[32px] relative z-20" src="../assets/icons/shopping-cart.webp" alt="shoping bag" />
              <span class="absolute top-[-13px] left-[13px]">{{ cartItemCount }}</span>
            </router-link>
            <router-link v-if="userEmail" to="/userprofile" class="self-center block lg:hidden lg:ml-4 uppercase link link-underline link-underline-black">Profili</router-link>
            <a v-if="userEmail" @click="$store.dispatch('logout')" class="self-center block lg:hidden lg:ml-4 uppercase link link-underline link-underline-black">Shkyçu</a>
            <router-link to="/cartitems" class="self-center lg:ml-4 uppercase link link-underline link-underline-black block lg:hidden">
              Shporta
            </router-link>
            <div v-if="userEmail" class="relative">
                <button @click="showDropdown = !showDropdown" id="dropdownHoverButton" :class="headerFontColor" class="hidden animate-ease-linear animate-fade-down duration-1000 self-center items-center lg:flex md:ml-4 uppercase" type="button">Profili<svg class="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
                <div v-if="showDropdown" id="dropdownHover" class="z-10 right-3 bg-white divide-y absolute overflow-y-auto max-h-[200px]: divide-gray-100  shadow w-44 dark:bg-gray-700">
                  <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
                    <li v-if="userEmail">
                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            {{ userEmail }}
                        </a>
                      </li>
                    <li v-if="isAdmin">
                      <router-link to="/dashboard" href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</router-link >
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
                <router-link to="/register" class="self-center lg:ml-4 uppercase text-orange-600 link link-underline link-underline-black">Register / </router-link>
                <router-link to="/login" class="self-center uppercase text-orange-600 link link-underline link-underline-black">Login</router-link>
            </div>
    </div>
    </header>


</template>
<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    headerClass: [String, Object], // Define the headerClass prop to accept a string or object
  },
    data() {
        return{
            title: "hi there",
            classes: "",
            newValue: "",
            headerFontColor: "text-white",
            windowTop: 0,
            showDropdown: false,
            showMenu: false,
            isAdmin: false
        }
    },  
        mounted() {
        const mediaQuery = window.matchMedia('(min-width: 1024px)');
          if (mediaQuery.matches) {
              this.showMenu = true;
          }else{
            this.showMenu = false;
          }
          mediaQuery.addEventListener('change', (event) => {
          if (event.matches) {
            this.showMenu = true;
          } else {
            this.showMenu = false;
          }
        });
        this.isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
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
                this.classes = "!bg-white"
                this.headerFontColor = "text-orange-600 "
            }
            },
            hadleShowMenu(){
              this.showMenu = !this.showMenu;
            }
        },
        computed: {
            userEmail() {
                return this.$store.state.user ? this.$store.state.user.email : '';                
            },
            ...mapGetters(['cartItemCount']), // Import the cartItemCount getter
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