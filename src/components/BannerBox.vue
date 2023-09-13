<template>
  <div class="max-w-5xl lg:mx-auto mx-6 mb-20">
    <h3 class="text-center font-bold text-2xl">Krijoni eksperiencen me te bukur te gjumit, me produkte te cilat premtojne jetese te shendetshme</h3>
    <div class="grid grid-cols-1 md:grid-cols-3 justify-center mt-16 gap-2">
      <div
        v-if="productList.length > 0"
        v-for="(item, index) in productList[0].about_us" 
        :key="index"
        class="h-56 text-left space-y-2"
      >
        <img class="h-10 w-10" :src="item.about_us_field.about_us_icon" :alt="'About-' + (index + 1) + ' Icon'" >
        <h1 class="font-bold">{{ item.about_us_field.about_us_title }}</h1>
        <p class="text-gray-600">{{ item.about_us_field.about_us_content }}</p>
      </div>
      <div v-else>
        Loading...
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['listAboutContent']),  // Map the correct getter
    productList() {
      return this.listAboutContent;  // Use the getter to access the data
    },
  },
  created() {
    // Call the aboutContent action to fetch the data
    this.$store.dispatch('aboutContent');
  },
};
</script>
