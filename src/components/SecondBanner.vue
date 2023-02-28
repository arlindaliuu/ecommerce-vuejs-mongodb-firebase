<template>
  <div class="relative z-0 h-[1000px] w-full">
    <h1 ref="myElement" class="absolute text-white italic font-extrabold flex mt-52 z-[2] text-[70px] whitespace-nowrap">Flini në përqafimin qetësues të natyrës me dyshekët tanë <span class="ml-3 text-orange-600"> aloe vera</span></h1>
    <img class="z-[1] w-full flex absolute max-h-[800px]" src="../../dist/images/bgbanner.jpg">
  </div>
</template>

<script>
export default {
  data() {
    return {
      translateX: '0',
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

        if (scrollDirection === 'down' && parseInt(this.translateX) < 200) {
          this.translateX = (parseInt(this.translateX) + 15).toString()
        } else if (scrollDirection === 'up' && parseInt(this.translateX) > -600) {
          this.translateX = (parseInt(this.translateX) - 15).toString()
        }
      }

      this.prevScrollPos = currentScrollPos
      
      // Explicitly set the style attribute using setAttribute
      this.$refs.myElement.setAttribute('style', `transform: translate3d(${this.translateX}px, 0, 0)`)
    }
  }
}
</script>
