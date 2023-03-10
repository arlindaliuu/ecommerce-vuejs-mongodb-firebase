<template>
  <Header />
  <div class="min-h-screen py-40" style="background-image: linear-gradient;">
    <div class="container">
      <div class="has-text-right">
      </div>
     <div class="push-down has-text-right">
      <div class="columns">
          <div class="column">
              <div class="has-text-right">
                  
                      <div class="column">
          </div>
              <img width="200px" align="right" src="../assets/image/foto1.jpg" alt="foto1">
             </div>
             <h2 align="center">Misioni ynë</h2>
                  <p class="flex flex-col lg:flex-row w-8/12 bg-white rounded-xl mx-left shadow-lg overflow-hidden">Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                       Cum vero magni aspernatur ex explicabo. Voluptatem nam 
                       adipisci, alias enim nemo sit vitae necessitatibus
                        dolores pariatur ea quasi. Nihil, corporis corrupti?
                      </p>       
          
          </div>
      </div>
      </div>
      </div>

  <div class="container">
      <div class="has-text-left">
      </div>
     <div class="push-down has-text-left">
      <div class="columns">
          <div class="column">
              <div class="has-text-left">
                  
                      <div class="column">
          </div>
          <h2 align="center">Story ynë</h2>

              <img width="200px" align="left" src="../assets/image/foto1.jpg" alt="foto1">
             </div>
             
                  <p class="flex flex-col lg:flex-row w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden ">Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                       Cum vero magni aspernatur ex explicabo. Voluptatem nam 
                       adipisci, alias enim nemo sit vitae necessitatibus
                        dolores pariatur ea quasi. Nihil, corporis corrupti?
                      </p>       
          
          </div>
      </div>
      </div>
      </div>

      </div>
  <Footer />
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 5fr;
  align-items: right;
  grid-column-gap: 20px;
}

/* .photo {
 
  width: 200px;
  height: 200px;
  align-items: center;
}

.text {
  grid-column: 2;
}
.container {
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: left;
  grid-column-gap: 20px;
}

.photo {
  margin-right: right;
  width: 200px;
  height: 200px;
}

.text {
  grid-column: 2;
}

body{
  background-color: red;
} */
</style>
<script>
import Footer from "../components/Footer.vue"
import Header from "../components/Header.vue"
export default{
  components:{
      Footer,
      Header
  },
  data(){
      return{
          images:[]
      }
  }
}
</script>

