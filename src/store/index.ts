import Vue from 'vue'
import Vuex from 'vuex'
import { Product } from '@/types/product'
import { getAllProducts, addProduct } from '@/services/product.service'

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
        text: 'Summary',
        value: 'summary',
      },
    ],
    selectedProducts: [] as Product[],
  },
  getters: {
    product: (state) => state.product,
    products: (state) => state.products,
    productTableHeaders: (state) => state.productTableHeaders,
    selectedProducts: (state) => state.selectedProducts,
    total: (state) => {
      state.products.reduce((total: number, product: Product) => {
        return total + product.price * product.quantity
      }, 0)
    },
  },
  mutations: {
    SET_PRODUCTS(state, products: Product[]) {
      state.products = products
    },
    ADD_PRODUCT(state, product: Product) {
      state.products.push(product)
    },
    CLEAR_PRODUCT(state) {
      state.product = {} as Product
    },
  },
  actions: {
    async getAllProducts({ commit }) {
      const products = await getAllProducts()
      commit('SET_PRODUCTS', products)
    },

    async addProduct({ commit }, product: Product) {
      const newProduct = await addProduct(product)
      commit('ADD_PRODUCT', newProduct)
    },

    clearProduct({ commit }) {
      commit('CLEAR_PRODUCT')
    },
    async calculateSummaryForEachItem(context, product: Product): Promise<number> {
      return product.price * product.quantity
    },
    // calculateSummaryForEachItem({ state }) {
    //   state.products.forEach((product: Product) => {
    //     product.summary = product.price * product.quantity
    //   })
    // },
  },
  modules: {},
})
