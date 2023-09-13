<template>
    <div>
      <Toaster type="success" ref="toaster" />
      <Toaster type="wrong" ref="toasterError" />

      <h1 class="text-3xl font-bold mx-64">Product List</h1>
      <!------>
      <div class="grid grid-cols-3 mx-64  my-5 h-36 rounded-3xl gap-5">
        <div class="border shadow-2xl hover:scale-110 duration-500 p-3 rounded-3xl bg-yellow-300 ">
          <h1 class="text-center font-title text-2xl text-white">Përdorues Aktiv</h1>
          <div class="flex justify-between px-2 pt-5">
            <img class="h-16 object-contain" src="../../../assets/icons/group.png" />
            <p class="text-[40px] text-white font-bold">78</p>
          </div>
        </div>
        <div class="border shadow-2xl hover:scale-110 duration-500 p-3 rounded-3xl bg-green-800">
          <h1 class="text-center font-title text-2xl text-white">Sasia e produkteve</h1>
          <div class="flex justify-between px-2 pt-5">
            <img class="h-16 object-contain" src="../../../assets/icons/box.png" />
            <p class="text-[40px] text-white font-bold">78</p>
          </div>
        </div>
        <div class="border hover:scale-110 duration-500 shadow-2xl p-3 rounded-3xl bg-red-800">
          <h1 class="text-center font-title text-2xl text-white">Të ardhurat</h1>
          <div class="flex justify-between px-2 pt-5">
            <img class="h-16 object-contain" src="../../../assets/icons/increase.png" />
            <p class="text-[40px] text-white font-bold">$ 8223.32</p>
          </div>
        </div>
      </div>
      <!------>
      <div class="mx-64 mt-20 overflow-y-auto h-[500px]">
        <table class="w-full border">
          <tbody>
            <tr class="bord">
              <th>Emri</th>
              <th>Përshkrimi</th>
              <th>Imazhi</th>
              <th>Sasia</th>
              <th>Vleresimi</th>
              <th>Autori</th>
              <th></th>
              <th></th>
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
              <router-link :to="{ name: 'product-edit', params: { id: listProduct._id } }" class="bg-yellow-400 py-2 px-5">Edito</router-link>
            </td>
             <td class="text-center">
              <button @click="confirmDeleteProduct(listProduct._id, listProduct.title)" class="bg-red-700 text-white py-2 px-8">Fshij</button>
            </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  <script>
  import { mapActions, mapGetters } from 'vuex';
  import Toaster from '../../../components/Toaster.vue';

  export default { 
    components: {
      Toaster
    },  
    computed: {
      ...mapGetters(['listProduct']),
      productList() {
        return this.listProduct;
      }
    },
    mounted() {
      this.listProducts();
    },
    methods: {
      ...mapActions(['listProducts']),

      async deleteProduct(id, title) {
      this.$store.dispatch('deleteProduct', id)
        .then((success) => {
          if (success) {
            this.$refs.toaster.show(`U fshi me sukses "${title}"!`, "success");
          } else {
            this.$refs.toasterError.show(`Ndodhi një gabim gjatë fshirjes së produktit "${title}".`, "wrong");
          }
        })
        .catch((error) => {
          this.$refs.toasterError.show(`Ndodhi një gabim gjatë fshirjes së produktit "${title}".`, "error");
        });
    },
    confirmDeleteProduct(id, title) {
      if (confirm(`A jeni i sigurtë qe do të fshini "${title}"?`)) {
        this.deleteProduct(id, title);
      }
    },

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
  <style>
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
tr:nth-child(even) {
  background-color: #D6EEEE;
}
</style>