<template>
    <!-- Pass the title prop correctly -->
    <PageComponents title="Dashboard">
      <!-- Slot content goes here -->
      content goes here
    </PageComponents>
  </template>
  
  <script>
  import PageComponents from '../components/PageComponents.vue';
  
  export default {
    components: {
      PageComponents,
    },
  };
  </script>
  
  <style>
  /* Add styles if necessary */
  </style>
  