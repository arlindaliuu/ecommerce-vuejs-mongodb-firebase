<script>
export default{
    data(){
        return{
            newCategory:{
                title: '',
                author: '',
                description: '',
                ngjyra: [],
                sasia: 0,
                rating: 0,
                imageField: ''
                
            }
        }
    },
    methods:{
        async handleCreateCategory(){
            console.log(this.newCategory)
            this.$store.dispatch('createProduct', {...this.newCategory})
        },
        onImageChange(event) {
            this.newCategory.imageField = event.target.files[0];  
        }
    }
}
</script>

<template>
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