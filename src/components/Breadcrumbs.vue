<template>
    <nav class="breadcrumb h-fit" aria-label="breadcrumbs">
      <ul class="flex w-max">
        <li class="li-elements flex" v-for="(crumb, index) in breadcrumbs" :key="index">
            <router-link class="hover:underline" :to="crumb.path" :class="crumb.className">{{ crumb.name }}</router-link>
            <span v-if="index < breadcrumbs.length - 1" class="separator"> > </span>
          </li>
          
      </ul>
    </nav>
  </template>
  
  <style>

  </style>
  
  
  <script>
  export default {
    computed: {
      breadcrumbs() {
        const breadcrumbs = [];
  
        // Add home breadcrumb
        breadcrumbs.push({ name: 'Ballina', path: '/', className: 'text-blue-900' });

  
        // Loop through the route path and add each breadcrumb
        const matchedRoutes = this.$route.matched;
        matchedRoutes.forEach(route => {
          if (route.path !== '/') {
            breadcrumbs.push({ name: route.meta.title, path: route.path });
          }
        });
  
        return breadcrumbs;
      }
    }
  };
  </script>
  