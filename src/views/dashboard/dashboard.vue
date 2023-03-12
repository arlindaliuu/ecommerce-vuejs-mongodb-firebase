<template>
    <div class="grid grid-cols-10 mx-2  bg-white">
        <div class="side_menu col-span-2 pt-20 mx-2 border bg-dashboard rounded-3xl shadow-2xl">
            <h1 class="text-center text-3xl text-white">Dashboard</h1>
            <div class="pt-4">
                <img class="rounded-full m-auto h-32" src="https://th.bing.com/th/id/R.4b1ebbdf9a6a42f23de2678c80eb02df?rik=SEPvooeqfgw0kA&riu=http%3a%2f%2fimages.unsplash.com%2fphoto-1535713875002-d1d0cf377fde%3fcrop%3dentropy%26cs%3dtinysrgb%26fit%3dmax%26fm%3djpg%26ixid%3dMnwxMjA3fDB8MXxzZWFyY2h8NHx8bWFsZSUyMHByb2ZpbGV8fDB8fHx8MTYyNTY2NzI4OQ%26ixlib%3drb-1.2.1%26q%3d80%26w%3d1080&ehk=Gww3MHYoEwaudln4mR6ssDjrAMbAvyoXYMsyKg5p0Ac%3d&risl=&pid=ImgRaw&r=0" alt="">
            </div>
            <h1 class="text-center text-white text-xl pt-4">Arlind Aliu</h1>
            <div class="p-5">
                <ul class="text-white font-content text-2xl">
                    <li class="flex p-2 rounded-3xl hover:bg-white hover:text-[#00b7f8] cursor-pointer duration-500">
                        <img class="object-contain" src="../../assets/icons/view.png">
                        <p class="pl-3">Pasqyra e përgjithshme</p>
                    </li>
                    <li class="flex p-1 rounded-3xl hover:bg-white hover:text-[#00b7f8] cursor-pointer duration-500">
                        <img class="object-contain" src="../../assets/icons/stats.png">
                        <p class="pl-3">Analitika</p>
                    </li>
                    <li class="p-2">
                        <div class="flex rounded-3xl hover:bg-white hover:text-[#00b7f8] cursor-pointer duration-500">
                            <img class="object-contain" src="../../assets/icons/mattress.png">
                            <p class="pl-3">Produktet</p>
                        </div>
                        <ul>
                            <li @click="showElement('listproduct')" class="ml-12 pl-2 rounded-3xl hover:bg-white hover:text-[#00b7f8] cursor-pointer duration-500">Listo produktet</li>
                            <li @click="showElement('createproduct')"  class="ml-12 pl-2 rounded-3xl hover:bg-white hover:text-[#00b7f8] cursor-pointer duration-500">Krijo produkt</li>
                            <li class="ml-12 pl-2 rounded-3xl hover:bg-white hover:text-[#00b7f8] cursor-pointer duration-500">Fshij produkt</li>
                            <li class="ml-12 pl-2 rounded-3xl hover:bg-white hover:text-[#00b7f8] cursor-pointer duration-500">Modifiko produkt</li>
                        </ul>
                    </li>
                    <li @click="showElement('messages')"  class="flex p-2 rounded-3xl hover:bg-white hover:text-[#00b7f8] cursor-pointer duration-500">
                        <img class="object-contain" src="../../assets/icons/chat.png">
                        <p class="pl-3">Mesazhet</p>
                    </li>
                    <li class="flex p-2 rounded-3xl hover:bg-white hover:text-[#00b7f8] cursor-pointer duration-500">
                        <img class="object-contain" src="../../assets/icons/money-bag.png">
                        <p class="pl-3">Të ardhurat</p>
                    </li>
                    <li class="flex p-2 rounded-3xl hover:bg-white hover:text-[#00b7f8] cursor-pointer duration-500">
                        <img class="object-contain" src="../../assets/icons/medical-checkup.png">
                        <p class="pl-3">Historia</p>
                    </li>
                    <li class="flex p-2 rounded-3xl hover:bg-white hover:text-[#00b7f8] cursor-pointer duration-500">
                        <img class="object-contain" src="../../assets/icons/gear.png">
                    <p class="pl-3">Modifikimi i Uebit</p>
                    </li>
                    <router-link class="flex p-2 rounded-3xl hover:bg-white hover:text-[#00b7f8] cursor-pointer duration-500" to="/userprofile">
                        <img class="object-contain" src="../../assets/icons/user (4).png">
                        <p class="pl-3">Shko te llogaria përdoruesit</p>
                    </router-link>
                </ul>
            </div>
            
        </div>
        <!---here are called the components-->
        <div class="col-span-8 pt-20 bg-white">
            <div v-show="showProductList">
                <ProductList />
            </div>
            <div v-show="showProductCreate">
                <ProductCreate />
            </div>
            
        </div>
    </div>
</template>
<script>
import ProductList from './product/ProductList.vue';
import ProductCreate from './product/ProductCreate.vue';
export default{
    data(){
        return{
            dashContent:{
                listproduct: false,
                createproduct: false,
                messages: false
            }
        }
    },
    components:{
        ProductList,
        ProductCreate
    },
    
    methods: {
        showElement(key) {
            for (let key in this.dashContent) {
                    this.dashContent[key] = false;
                }
            if (this.dashContent.hasOwnProperty(key)) {
                this.dashContent[key] = true
            }
        }
    },
    computed: {
    showProductList() {
      return this.dashContent.listproduct;
    },
    showProductCreate() {
      return this.dashContent.createproduct;
    }
}
}
</script>
