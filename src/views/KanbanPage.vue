<template>
  <div class="kanbanPage">
    <Kanban></Kanban>
  </div>
</template>

<style lang="scss">
.kanbanPage {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  overflow-y: hidden;
  z-index: -1;
  ::-webkit-scrollbar:horizontal {
    height: 12px;
  }
  ::-webkit-scrollbar-thumb:horizontal {
    background-color: #2c3e50aa;
  }
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
