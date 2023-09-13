<template>
    <div class="my-24 max-w-5xl lg:mx-auto mx-6 grid grid-cols-1 lg:grid-cols-2">
        <div class="grid">
            <h1 class="text-2xl lg:text-4xl underline text-green-900 font-light">Lokacioni <br> <span>&</span> <br>Orari</h1>
            <h2 class="md:mt-10 mt-5 text-xl lg:text-3xl font-content">Orari</h2>
            <ul class="text-lg mt-5 font-light">
                <li>E hënë - e shtunë - 09:00 - 18:00</li>
            </ul>
            <h2 class="md:mt-10 text-2xl lg:text-4xl font-content">Lokacioni</h2>
            <ul class="text-lg mt-5 font-light">
                <li>15. Novembra</li>
                <li>Preševo 17523</li>
                <li>Serbia</li>
            </ul>
            <a href="https://www.google.com/maps/place/%22LULI-FLEX+2020:/@42.302687,21.666461,17z/data=!4m6!3m5!1s0x135457777887e68b:0x7a6206d7583bd29b!8m2!3d42.3026868!4d21.6664612!16s%2Fg%2F11mfw1qcv6?hl=en"
            target="_blank" class="border self-center shadow-2xl text-center cursor-pointer duration-500 hover:bg-green-900 border-orange-600 m-auto hover:w-52 w-44 whitespace-nowrap py-2 mt-5 rounded-lg hover:text-white hover:px-7 inline-block">Më dërgo në LuliFlex</a>

        </div>
        <div class="mt-5 md:mt-0 w-fit">
            <div class="mapouter"><div class="gmap_canvas"><iframe class="gmap_iframe" width="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=Luli Flex 17523&amp;t=k&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe><a href="https://embed-googlemap.com">embed code google maps</a></div></div>
        </div>
   </div>

</template>
<style scoped>
.mapouter{
    position:relative;
    text-align:right;
    width:100%;
    height:100%;
}
.gmap_canvas 
{overflow:hidden;
    background:none!important;
    width:100%;
    height:100%;
}
.gmap_iframe {
    height:100% !important;
}
</style>
<script>
export default {
    date(){
        return {
            coordinates:{
                lat:0,
                lng: 0
            }
        }
    },
    created(){

    }
}
</script>