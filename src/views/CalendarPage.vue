<template>
  <div>
    <h1>You are on the {{ URLPageName }} page.</h1>
    <kalendarz></kalendarz>
  </div>
</template>

<script setup lang="ts">

import kalendarz from '../components/Calendar.vue'
import { ref } from 'vue'


  
  var path = window.location.pathname;
  const URLPageName = ref(path.substring(path.lastIndexOf("/") + 1));
  
</script>
