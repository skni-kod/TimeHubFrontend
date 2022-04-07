<template>
  <div class="home">
    <OfferPage />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import OfferPage from "@/components/OfferPage.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Home",
  components: {
    OfferPage,
  },
});
</script>
