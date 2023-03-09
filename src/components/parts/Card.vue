<template>
  <div class="border">
    <div class="card min-w-[150px] max-w-[450px] min-h-96 overflow-hidden bg-cover bg-no-repeat">  
      <div class="card-inner">
        <div class="image card-front">
          <img :src="cardData.src" class="card-image transition duration-300 ease-in-out hover:scale-110" />
        </div>
        <div class="card-back">
          <p>{{ cardData.name }}</p>
        </div>
      </div>
    </div>
    <button class="p-5">Bleje tani</button>
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
  min-width: 450px;
  min-height: 450px;
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