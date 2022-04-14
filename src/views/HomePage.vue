<template>
  <div class="home">
    <h1>You are on the {{ pageName }} page.</h1>
  </div>
</template>

<script lang="ts">
export default {
  components: {},

  setup(): { pageName: string } {
    const pageName = "home";

    return {
      pageName: pageName,
    };
  },
};
</script>
