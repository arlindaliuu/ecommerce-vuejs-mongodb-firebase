<template>
    <Header />
    <h1>Shop</h1>
    <div>
        <img class="w-full max-h-[500px] object-cover" src="../assets/image/add2.jpg" />
    </div>
    <div class="text-lg font-light mx-2 lg:mx-32 leading-7 p-5 -mt-32 lg:-mt-10 shadow-2xl bg-white z-20 relative text-green-900">
    <p>
        Në dyqanin tonë të dyshekëve, ne ofrojmë një gjumë të përsosur të natës për të gjithë. Nëse jeni duke kërkuar për një dyshek të butë dhe të rehatshëm për një pushim të mirë gjatë natës, ose një dyshek më të fortë për mbështetjen e duhur të shtyllës kurrizore, ne kemi dyshekun ideal për ju.
        Ne e kuptojmë se të gjithë kanë preferenca të ndryshme për të fjetur, kjo është arsyeja pse ne disponojmë një gamë të gjerë dyshekësh, duke përfshirë shkumë memorie, supë xhepi dhe dyshekë latex, të gjitha me çmime konkurruese. Stafi ynë i ditur është gjithmonë gati për t'ju ndihmuar të zgjidhni dyshekun e përsosur për nevojat tuaja individuale, në mënyrë që të mund të flini të qetë duke ditur se keni bërë zgjedhjen e duhur.
    </p>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-5 mt-24">
        <div class="col-span-1 flex items-center justify-start">
            <Breadcrumbs class="col-span-3 px-5 text-xl font-light"/>
        </div>
        <div class="col-span-4 py-10 flex justify-center lg:justify-between">
            <div class="self-center lg:p-0 lg-block p-5 flex flex-wrap justify-center">
                <input class="border w-full lg:w-96 lg:mx-0 p-2.5 " type="search" v-model="searchTerm" />
                <button class="lg:ml-4 border lg:mt-0 mt-5 p-2.5 bg-indigo-600 text-white rounded-md" @click="searchProducts">Kërko produktin</button>
            </div>
            <img src="../assets/icons/logo-luliflex.png" class="self-center w-96 max-h-[150px] lg:block hidden" />
        </div>
        <div v-if="!showFilter" class="col-span-1 lg:hidden w-full flex justify-center">
            <button class="font-light" @click="showPriceFilter">Filtro sipas çmimit</button>
            <img src="../assets/icons/show.png" class="w-7 h-7 ml-3">
        </div>
        <div v-if="showFilter" class="col-span-1 mx-5 border mb-32 p-10 relative">
            <button class="absolute top-1 right-1 block lg:hidden" @click="showPriceFilter">
            <img src="../assets/icons/hidden.png" class="w-7 h-7"/>
            </button>
            <h2 class="font-content text-3xl py-5">Filtro sipas çmimit </h2>
            <hr class="p-4">
            <div class="mb-4">
              <label for="min-price" class="block font-content font-medium mb-2">Çmimi minimal</label>
              <input type="number" id="min-price" class="border p-2.5 w-full" v-model.number="minPrice" />
            </div>
            <div class="mb-4">
              <label for="max-price" class="block font-content font-medium mb-2">Çmimi maksimal</label>
              <input type="number" id="max-price" class="border p-2.5 w-full" v-model.number="maxPrice" />
            </div>
          </div>          
        <div class="col-span-4 border mb-32 p-5">
            <div class="grid grid-cols-1 ">
                <div v-if="loading" class="flex justify-center items-center w-full h-64">
                    <div class="h-auto bg-white">
                        <div class="flex justify-center items-center h-full">
                          <img class="h-16 w-16" src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif" alt="Spinner">
                        </div>
                    </div>
                </div>
                <div v-else-if="filteredProductList.length > 0" class="grid grid-cols-1 gap-10 md:grid-cols-3 mt-10">
                  <Card v-for="product in filteredProductList" :key="product.id" :card-data="product" />
                </div>
                <div v-else class="w-full">
                    <p class="text-center font-light text-4xl">Nuk u gjet asnjë rezultat!</p>
                </div>
              </div>              
        </div>
    </div>
    <Footer />
</template>

<script>
import Footer from '../components/Footer.vue';
import Header from '../components/Header.vue';
import Card from '../components/parts/Card.vue';
import Breadcrumbs from '../components/Breadcrumbs.vue';
import { mapActions, mapGetters } from 'vuex';
export default {
    components: {
        Footer,
        Header,
        Card,
        Breadcrumbs
    },
    computed: {
    ...mapGetters(['listProduct']),
    productList() {
        return this.listProduct;
    },
    filteredProductList() {
      // Filter the product list based on the search query and price range
      const searchTermLowerCase = this.searchTerm.toLowerCase();
      const minPrice = this.minPrice ? Number(this.minPrice) : 0;
      const maxPrice = this.maxPrice ? Number(this.maxPrice) : Infinity;
      return this.productList.filter(product =>
       product.title.toLowerCase().includes(searchTermLowerCase)
       && product.price >= minPrice && product.price <= maxPrice
      );
    }
    },
        data() {
        return {
            searchTerm: '',
            minPrice: '1',
            maxPrice: '',
            loading: true,
            showFilter: true
        };
        },

    mounted() {
        window.scrollTo(0, 0);
        this.listProducts().then(() => {
            this.loading = false;
        });
    },
    methods: {
        ...mapActions(['listProducts']),
        searchProducts() {
            // Trigger the product search action
            this.listProducts();
        },
        showPriceFilter(){
            this.showFilter = !this.showFilter;
        }
    },
};
</script>
