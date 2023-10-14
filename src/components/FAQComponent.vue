<template>
    <div class="p-4 pt-40 pb-10 max-w-5xl mx-auto">
      <h1 class="text-2xl font-semibold mb-4">Pyetje të shpeshta</h1>
      <div v-if="generalDataList.length > 0" v-for="(faq, index) in generalDataList[0].faq" :key="index" class="mb-4">
        <button
          @click="toggleFAQ(index)"
          class="text-left w-full p-2 bg-gray-200 hover:bg-gray-300 font-semibold rounded-md flex items-center justify-between"
        >
          {{ faq.question }}
          <svg
            v-if="faq.open"
            class="w-5 h-5 float-right mt-1"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 15l7-7 7 7"
            />
          </svg>
          <svg
            v-else
            class="w-5 h-5 float-right mt-1"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        <div v-if="!faq.open" class="p-4 bg-white rounded-md duration-300 animate-fade-up">
            <p>{{ faq.answer }}</p>
          </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';

  export default {
    computed: {
        ...mapGetters(['listAboutContent']),  // Map the correct getter
        generalDataList() {
          return this.listAboutContent;  // Use the getter to access the data
        },
    },
    created() {
        // Call the aboutContent action to fetch the data
        this.$store.dispatch('aboutContent');
    },
    mounted(){
      window.scrollTo(0, 0)
    },
    methods: {
        toggleFAQ(index) {
        this.generalDataList[0].faq[index].open = !this.generalDataList[0].faq[index].open;
        },
    },
  };
  </script>
  