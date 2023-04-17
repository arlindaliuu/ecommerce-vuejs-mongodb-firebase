<template>
  <div class="border shadow-2xl mx-3">
    <div class="card  overflow-hidden bg-cover bg-no-repeat">  
      <div class="card-inner min-w-[350px] min-h-[350px] sm:min-w-[300px] sm:min-h-[300px] md:min-h-[350px] md:min-w-[300px] lg:min-w-[460px] lg:min-h-[460px]">
        <div class="image card-front relative ">
          <div v-if="cardData.discount" class="absolute right-1 p-3 border bg-white font-bold animate-bounce hover:bg-yellow-50">- {{cardData.discountPercentage }}%</div>
          <img :src="cardData.imageField" class="card-image w-full h-full transition duration-300 ease-in-out hover:scale-110" />
        </div>
        <div class="card-back p-5">
          <h1 class="text-center text-3xl font-medium">{{ cardData.title }}</h1>
          <p class="leading-8 font-light pt-4 px-5">{{ truncatedDescription }}</p>
        </div>
      </div>
    </div>
    <p class="text-center text-md md:text-xl py-5">{{ cardData.title }}</p>
    <div class="flex justify-around items-center p-2">
      <div class="flex">
        <div v-if="cardData.discount">
          <p class="text-gray-400 line-through text-xl">{{ cardData.price }}€</p>
          <p class="text-2xl text-red-700">{{ getDiscountPrice }}€</p>
        </div>
        <div v-else>
          <p class="text-xl">{{ cardData.price }}€</p>
        </div>

      </div>
      <router-link :to="{ name: 'ProductDetails', params: { id: cardData._id } }" class="px-3 py-2 text-green-900 text-center hover:px-4 hover:text-white hover:bg-main duration-300 text-xl border border-green-900">Shiko më shumë</router-link>
    </div>
  </div>
</template>
<script>
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
  computed: {
  getDiscountPrice() {
    if (this.cardData.discount) {
      const deletedPrice = this.cardData.price * this.cardData.discountPercentage / 100;
      const discountPrice = this.cardData.price - deletedPrice;
      return discountPrice.toFixed(2);
    } else {
      return this.cardData.price.toFixed(2);
    }
  },
    truncatedDescription() {
      const words = this.cardData.description.split(' ');
      const limit = 50;
      if (words.length > limit) {
        return words.slice(0, limit).join(' ') + '...';
      }
      return this.cardData.description;
    }
  }
};
</script>
<style>
.card{
  perspective: 1000px;
}
.card-inner {
  position: relative;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}
.card:hover .card-inner {
  transform: rotateY(180deg);
}
.card-front{
  position: absolute;
  backface-visibility: hidden;
}
.card-back {
  transform: rotateY(180deg);
  backface-visibility: hidden;
}
</style>