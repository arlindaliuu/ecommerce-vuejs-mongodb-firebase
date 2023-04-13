<template>
  <div class="relative w-full mb-44">
    <h1 ref="myElement" class="hidden absolute text-green-900 z-[1] font-title md:top-1/3 top-[10%] font-extrabold lg:flex text-[30px] md:text-[70px] whitespace-nowrap overflow-hidden">
      Sekreti për një ditë<span class="mx-3 text-white">të mirë</span>është një<span class="mx-3 text-[#FFFFFF]">gjumë i mirë</span>!
    </h1>
    <img class="w-full flex max-h-[600px] md:max-h-[800px] object-cover opacity-50" src="../../dist/images/secondbannerbg.jpg">
    <div class="relative mx-5 md:mx-0 md:w-[500px] md:h-[500px] bg-transparent backdrop-blur-sm hover:backdrop-blur-2xl border  duration-200 -mt-72 z-1 md:left-[85%] transform md:-translate-x-[85%] m-auto shadow-xl flex flex-wrap">
      <h1 class="text-3xl px-3 pt-3 w-full text-center text-orange-600 font-title">Rreth Nesh!</h1>
      <p class="px-3 py-5 md:py-0 text-[22px] text-gray-800 font-content">
        Kompania jonë u themelua mbi besimin se të gjithë meritojnë një gjumë të mirë të natës, dhe ne i jemi përkushtuar atij misioni që nga fillimi ynë. Ne e kuptojmë rëndësinë e një dysheku të rehatshëm dhe mbështetës për të arritur një gjumë të qetë dhe ne jemi shumë krenarë që ndihmojmë klientët tanë të gjejnë dyshekun e përsosur për të përmbushur nevojat e tyre.      </p>
      <div class="w-full bg-gray-100 flex py-5 justify-center items-center">
        <router-link to="/about" class="px-20  hover:px-24 hover:text-white hover:border-none hover:bg-main duration-200 shadow-2xl border-green-900 border bg-white text-green-900 uppercase text-lg font-bold rounded-full py-2">rreth nesh</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      translateX: '150',
      prevScrollPos: 0
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      const currentScrollPos = window.pageYOffset

      const templatePos = this.$refs.myElement.getBoundingClientRect()

      const isInView = templatePos.top < window.innerHeight && templatePos.bottom > 0

      if (isInView) {
        const scrollDirection = currentScrollPos > this.prevScrollPos ? 'up' : 'down'

        if (scrollDirection === 'down' && parseInt(this.translateX) < 300) {
          this.translateX = (parseInt(this.translateX) + 13).toString()
        } else if (scrollDirection === 'up' && parseInt(this.translateX) > -500) {
          this.translateX = (parseInt(this.translateX) - 8).toString()
        }
      }

      this.prevScrollPos = currentScrollPos
      
      // Explicitly set the style attribute using setAttribute
      this.$refs.myElement.setAttribute('style', `transform: translate3d(${this.translateX}px, 0, 0)`)
    }
  }
}
</script>
