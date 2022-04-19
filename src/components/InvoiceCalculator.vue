<template>
  <v-container>
    <v-row class="mt-2">
      <v-col cols="12">
        <v-card>
          <v-card-title>Vue Invoice Calculator</v-card-title>
          <v-card-text>
            <v-text-field
              v-model="product.name"
              dense
              outlined
              label="Product name"
              hint="Enter a product name"
            />
            <v-text-field
              v-model="product.price"
              dense
              outlined
              label="Product price"
              hint="Enter a product price"
            />
            <v-text-field
              v-model="product.quantity"
              dense
              outlined
              label="Product quantity"
              hint="Enter a product quantity"
            />
            <v-spacer />
            <v-btn outlined @click.prevent="addProduct">Add</v-btn>
            <v-data-table
              :headers="productTableHeaders"
              :items="products"
              item-key="id"
              disable-pagination
              hide-default-footer
            />
            <v-card-actions>
              <v-btn outlined>Delete</v-btn>
              <v-spacer />
              Total: {{ total }}
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'
import { Product } from '@/types/product'
import Vue from 'vue'
export default Vue.extend({
  name: 'InvoiceCalculator',
  methods: {
    async addProduct(): Promise<void> {
      await this.$store.dispatch('addProduct', this.product)
      await this.$store.dispatch('clearProduct')
    },
  },
  computed: {
    product: {
      get(): Product {
        return {
          id: this.$store.state.products.length + 1,
          name: '',
          price: null as never,
          quantity: null as never,
        }
      },
      set(value: Product): void {
        this.$store.dispatch('addProduct', value)
      },
    },
    ...mapGetters({
      products: 'products',
      productTableHeaders: 'productTableHeaders',
      total: 'total',
    }),
  },
})
</script>

<style scoped></style>
