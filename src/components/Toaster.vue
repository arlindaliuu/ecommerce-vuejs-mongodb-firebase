<template>
    <div v-if="show" :class="toasterClasses">
      <div>{{ message }}</div>
      <button @click="closeToaster" class="absolute top-0 right-0 z-50 p-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700">
        <svg class="h-6 w-6 fill-current" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M11.414 10l4.293-4.293a1 1 0 1 0-1.414-1.414L10 8.586 5.707 4.293a1 1 0 1 0-1.414 1.414L8.586 10l-4.293 4.293a1 1 0 1 0 1.414 1.414L10 11.414l4.293 4.293a1 1 0 1 0 1.414-1.414L11.414 10z" clip-rule="evenodd" />
        </svg>
      </button>
      <div :class="lineClasses" :style="lineStyle"  style="background-color: white;"></div>

    </div>
  </template>
  
  <script>
 export default {
  props: {
    message: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      default: 3000
    },
    type: {
      type: String,
      default: "success",
      validator: function (value) {
        return ["success", "wrong", "pending"].includes(value);
      }
    }
  },
  data() {
    return {
      show: false,
      startTime: 0,
      currentTime: 0
    }
  },
  methods: {
      closeToaster() {
          this.show = false;
      },
    showError(message) {
      this.message = message;
      setTimeout(() => {
        this.message = '';
      }, 3000);
    }

    },
  computed: {
    toasterClasses() {
      return [
        "fixed",
        "top-5",
        "transform",
        "right-0",
        "z-40",
        "mb-4",
        "mr-4",
        "px-4",
        "min-w-[350px]",
        "min-h-[60px]",
        "animate-jump",
        "py-2",
        "rounded-md",
        "shadow-lg",
        this.typeClasses
      ]
    },
    typeClasses() {
      switch(this.type) {
          case "success":
          return "bg-green-500 text-white border-green-500";
          case "wrong":
          return "bg-red-500 text-white border-red-500";
          case "pending":
          return "bg-yellow-500 text-white border-yellow-500";
          default:
          return "";
      }
    },

    lineClasses() {
      return [
        "h-1",
        "rounded-b-md",
        this.typeClasses
      ]
    },
    lineStyle() {
      const width = (this.currentTime - this.startTime) / this.duration * 100
      return {
        width: `${width}%`
      }
    }
  },
  mounted() {
    this.show = true
    this.startTime = Date.now()
    this.currentTime = Date.now()
    setInterval(() => {
      this.currentTime = Date.now()
    }, 50)
    setTimeout(() => {
      this.show = false
    }, this.duration)
  }
}

  </script>
  