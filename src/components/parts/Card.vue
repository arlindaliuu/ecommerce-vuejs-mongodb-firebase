<template>
  <div>
    <Toaster type="success" ref="toaster" />
    <div class="border card-main shadow-2xl w-full h-full">
      <div class="card overflow-hidden bg-cover bg-no-repeat">  
        <div class="card-inner">
          <div class="image card-front relative ">
            <div v-if="cardData.discount" class="absolute right-1 p-3 border bg-white font-bold animate-bounce hover:bg-yellow-50">- {{cardData.discount_percentage }}%</div>
            <img :src="cardData.post_image" class="card-image transition duration-300 ease-in-out hover:scale-110 w-full h-full" />
          </div>
        </div>
      </div>
      <p @click="navigateToProduct" class="text-center text-md cursor-pointer md:text-xl pt-5 pb-2">{{ cardData.title }}</p>
      <div class="flex justify-around items-center p-2">
        <div class="flex flex-col">
          <div class="flex gap-2 justify-center" v-if="cardData.discount">
            <p class="text-gray-400 line-through text-base">{{ cardData.price }}€</p>
            <p class="text-base text-center text-red-900">{{ getDiscountPrice }}€</p>
          </div>
          <div v-else>
            <p class="text-base text-center">{{ cardData.price }}€</p>
          </div>
          <div class="grid mt-2">
            <a @click="navigateToProduct" class="hover:text-orange-600 cursor-pointer duration-200 text-base text-center hover:text-lg">
              Shiko detajet &#8594;
            </a>
            <div @click="addToCart" class="b mt-2 mx-auto flex justify-center items-center">
              <div class="i px-5 py-2 bg-gradient-to-br from-blue-400 to-blue-600 items-center rounded-xl shadow-2xl cursor-pointer overflow-hidden transform hover:scale-x-105 hover:scale-y-105 transition duration-300 ease-out">
                <a class="text-center text-white font-semibold z-10 pointer-events-none flex justify-content items-center">Shto në shportë</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import router from '../../router';
import Toaster from '../../components/Toaster.vue'

export default {
  name: 'Card',
  props: {
    cardData: {
      type: Object,
      required: true,
    },
    data() {
      return {
        deletedPrice: null
      }
    },
  },
  components:{
    Toaster,
  },
  methods:{
    navigateToProduct() {
      router.push({ name: 'ProductDetails', params: { id: this.cardData.id } });
    },
    addToCart() {
      // Add the card data to the cart using Vuex
      this.$store.commit('addToCart', this.cardData)
      this.$refs.toaster.show(`U shtua në shportë me sukses!`, "success");

    },
  },
  computed: {
  getDiscountPrice() {
    if (this.cardData.discount) {
      const deletedPrice = this.cardData.price * this.cardData.discount_percentage / 100;
      const discountPrice = this.cardData.price - deletedPrice;
      return discountPrice.toFixed(2);
    } else {
      return this.cardData.price.toFixed(2);
    }
  },
    truncatedDescription() {
      const words = this.cardData.content.split(' ');
      const limit = 50;
      if (words.length > limit) {
        return words.slice(0, limit).join(' ') + '...';
      }
      return this.cardData.description;
    }},
};
</script>
<style scoped>
.card-main{
  border: 1px solid var(--Stroke, rgba(105, 120, 255, 0.47));
  background: var(--kit-colors-white-base-fdfefd, #FDFEFD);
  border-image-slice: 1;
}
.i::before {
  content: "";
  position: absolute;
  width: 0px;
  height: 0px;
  opacity: 20%;
  background: white;
/*   background: #3B82F6; */
  /* Centering */
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}

.i:hover:before {
  animation: anim-in 0.7s forwards ease-out;
}

@keyframes anim-in {
  100% {
    opacity: 0%;
    border-radius: 0;
    width: 600px;
    height: 600px;
  }
  0% {
    width: 0px;
    height: 0px;
    border-radius: 100%;
    opacity: 20%;
  }
}
</style>