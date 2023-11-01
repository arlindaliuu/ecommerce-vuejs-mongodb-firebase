<template>
      <footer>
          <div class="p-10 bg-gray-800 text-gray-200 z-20 relative">
              <div class="max-w-7xl mx-auto">
                  <div class="grid grid-cols-1 md-cols-2 lg:grid-cols-4 gap-2">
                      <div class="mb-5">
                        <p class="text-gray-500">
                          15. Novembra <br>
                          Preševo 17523 <br><br>
                          <strong>Tel: </strong><a href="tel:+381628444616">+381 62 8444 616</a><br>
                          <strong>Email: </strong>contact@luliflex.com<br>
                        </p>
                      </div>
                      <div class="mb-5">
                          <h4>Lidhje të dobishme</h4>
                          <ul class="text-gray-500 mt-2">
                              <li class="pb-4"><i class="fa fa-chevron-right text-green-900"></i><router-link to="/" href="#" class="hover:text-green-900">Ballina</router-link></li>         
                              <li class="pb-4"><i class="fa fa-chevron-right text-green-900"></i><router-link to="/about" href="#" class="hover:text-green-900">Rreth nesh</router-link></li>
                              <li class="pb-4"><i class="fa fa-chevron-right text-green-900"></i><router-link to="/services" href="#" class="hover:text-green-900">Serviset</router-link></li>
                              <li class="pb-4"><i class="fa fa-chevron-right text-green-900"></i><router-link to="/faq" href="#" class="hover:text-green-900">Pyetjet më të shpeshta</router-link></li>
                              <li class="pb-4"><i class="fa fa-chevron-right text-green-900"></i><router-link to="/register" href="#" class="hover:text-green-900">Regjistrohu</router-link></li>
                          </ul>
                      </div> 
                      <div class="mb-5">
                          <h4 class="pb-4">Shërbimet tona</h4>
                          <ul class="text-gray-500 mt-2">
                              <li class="pb-4"><i class="fa fa-chevron-right text-green-900"></i><router-link to="/contactus" class="hover:text-green-900">Shop</router-link></li>
                              <li class="pb-4"><i class="fa fa-chevron-right text-green-900"></i><router-link to="/contactus" class="hover:text-green-900">Kontakti</router-link></li>
                              <li class="pb-4"><i class="fa fa-chevron-right text-green-900"></i><router-link to='/privacy-policy' class="hover:text-green-900">Politika e Privatësisë</router-link></li>
                              <li class="pb-4"><i class="fa fa-chevron-right text-green-900"></i><router-link to='/' class="hover:text-green-900">Marketing</router-link></li>
                              <li class="pb-4"><i class="fa fa-chevron-right text-green-900"></i><router-link to='/' class="hover:text-green-900">Oferta</router-link></li>
                          </ul>
                      </div>
                      <div class="mb-5">
                          <h4 class="pb-4">Ji në kontakt!</h4>
                          <p class="text-gray-500 pb-2">Bashkohuni me 25.000 të tjerë dhe mos humbisni udhëzimet për ofertat të reja dhe më shumë</p>
                          <form class="flex flex-row flex-wrap">
                             <label> <input type="text" placeholder="email@gmail.com" class="text-gray-500 p-2 focus:border-green-900"> </label>
                              <button class="p-2 w-1/3 bg-green-900 text-white font-light hover:bg-green-900">ABONOHU</button>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
          <div class="w-full bg-gray-900 text-gray-500 pc-10">
              <div class="max-w-7xl flex flex-col sm:flex-row py-4 mx-auto justify-between items-center">
                  <div class="text-center">
                      COPYRIGHT &copy; {{ currentYear }} <strong><span>LULI-FLEX </span></strong><span></span>
                  </div>
                  <div class="text-center text-xl text-white">
                    <a
                    v-if="generalDataList.length > 0"
                    v-for="(socialMedia, index) in generalDataList[0].social_media"
                    :key="index"
                    :href="socialMedia.social_media_data.social_media_url"
                    class="w-12 h-12 rounded-full mx-3 inline-block p-[5px]"
                    target="_blank"
                    >
                    <img
                        class="w-12 h-12 object-cover"
                        :src="socialMedia.social_media_data.social_media_icon"
                        :alt="socialMedia.social_media_data.social_media_alt"
                    />
                    </a>
                </div>
              </div>
         
          </div> 
      </footer>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default{
    data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
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
