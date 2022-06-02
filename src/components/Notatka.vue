<template>
  <div class="kontenerNotatki">
    <div class="kontenerTytulowyNotatki">
      <div class="tytulNotatki">{{ notatkaTitle }}</div>
      <div class="przyciskEdycjiNotatki"></div>
    </div>
    <textarea class="zawartoscNotatki" />
  </div>
</template>

<script lang="ts">
export default {
  setup(): { notatkaTitle: string } {
    return {
      notatkaTitle: "Notatka placeholder",
    };
  },
};
</script>

<style lang="scss">
.kontenerNotatki {
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  height: fit-content;
  width: 90%;
  border: 0;
  background-color: white; /*#dfdfef;*/
  border-radius: 16px;
  margin-top: 12px;
  margin-bottom: 12px;
  color: #2c3e50;
  box-shadow: 0px 0px 7px gray, 0 0 2px inset gray;
  place-items: center;
  user-select: none;
  padding-top: 8px;
  padding-bottom: 8px;
}

.kontenerTytulowyNotatki {
  width: 100%;
  font-size: small;
  font-weight: 900;
}

.tytulNotatki {
  width: 80%;
}

.przyciskEdycjiNotatki {
  width: 20%;
}

.zawartoscNotatki {
  display: flex;
  flex: 1 1 auto;
  overflow-y: hidden;
  width: 90%;
  margin-top: 8px;
  margin-bottom: 8px;
  padding: 8px;
  border-radius: 16px;
}
</style>
