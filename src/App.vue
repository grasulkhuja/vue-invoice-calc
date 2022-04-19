<template>
  <v-app>
    <app-bar />
    <v-main>
      <invoice-calculator />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import AppBar from '@/components/app/AppBar.vue'
import InvoiceCalculator from '@/components/InvoiceCalculator.vue'
export default Vue.extend({
  name: 'App',
  components: { InvoiceCalculator, AppBar },
})
</script>
