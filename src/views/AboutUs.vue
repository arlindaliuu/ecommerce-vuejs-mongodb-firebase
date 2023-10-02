<template>
  <Header />
  <body>
    <div class="min-h-[2000px]">
    <div class="parallax w-full min-h-[2000px] bg-fixed bg-center flex flex-wrap">
      <div class="grid grid-cols-1 md:grid-cols-3 bg-white mt-96">
        <Breadcrumbs class="col-span-3 px-32 pt-5 text-xl font-light"/>
        <div class="flex justify-center items-center">
          <h1 class="text-[80px] underline text-green-700 font-light">
            Kush <br>
            <span class="ml-5">jemi</span> 
            <br>
            <span class="ml-10">ne?</span> 
          </h1>
        </div>
        <div class="p-5 md:p-20 col-span-2 leading-8 space-y-8 font-light text-xl flex items-center">
          <p>Kompania jonë lindi nga një pasion për gjumin dhe një dëshirë për të ndihmuar njerëzit të arrijnë pushimin më të mirë të mundshëm. Ne e kuptojmë se blerja për një dyshek mund të jetë dërrmuese, kjo është arsyeja pse ne ofrojmë konsultime të personalizuara për të ndihmuar klientët tanë të zgjedhin dyshekun e përsosur për nevojat e tyre specifike.
    
            Në LULIflex, ne besojmë se një gjumë i mirë i natës është themeli i një jete të lumtur dhe të shëndetshme. Ne e kuptojmë se të gjithë kanë nevoja unike për gjumë, kjo është arsyeja pse ne jemi të përkushtuar për të krijuar dyshekë të personalizuar që plotësojnë preferencat e secilit individ.
            
            Ne krenohemi me përkushtimin tonë ndaj qëndrueshmërisë dhe mjedisit. Të gjithë dyshekët tanë janë bërë me materiale miqësore me mjedisin, si latex natyral dhe pambuk organik, dhe ne punojmë me furnitorë që ndajnë vlerat tona. Ne besojmë se kujdesi për mjedisin është po aq i rëndësishëm sa kujdesi për klientët tanë.
            
            Ekipi ynë përbëhet nga ekspertë të gjumit, projektues dhe inxhinierë të cilët janë të përkushtuar për të krijuar përvojën më të mirë të mundshme të gjumit për klientët tanë. Ne përdorim teknologjinë më të fundit dhe tendencat e dizajnit për të krijuar dyshekë me porosi që nuk janë vetëm të rehatshëm, por edhe estetikisht të këndshëm.
            
            Faleminderit që zgjodhët LULIflex. Ne mezi presim t'ju ndihmojmë të arrini gjumin më të mirë të mundshëm dhe një jetë më të shëndetshme dhe më të lumtur.</p>
        </div>
      </div>
    <div class="grid grid-cols-1 md:grid-cols-3 bg-white mt-96">
      <div class="p-5 md:p-20 col-span-2 leading-8 space-y-8 text-xl">
        <div class="md:hidden flex justify-center items-center">
          <h1 class="text-[80px] mb-5 underline text-green-700 font-light">
            <span>Misioni</span><br><br>
            <span>jone!</span><br>
          </h1>
        </div>
          <div class="p-5 md:p-20 col-span-2 leading-8 space-y-8 font-light text-xl flex items-center">
            <p class="font-light">Në LULIflex, ne besojmë se një gjumë i mirë gjatë natës është thelbësor për shëndetin dhe mirëqenien e përgjithshme. Ne jemi të pasionuar për ofrimin e dyshekëve me cilësi të lartë që jo vetëm përmbushin, por tejkalojnë pritshmëritë e klientëve tanë.

              Misioni ynë është i thjeshtë: t'i ndihmojmë njerëzit të flenë më mirë. Ne e arrijmë këtë duke ofruar dyshekë që janë të dizajnuar me teknologjinë më të fundit dhe materialet më të mira, duke u siguruar që klientët tanë të kenë mbështetjen dhe komoditetin që u nevojitet për një gjumë të qetë të natës.
              
              Ne e dimë se blerja për një dyshek mund të jetë dërrmuese, kjo është arsyeja pse ne përpiqemi ta bëjmë procesin sa më të lehtë që të jetë e mundur për klientët tanë. Ne ofrojmë informacion të detajuar rreth produkteve tona dhe ofrojmë udhëzime të personalizuara për të ndihmuar klientët të zgjedhin dyshekun e duhur për nevojat e tyre.
              
              Por misioni ynë shkon përtej shitjes së dyshekëve. Ne jemi të përkushtuar ndaj qëndrueshmërisë dhe reduktimit të ndikimit tonë në mjedis. Ne përdorim materiale miqësore me mjedisin në produktet tona dhe punojmë me furnitorë që ndajnë vlerat tona.
              
              Në LuliFlex, ne jemi më shumë se thjesht një kompani dyshekë. Ne jemi një ekip njerëzish që janë të përkushtuar për të përmirësuar cilësinë e jetës për klientët tanë dhe komunitetin tonë. Bashkohuni me ne në misionin tonë për t'i ndihmuar njerëzit të flenë më mirë dhe të bëjnë jetë më të shëndetshme.
            </p>
          </div>
        </div>
      <div class="md:flex hidden justify-center items-center">
        <h1 class="text-[80px] underline text-green-700 font-light">
          Misioni<br>
          jone! <br>
        </h1>
      </div>
    </div>
  </div>
</div>
</body>
  <Footer />

</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 5fr;
  align-items: right;
  grid-column-gap: 20px;
}
.parallax{
  background-image: url(../assets/image/add2.jpg);
}

</style>
<script>
import Footer from "../components/Footer.vue"
import Header from "../components/Header.vue"
import Breadcrumbs from "../components/Breadcrumbs.vue"
export default{
  components:{
      Footer,
      Header,
      Breadcrumbs
  },
  data(){
      return{
          images:[]
      }
  },
  mounted(){
    window.scrollTo(0, 0);
  },
  computed:{
    pageTitle() {
      // Get the page title from the route meta data
      return this.$route.meta.title;
    },
  }
}
</script>

