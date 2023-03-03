<template>
    <button @click="scrollToTop" class="back-to-top">
      <i class="fa fa-arrow-up"></i>
    </button>
  </template>
  
  <script>
  export default {
    methods: {
      scrollToTop() {
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
    },
  };
  </script>
  
  <style>
  .back-to-top {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 50%;
    background-color: #333;
    color: #fff;
    font-size: 24px;
    cursor: pointer;
  }
  
  .back-to-top i {
    margin-top: 8px;
  }
  </style>
  