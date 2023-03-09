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
            const file = event.target.files[0];
            if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.newCategory.imageField = reader.result.split(',')[1];
            };
            }
        }
    }
}
</script>

<template>
    <form @submit.prevent="handleCreateCategory" enctype="multipart/form-data">
        <div class="form-group">
            <label for="name">Title</label>
            <input id="name" name="name" v-model="newCategory.title" />
        </div>
        <div class="form-group">
            <label for="description">description</label>
            <input id="description" name="description" v-model="newCategory.description" />
        </div>
        <div class="form-group">
            <label for="author">author</label>
            <input id="author" name="author" v-model="newCategory.author" />
        </div>
        <div class="form-group">
            <label for="sasia">sasia</label>
            <input id="sasia" type="number" name="sasia" v-model="newCategory.sasia" />
        </div>
        <div class="form-group">
            <label>ngjyra</label>
            <div>
              <label for="red">Red</label>
              <input type="checkbox" id="red" value="red" v-model="newCategory.ngjyra">
            </div>
            <div>
              <label for="green">Green</label>
              <input type="checkbox" id="green" value="green" v-model="newCategory.ngjyra">
            </div>
            <div>
              <label for="blue">Blue</label>
              <input type="checkbox" id="blue" value="blue" v-model="newCategory.ngjyra">
            </div>
          </div>
          
        <div class="form-group">
            <label for="rating">rating</label>
            <input id="rating" type="number" name="rating" v-model="newCategory.rating" />
        </div>
                  
        <div class="form-group mb-5">
            <label >imageField</label>
            <input id="imageField" type="file" name="imageField" @change="onImageChange" />
        </div>
        <button>Create Category</button>
    </form>
</template>