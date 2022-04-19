import Vue from 'vue'
import Vuex from 'vuex'
import { Product } from '@/types/product'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    product: {} as Product,
    products: [] as Product[],
    productTableHeaders: [
      {
        text: 'Name',
        value: 'name',
      },
      {
        text: 'Price',
        value: 'price',
      },
      {
        text: 'Quantity',
        value: 'quantity',
      },
      {
        text: 'Sum',
        value: 'sum',
      },
    ],
  },
  getters: {
    product: (state) => state.product,
    products: (state) => state.products,
    productTableHeaders: (state) => state.productTableHeaders,
    total: (state) => {
      state.products.reduce((total: number, product: Product) => {
        return total + product.price * product.quantity
      }, 0)
    },
  },
  mutations: {
    ADD_PRODUCT(state, product: Product) {
      state.products.push(product)
    },
    CLEAR_PRODUCT(state) {
      state.product = {} as Product
    },
  },
  actions: {
    addProduct({ commit }, product: Product) {
      commit('ADD_PRODUCT', product)
    },
    clearProduct({ commit }) {
      commit('CLEAR_PRODUCT')
    },
  },
  modules: {},
})
