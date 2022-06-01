<template>
  <Datepicker v-model="date"  />
</template>

<script>
import { computed, ref, defineAsyncComponent } from 'vue';
const MonthYear = defineAsyncComponent(() => import('./Date.vue'));

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Date",

  setup() {
    const date = ref();

    // Return from computed as it is imported
    const monthYear = computed(() => MonthYear);

    return {
      date,
      monthYear
    }
  },

}
</script>

<style scoped>

</style>
