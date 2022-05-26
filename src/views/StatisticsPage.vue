<template>
  <div class="statisticsPage">
    <Statistics></Statistics>
  </div>
</template>

<script lang="ts">
import Statistics from "../components/Statistics.vue";
import axios from 'axios'

export default {
  components: {
    Statistics,
  },

async created() {
    const { data } = await axios.get("https://jsonplaceholder.typicode.com/users/2/todos");
    let arrUserId = [];
    let arrId = [];

    for(let i = 0; i<data.length;i++)
    {
      arrUserId.push(data[i].userId);
      arrId.push(data[i].id);
    }

    console.log(arrUserId);
    console.log(arrId); 
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
