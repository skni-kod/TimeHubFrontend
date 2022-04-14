<template>
  <div class="kanbanPage">
    <h1>This is a {{ pageName }} page</h1>
    <Kanban></Kanban>
  </div>
</template>

<script lang="ts">
import Kanban from "../components/Kanban.vue";

export default {
  components: {
    Kanban,
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
