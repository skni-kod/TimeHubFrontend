<template>
  <div>
    <h1>You are on the {{ pageName }} page.</h1>
  </div>
</template>

<script lang="ts">
export default {
  components: {},

  setup(): { pageName: string } {
    var path = window.location.pathname;
    const URLPageName = path.substring(path.lastIndexOf("/") + 1);

    return {
      pageName: URLPageName,
    };
  },
};
</script>
