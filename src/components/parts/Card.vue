<template>
  <div class="border shadow-2xl mx-3 w-full h-full">
    <div class="card  overflow-hidden bg-cover bg-no-repeat">  
      <div class="card-inner">
        <div class="image card-front relative ">
          <div v-if="cardData.discount" class="absolute right-1 p-3 border bg-white font-bold animate-bounce hover:bg-yellow-50">- {{cardData.discount_percentage }}%</div>
          <img :src="cardData.post_image" class="card-image w-full h-full transition duration-300 ease-in-out hover:scale-110 max-h-[250px] min-h-[250px]" />
        </div>
      </div>
    </div>
    <p class="text-center text-md md:text-xl pt-5 pb-2">{{ cardData.title }}</p>
    <div class="flex justify-around items-center p-2">
      <div class="flex flex-col">
        <div class="flex gap-2" v-if="cardData.discount">
          <p class="text-gray-400 line-through text-base">{{ cardData.price }}€</p>
          <p class="text-base">{{ getDiscountPrice }}€</p>
        </div>
        <div v-else>
          <p class="text-base">{{ cardData.price }}€</p>
        </div>
        <div class="grid mt-2">
          <a @click="navigateToProduct" class="hover:text-orange-600 cursor-pointer duration-200 text-base text-center hover:text-lg">
            Shiko detajet &#8594;
          </a>
          <div class="b mt-2 mx-auto flex justify-center items-center">
            <div class="i px-5 py-2 bg-gradient-to-br from-blue-400 to-blue-600 items-center rounded-xl shadow-2xl cursor-pointer overflow-hidden transform hover:scale-x-105 hover:scale-y-105 transition duration-300 ease-out">
              <a class="text-center text-white font-semibold z-10 pointer-events-none flex justify-content items-center">Shto në shportë</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import router from '../../router';

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
  methods:{
    navigateToProduct() {
      router.push({ name: 'ProductDetails', params: { id: this.cardData.id } });
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
    created(){
      console.log(this.cardData)
    }
};
</script>
<style scoped>
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