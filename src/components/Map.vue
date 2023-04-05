<template>
    <div class="w-full my-24 grid md:grid-cols-4">
        <div class="col-span-1 px-16 grid">
            <h1 class=" text-6xl underline text-green-900 font-light">Lokacioni <br> <span>&</span> <br>Orari</h1>
            <h2 class="md:mt-10 mt-5 text-4xl font-content">Orari</h2>
            <ul class="text-xl mt-5 font-light">
                <li>E hënë - e shtunë - 09:00 - 18:00</li>
            </ul>
            <h2 class="md:mt-10 text-4xl font-content">Lokacioni</h2>
            <ul class="text-xl mt-5 font-light">
                <li>15. Novembra</li>
                <li>Preševo 17523</li>
                <li>Serbia</li>
            </ul>
            <a href="https://www.google.com/maps/place/%22LULI-FLEX+2020:/@42.302687,21.666461,17z/data=!4m6!3m5!1s0x135457777887e68b:0x7a6206d7583bd29b!8m2!3d42.3026868!4d21.6664612!16s%2Fg%2F11mfw1qcv6?hl=en"
            target="_blank" class="border self-center shadow-2xl text-center cursor-pointer duration-500 hover:bg-green-900 border-orange-600 m-auto hover:w-52 w-44 whitespace-nowrap py-2 mt-5 rounded-lg hover:text-white hover:px-7 inline-block">Më dërgo në LuliFlex</a>

        </div>
        <div class="col-span-3 mt-5 md:mt-0">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2950.8675864887573!2d21.664272515676952!3d42.30269074671496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x135457777887e68b%3A0x7a6206d7583bd29b!2s%22LULI-FLEX%202020%3A!5e0!3m2!1sen!2s!4v1678991763073!5m2!1sen!2s"
            class="md:w-[450px] lg:w-[800] xl:w-[1100px] md:ml-auto lg:m-auto"  height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>    
        </div>
   </div>

</template>
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