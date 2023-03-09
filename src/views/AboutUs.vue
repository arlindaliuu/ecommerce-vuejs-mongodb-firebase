<template>
    <Header />

    <h3>asdasds</h3>
    <h3>asdasds</h3>
    <h3>asdasds</h3>
    <h3>asdasds</h3>
    <h3>asdasds</h3>
    <h3>asdasds</h3>
    <h3>asdasds</h3>
    
  

        <div class="container">
        <div class="has-text-right">
           
        </div>
       <div class="push-down has-text-right">
        <div class="columns">
            <div class="column">
                <div class="has-text-right">
                    
                        <div class="column">
            </div>
                <img width="300px" align="right" src="../assets/image/foto1.jpg" alt="foto1">
               </div>
                    <p class="font-content">Lorem ipsum dolor, sit amet consectetur adipisicing elit.
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
                <img width="300px" align="left" src="../assets/image/foto1.jpg" alt="foto1">
               </div>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                         Cum vero magni aspernatur ex explicabo. Voluptatem nam 
                         adipisci, alias enim nemo sit vitae necessitatibus
                          dolores pariatur ea quasi. Nihil, corporis corrupti?
                        </p>       
                </div>
            </div>
           
        </div>
        </div>
    <Footer />
</template>

<style scoped>
.container {
    display: grid;
    grid-template-columns: 1fr 2fr;
    align-items: right;
    grid-column-gap: 20px;
  }
  
  .photo {
   
    width: 200px;
    height: 200px;
  }
  
  .text {
    grid-column: 2;
  }
  .container {
    display: grid;
    grid-template-columns: 1fr 2fr;
    align-items: center;
    grid-column-gap: 20px;
  }
  
  .photo {
    margin-right: auto;
    width: 200px;
    height: 200px;
  }
  
  .text {
    grid-column: 2;
  }
body{
    background-color: red;
}
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

