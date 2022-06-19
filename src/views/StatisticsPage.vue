<template>
  <div class="statisticsPage">
    <Statistics></Statistics>
  </div>
</template>

<script lang="ts">
import Statistics from "../components/Statistics.vue";
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    Statistics,
  },


  setup(): { pageName: string } {
    var path = window.location.pathname;
    const URLPageName = path.substring(path.lastIndexOf("/") + 1);

    return {
      pageName: URLPageName,
    };
  },
});
</script>
