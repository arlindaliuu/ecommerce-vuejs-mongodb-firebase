<template>
  <div class="border shadow-2xl">
    <div class="card min-w-[350px] min-h-[350px] sm:min-w-[300px] sm:min-h-[300px] md:min-h-[350px] md:min-w-[350px] lg:min-w-[460px] lg:min-h-[460px] xl:min-w-[600px] xl:min-h-[600px] 2xl:min-w-[700px] 2xl:min-h-[700px] overflow-hidden bg-cover bg-no-repeat">  
      <div class="card-inner">
        <div class="image card-front">
          <img :src="cardData.imageField" class="card-image transition duration-300 ease-in-out hover:scale-110" />
        </div>
        <div class="card-back p-5">
          <h1 class="text-center text-3xl font-medium">Dyshek {{ cardData.title }}</h1>
          <p class="leading-8 font-light pt-4 px-5">{{ cardData.description }}</p>
        </div>
      </div>
    </div>
    <div class="flex justify-around items-center p-2">
      <p class="text-center text-md md:text-xl font-medium">Dyshek {{ cardData.title }}</p>
      <router-link :to="{ name: 'ProductDetails', params: { id: cardData._id } }" class="px-3 py-2 text-green-900 hover:px-4 hover:text-white hover:bg-main duration-300 text-xl border border-green-900">Shiko më shumë</router-link>
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
  },
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
.card-front, .card-back {
  position: absolute;
  backface-visibility: hidden;
}
.card-back {
  transform: rotateY(180deg);
}
</style>