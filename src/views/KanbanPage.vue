<template>
  <div class="kanbanPage">
    <Kanban></Kanban>
  </div>
</template>

<style lang="scss">
.kanbanPage {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
}
</style>

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
