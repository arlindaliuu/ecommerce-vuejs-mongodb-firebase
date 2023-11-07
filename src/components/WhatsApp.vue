<template>
    <div v-if="generalDataList.length > 0" class="whatsapp-widget animate-bounce">
      <a :href="`https://api.whatsapp.com/send?phone=${generalDataList[0].site_number}`"
        target="_blank" class="whatsapp-icon">
        <img src="../assets/image/whatsapp.webp" alt="WhatsApp">
      </a>
    </div>
  </template>
  <script>
import { mapActions, mapGetters } from 'vuex';

export default{
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
}
  </script>
  <style scoped>
  .whatsapp-widget {
    position: fixed;
    bottom: 20px;
    left: 20px;
  }
  
  .whatsapp-icon {
    display: block;
    width: 42px;
    height: 42px;
    background-color: green;
    border-radius: 50%;
    text-align: center;
    line-height: 50px;
    color: white;
    text-decoration: none;
  }
  </style>
  