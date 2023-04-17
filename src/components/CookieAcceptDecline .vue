<template>
  <div>
    <div v-if="showCookieBanner" class="animate-fade-up fixed bottom-0 left-0 w-full z-50">
      <div
        class="fixed bottom-0 min-h-40 left-1/2 transform -translate-x-1/2 mb-4 bg-[#FEFCF3] text-white p-4 w-11/12 md:w-9/12 lg:w-w-9/12 flex flex-col md:flex-row items-center justify-between"
      >
        <div class="flex items-center mb-4 md:mb-0">
          <img class="w-16 md:w-20 mr-4 md:mr-6" src="../assets/icons/cookieicon.png" alt="cookie icon" />
          <p class="text-gray-800 font-light">{{ message }}</p>
        </div>
        <div class="flex items-center">
          <a
            class="cursor-pointer inline-block text-center px-6 md:px-10 py-3 md:py-4 bg-gray-800 text-white mr-3 md:mr-5"
            @click="handleDecline"
          >
            {{ buttonDeclineText }}
          </a>
          <a
            class="cursor-pointer inline-block text-center px-6 md:px-10 py-3 md:py-4 bg-orange-600 text-white font-light"
            @click="handleAccept"
          >
            {{ buttonAcceptText }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CookieAcceptDecline from 'vue-cookie-accept-decline';
import VueCookies from 'vue-cookies';

export default {
  data() {
    return {
      showCookieBanner: false,
      buttonDeclineText: 'Refuzo',
      buttonAcceptText: 'Prano',
      message:
        'Kjo faqe interneti përdor cookie për të përmirësuar përvojën tuaj të shfletimit dhe për të personalizuar përmbajtjen dhe reklamat. Duke klikuar Prano, ju pranoni përdorimin tonë të cookie. Mund të mësoni më shumë rreth mënyrës se si ne përdorim skedarët dhe të menaxhoni preferencat tuaja në Politikën tonë të Cookie.',
    };
  },
  name: 'App',
  components: {
    CookieAcceptDecline,
  },
  mounted() {
    if (VueCookies.get('myCookie') !== null) {
      this.showCookieBanner = false;
    } else {
      setTimeout(() => {
        this.showCookieBanner = true;
      }, 8000);
    }
  },
  methods: {
    handleAccept() {
      const name = 'myCookieValue'; // set the name of the cookie
      VueCookies.set('myCookie', name, '72h'); 
      this.showCookieBanner = false;
    },
    handleDecline() {
      this.showCookieBanner = false;
    },
  },
};
</script>

  <style>
  .animate-fade-up {
    animation: fade-up 0.5s ease-out forwards;
  }
  
  @keyframes fade-up {
    from {
      opacity: 0;
      transform: translateY(1rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  </style>