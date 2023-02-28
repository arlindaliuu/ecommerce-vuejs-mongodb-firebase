<template>
    <div class="card min-w-[150px] max-w-[450px] border min-h-96 overflow-hidden bg-cover bg-no-repeat">  
        <div class="image">
            <img :src="cardData.src" class="transition duration-300 ease-in-out hover:scale-110" />
        </div>
        <p>{{ cardData.name }}</p>
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