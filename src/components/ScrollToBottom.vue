<template>
    <div class="fixed bottom-5 right-5 z-40 w-9 h-9">
      <button
        type="button"
        class="btn drop-shadow-2xl btn-info shadow-2xl btn-to-top border bg-beige-100 hover:bg-darkblue-100 text-white font-bold p-3 hover:scale-105 duration-300 rounded-b-full"
        @click="scrollToBottom"
      >
        <img class="object-scale-down rotate-180" src="../assets/icons/up-arrow.png" alt="arrowdown">
      </button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      scrollToBottom() {
        this.scrollSmoothlyToBottom();
      },
      scrollSmoothlyToBottom() {
        const scrollOptions = {
          behavior: 'smooth', // Add smooth scrolling behavior
          block: 'end', // Scroll to the bottom of the target element
        };
  
        // Scroll to the bottom of the document body
        document.body.scrollIntoView(scrollOptions);
      },
    },
  };
  </script>
  