<template>
  <div>
    <h1>You are on the {{ pageName }} page.</h1>
    <CalendarVue></CalendarVue>
  </div>
</template>

<script lang="ts">
import CalendarVue from "@/components/Calendar.vue";

export default {
  components: {
    CalendarVue,
  },

  setup(): { pageName: string } {
    var path = window.location.pathname;
    const URLPageName = path.substring(path.lastIndexOf("/") + 1);

    return {
      pageName: URLPageName,
    };
  },
};
</script>
