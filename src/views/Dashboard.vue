<template>
  <div>
    <h1>You are on the {{ this.name }} page.</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, defineProps } from "vue";
const props = defineProps({
  name: { type: String, required: true },
});

export default defineComponent({
  name: "Dashboard",
});
</script>
