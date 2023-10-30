<script>
import Toaster from '../../../components/Toaster.vue';

export default{
    components: {
      Toaster
    },  
    data(){
        return{
            newCategory:{
                title: '',
                author: '',
                description: '',
                ngjyra: [],
                sasia: 0,
                rating: 0,
                imageField: '',
                discount: false,
                discountPercentage: 0,
                price: 0 
            }
        }
    },
    methods:{
        async handleCreateCategory(){
            this.$store.dispatch('createProduct', {...this.newCategory})  
            .then((success) => {
                if (success) {
                    this.$refs.toaster.show(`U krijua me sukses!`, "success");
                } else {
                    this.$refs.toasterError.show(`Ndodhi një gabim gjatë krijimit të produktit`, "wrong");
                }
                })
                .catch((error) => {
                console.error(error);
                this.$refs.toasterError.show(`Ndodhi një gabim gjatë krijimit së produktit.`, "error");
                });
        },
        toggleDiscountPercentage() {
            const checkbox = document.getElementById("discount");
            const inputWrapper = document.getElementById("discountPercentage");

            if (checkbox.checked) {
                inputWrapper.classList.remove("hidden");
                inputWrapper.classList.add("block");
            } else {
                inputWrapper.classList.add("hidden");
            }
        },
        onImageChange(event) {
            this.newCategory.imageField = event.target.files[0];  
        }
    },
}
</script>

<template>
    <Toaster type="success" ref="toaster" />
    <Toaster type="wrong" ref="toasterError" />
    <form method="post" @submit.prevent="handleCreateCategory" enctype="multipart/form-data">
        <h1 class="mx-64 font-bold text-3xl">Krijo Produkt</h1>
        <div class="mx-64 border mt-5 p-5 shadow-2xl px-32">
            <div class="form-group grid grid-cols-2 p-5">
                <label for="name" class="">Titulli</label>
                <input class="border  h-10" id="name" name="name" v-model="newCategory.title" />
            </div>
            <div class="form-group grid grid-cols-2 p-5">
                <label class="" for="description">Përshkrimi</label>
                <textarea class="border" id="description" name="description" v-model="newCategory.description" />
            </div>
            <div class="form-group grid grid-cols-2 p-5">
                <label class="" for="author">Autori</label>
                <input class="border h-10" id="author" name="author" v-model="newCategory.author" />
            </div>
            <div class="form-group grid grid-cols-2 p-5">
                <label class="" for="sasia">Sasia</label>
                <input class="border h-10" id="sasia" type="number" name="sasia" v-model="newCategory.sasia" />
            </div>
            <div class="form-group grid grid-cols-2 p-5">
                <label class="" for="price">Cmimi</label>
                <input class="border h-10" id="price" type="number" name="price" v-model="newCategory.price" />
            </div>
            <div class="form-group grid grid-cols-10 p-5">
                <div class="col-span-3 flex justify-between">
                  <label class="col-span-4 flex items-center justify-center" for="discount">Zbritje</label>
                  <input class="border" id="discount" type="checkbox" name="discount" value="true" v-model="newCategory.discount" @change="toggleDiscountPercentage" />
                </div>
                <div class="col-span-7 flex justify-end">
                    <label class="flex items-center justify-center" for="discountPercentage">Përqindja</label>
                    <input class="border h-10 hidden" id="discountPercentage" type="number" name="discountPercentage" v-model="newCategory.discountPercentage" v-if="newCategory.discountPercentage !== null" />
                    <span class="flex items-center justify-center">%</span>
                  </div>
            </div>
              
            <div class="form-group grid grid-cols-2 p-5">
                <label class="">Ngjyra</label>
                <div class="flex flex-wrap justify-around">
                    <div class="border flex flex-wrap justify-center">
                        <label for="red">E kuqe</label>
                        <input type="checkbox" id="red" value="red" v-model="newCategory.ngjyra">
                      </div>
                      <div class="border flex flex-wrap justify-center ml-2">
                        <label for="Jeshile">Jeshile</label>
                        <input type="checkbox" id="Jeshile" value="Jeshile" v-model="newCategory.ngjyra">
                      </div>
                      <div class="border flex flex-wrap justify-center  ml-2">
                        <label for="Blu">Blu</label>
                        <input type="checkbox" id="Blu" value="Blu" v-model="newCategory.ngjyra">
                      </div>
                      <div class="border flex flex-wrap justify-center  ml-2">
                          <label for="Bardhë">Bardhë</label>
                          <input type="checkbox" id="Bardhë" value="Bardhë" v-model="newCategory.ngjyra">
                        </div>
                        <div class="border flex flex-wrap justify-center  ml-2">
                            <label for="Hiri">Hiri</label>
                            <input type="checkbox" id="Hiri" value="Hiri" v-model="newCategory.ngjyra">
                        </div>
                        <div class="border flex flex-wrap justify-center  ml-2">
                            <label for="Portokalli">Portokalli</label>
                            <input type="checkbox" id="Portokalli" value="Portokalli" v-model="newCategory.ngjyra">
                        </div>
                        <div class="border flex flex-wrap justify-center  ml-2">
                            <label for="E Zezë">E Zezë</label>
                            <input type="checkbox" id="E Zezë" value="E Zezë" v-model="newCategory.ngjyra">
                        </div>
                        <div class="border flex flex-wrap justify-center  ml-2">
                            <label for="Verdhë">Verdhë</label>
                            <input type="checkbox" id="Verdhë" value="Verdhë" v-model="newCategory.ngjyra">
                        </div>
                        <div class="border flex flex-wrap justify-center  ml-2">
                            <label for="Rozë">Rozë</label>
                            <input type="checkbox" id="Rozë" value="Rozë" v-model="newCategory.ngjyra">
                        </div>
                    </div>
                </div>
               
              
            <div class="form-group grid grid-cols-2 p-5">
                <label class="" for="rating">Vlerësimi</label>
                <input placeholder="Opsional" class="border h-10" id="rating" type="number" name="rating" v-model="newCategory.rating" />
            </div>
                      
            <div class="form-group grid grid-cols-2 p-5 mb-5">
                <label class="">Fotografia</label>
                <input class="border" id="imageField" type="file" name="imageField" @change="onImageChange" />
            </div>
            <div class="w-full flex justify-center">
                <button class="border px-5 bg-green-900 rounded-lg text-white py-2">Krijo kategorinë</button>
            </div>
        </div>
    </form>
</template>