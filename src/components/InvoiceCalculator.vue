<template>
  <v-container>
    <v-row class="mt-2">
      <v-col cols="12">
        <v-card>
          <v-card-title>Vue Invoice Calculator</v-card-title>
          <v-card-text>
            <validation-observer ref="isProductValid" v-slot="{ invalid }">
              <v-form @submit.prevent="addProduct">
                <v-row>
                  <v-col cols="12" md="6">
                    <validation-provider name="Product name" v-slot="{ errors }" rules="required">
                      <v-text-field
                        v-model="product.name"
                        dense
                        outlined
                        label="Product name"
                        hint="Enter a product name"
                        :hide-details="!errors"
                        :error-messages="errors[0]"
                      />
                    </validation-provider>
                  </v-col>
                  <v-col cols="12" md="2">
                    <validation-provider name="Price" rules="required" v-slot="{ errors }">
                      <v-text-field
                        v-model="product.price"
                        :hide-details="!errors"
                        :error-messages="errors[0]"
                        dense
                        outlined
                        label="Price"
                        hint="Enter a product price"
                      />
                    </validation-provider>
                  </v-col>
                  <v-col cols="12" md="2">
                    <validation-provider
                      name="Quantity"
                      rules="required|numeric"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        v-model="product.quantity"
                        dense
                        outlined
                        label="Quantity"
                        hint="Enter a product quantity"
                        :hide-details="!errors"
                        :error-messages="errors[0]"
                      />
                    </validation-provider>
                  </v-col>
                  <v-col cols="12" md="1" class="ml-auto mr-4">
                    <v-btn outlined type="submit" @click.prevent="addProduct" :disabled="invalid">
                      Add
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </validation-observer>
            <v-data-table
              v-model="selectedProducts"
              :headers="productTableHeaders"
              :items="products"
              item-key="id"
              disable-pagination
              hide-default-footer
              show-select
            >
              <template v-slot:[`item.summary`]="{ item }">
                {{ summaryForEachProduct(item) }}
              </template>
            </v-data-table>
            <v-card-actions>
              <v-btn outlined :disabled="!selectedProducts.length">Delete</v-btn>
              <v-spacer />
              <p>
                Total: $ <span>{{ total ? total : 0 }}</span>
              </p>
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar
      v-model="notification.show"
      v-for="notification in notifications"
      :key="notification.id"
      :timeout="3000"
      :color="notification.type"
    >
      {{ notification.message }}
      <template v-slot:action="{ attrs }">
        <v-btn
          outlined
          :color="notification.type"
          text
          v-bind="attrs"
          @click="notification.show = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script lang="ts">
import { mapGetters, mapState } from 'vuex'
import { Product } from '@/types/product'
import { NotificationType } from '@/types/notification'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
import { required, numeric } from 'vee-validate/dist/rules'
import Vue from 'vue'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} can not be empty',
})
extend('numeric', {
  ...numeric,
  message: '{_field_} can contain only numbers',
})

declare module 'vue/types/vue' {
  interface Vue {
    notifications: NotificationType[]
    fetchAllProducts: () => void
  }
}

export default Vue.extend({
  name: 'InvoiceCalculator',
  data() {
    return {
      notifications: [] as NotificationType[],
      selectedProducts: [] as Product[],
    }
  },
  methods: {
    async fetchAllProducts() {
      await this.$store.dispatch('getAllProducts')
    },
    async addProduct(): Promise<void> {
      await this.$store.dispatch('addProduct', this.product)
      await this.$store.dispatch('clearProduct')
      this.notifications.push({
        id: this.notifications.length,
        type: 'success',
        message: 'Product added successfully',
        show: true,
      })
    },
    summaryForEachProduct(product: Product): number {
      return product.quantity * product.price
    },
  },
  computed: {
    ...mapState({ product: 'product' }),
    ...mapGetters({
      products: 'products',
      productTableHeaders: 'productTableHeaders',
    }),
    total() {
      return this.products.reduce((total: number, product: Product) => {
        return total + product.price * product.quantity
      }, 0)
    },
  },
  created() {
    this.fetchAllProducts()
  },
  components: {
    ValidationObserver,
    ValidationProvider,
  },
})
</script>
