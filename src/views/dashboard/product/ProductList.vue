<template>
    <div>
      <h1>Product List</h1>
      <div class="mx-64">
        <table class="w-full border">
          <tbody>
            <tr class="border">
              <th>Emri</th>
              <th>Përshkrimi</th>
              <th>Imazhi</th>
              <th>Sasia</th>
              <th>Vleresimi</th>
              <th>Autori</th>
              <th class="col-span-2"></th>
            </tr>
            <tr class="border" v-for="listProduct in productList" :key="listProduct.id">
              <td class="text-center">
                {{ listProduct.title }}
             </td>
             <td class="text-center">
              {{ listProduct.description }}
             </td>
             <td class="m-auto">
              <div><img /></div>
             </td>
             <td class="text-center">
              {{ listProduct.sasia }}
             </td>
             <td class="text-center">
              {{ listProduct.rating }}
             </td>
             <td class="text-center">
              {{ listProduct.author }}
             </td>
             <td class="text-center">
              <button class="bg-yellow-400 py-2 px-5">Edito</button>
            </td>
             <td class="text-center">
              <button class="bg-red-700 text-white py-2 px-8">Fshij</button>
            </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  <script>
  import { mapActions, mapGetters } from 'vuex';
  
  export default {   
    computed: {
      ...mapGetters(['listProduct']),
      productList() {
        console.log(this.listProduct)
        return this.listProduct;
      }
    },
    mounted() {
      this.listProducts();
    },
    methods: {
      ...mapActions(['listProducts']),
      imageSrc(imageField) {
      if (!imageField) {
        return 'https://via.placeholder.com/150';
      }

      const blob = this.base64ToBlob(imageField);
      return URL.createObjectURL(blob);
    },
    base64ToBlob(base64) {
      const binary = atob(base64);
      const length = binary.length;
      const array = new Uint8Array(new ArrayBuffer(length));

      for (let i = 0; i < length; i++) {
        array[i] = binary.charCodeAt(i);
      }

      return new Blob([array], { type: 'image/jpeg' });
    }
  



    },
  };
  </script> 