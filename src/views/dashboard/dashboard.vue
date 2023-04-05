<template>
    <div v-if="getAdmin" class="grid grid-cols-10 bg-white">
        <div class="side_menu col-span-2 pt-20 border bg-gray-800 shadow-2xl">
            <h1 class="text-center text-3xl text-white">Dashboard</h1>
            <div class="pt-4">
                <img class="rounded-full m-auto h-32" src="https://th.bing.com/th/id/R.4b1ebbdf9a6a42f23de2678c80eb02df?rik=SEPvooeqfgw0kA&riu=http%3a%2f%2fimages.unsplash.com%2fphoto-1535713875002-d1d0cf377fde%3fcrop%3dentropy%26cs%3dtinysrgb%26fit%3dmax%26fm%3djpg%26ixid%3dMnwxMjA3fDB8MXxzZWFyY2h8NHx8bWFsZSUyMHByb2ZpbGV8fDB8fHx8MTYyNTY2NzI4OQ%26ixlib%3drb-1.2.1%26q%3d80%26w%3d1080&ehk=Gww3MHYoEwaudln4mR6ssDjrAMbAvyoXYMsyKg5p0Ac%3d&risl=&pid=ImgRaw&r=0" alt="">
            </div>
            <h1 class="text-center text-white text-xl pt-4">Arlind Aliu</h1>
            <div class="">
                <ul class="text-white font-content text-2xl">
                    <li class="flex p-2 hover:bg-white hover:text-[#00b7f8] cursor-pointer duration-150">
                        <img class="object-contain" src="../../assets/icons/view.png">
                        <p class="pl-3">Pasqyra e përgjithshme</p>
                    </li>
                    <li class="flex p-2 hover:bg-white hover:text-[#00b7f8] cursor-pointer duration-150">
                        <img class="object-contain" src="../../assets/icons/stats.png">
                        <p class="pl-3">Analitika</p>
                    </li>
                    <li >
                        <div class="flex p-2 hover:bg-white hover:text-[#00b7f8] cursor-pointer duration-150">
                            <img class="object-contain" src="../../assets/icons/mattress.png">
                            <p class="pl-3">Produktet</p>
                        </div>
                        <ul>
                            <li @click="showElement('listproduct')" class="py-2 pl-12 hover:bg-white hover:text-[#00b7f8] cursor-pointer duration-150">Listo produktet</li>
                            <li @click="showElement('createproduct')"  class="py-2 pl-12 hover:bg-white hover:text-[#00b7f8] cursor-pointer duration-150">Krijo produkt</li>
                            <li class="pl-12 py-2 hover:bg-white hover:text-[#00b7f8] cursor-pointer duration-150">Fshij produkt</li>
                            <li @click="showElement('editproduct')" class="pl-12 py-2 hover:bg-white hover:text-[#00b7f8] cursor-pointer duration-150">Modifiko produkt</li>
                        </ul>
                    </li>
                    <li @click="showElement('messages')"  class="flex p-2 hover:bg-white hover:text-[#00b7f8] cursor-pointer duration-150">
                        <img class="object-contain" src="../../assets/icons/chat.png">
                        <p class="pl-3">Mesazhet</p>
                    </li>
                    <li class="flex p-2 hover:bg-white hover:text-[#00b7f8] cursor-pointer duration-150">
                        <img class="object-contain" src="../../assets/icons/money-bag.png">
                        <p class="pl-3">Të ardhurat</p>
                    </li>
                    <li class="flex p-2 hover:bg-white hover:text-[#00b7f8] cursor-pointer duration-150">
                        <img class="object-contain" src="../../assets/icons/medical-checkup.png">
                        <p class="pl-3">Historia</p>
                    </li>
                    <li class="flex p-2  hover:bg-white hover:text-[#00b7f8] cursor-pointer duration-150">
                        <img class="object-contain" src="../../assets/icons/gear.png">
                    <p class="pl-3">Modifikimi i Uebit</p>
                    </li>
                    <router-link class="flex p-2 hover:bg-white hover:text-[#00b7f8] cursor-pointer duration-150" to="/userprofile">
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
            <div v-show="showProductEdit">
                <ProductEdit />
            </div>
        </div>
    </div>
    <div v-else>
        <h1 class="text-center text-red-700 text-3xl">Ju nuk keni akses në këtë faqe!</h1>
    </div>
</template>
<script>
import ProductList from './product/ProductList.vue';
import ProductCreate from './product/ProductCreate.vue';
import ProductEdit from './product/ProductEdit.vue'
export default{
    data(){
        return{
            dashContent:{
                listproduct: false,
                createproduct: false,
                editproduct: false,
                messages: false,
                active: true
            }
        }
    },
    components:{
        ProductList,
        ProductCreate,
        ProductEdit
    },
    
    methods: {
        showElement(key) {
            this.active = true;
            for (let key in this.dashContent) {
                    this.dashContent[key] = false;
                }
            if (this.dashContent.hasOwnProperty(key)) {
                this.dashContent[key] = true
            }
        },
        methods: {
            setActive() {
            this.active = true;
        },
  },
    },
    computed: {
        showProductList() {
        return this.dashContent.listproduct;
        },
        showProductCreate() {
        return this.dashContent.createproduct;
        },
        showProductEdit(){
            return this.dashContent.editproduct;
        },
        getAdmin(){
        return JSON.parse(localStorage.getItem('isAdmin'));
        },
        buttonClass() {
        return this.active ? 'ml-12 pl-2 rounded-3xl bg-white hover:text-[#00b7f8] cursor-pointer duration-150' : 'ml-12 pl-2 rounded-3xl hover:bg-white hover:text-[#00b7f8] cursor-pointer duration-150';
        },
  
}
}
</script>
