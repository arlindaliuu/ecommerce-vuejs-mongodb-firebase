<template>
    <div v-if="!$store.state.user">
      <div v-show="showModal" class="fixed z-10 inset-0 overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen">
          <div class="fixed inset-0 transition-opacity" aria-hidden="true">
            <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
  
          <div class="bg-white rounded-lg mx-2 overflow-hidden shadow-xl transform transition-all sm:max-w-2xl sm:w-full animate-fade-down animate-duration-[2000ms] animate-ease-in-out">
            <div class="bg-white p-4">
              <h3 class="text-lg font-medium leading-6 text-gray-900">
                Krijo llogari
              </h3>
              <div class="mt-2 flex">
                <p class="text-md text-gray-500">
                  Nuk keni llogari ende? Nxito dhe regjistrohuni tani 
                </p>
                <router-link to="/register" class="border ml-auto px-5 py-2 bg-orange-600 text-white font-light rounded-full hover:bg-orange-500 self-center">Regjistrohu</router-link>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button type="button" @click="showModal = false" class="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                Mbyll
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        showModal: false,
      };
    },
    mounted() {
      setTimeout(() => {
        this.showModal = true;
      }, 5000);
    },
  };
  </script>