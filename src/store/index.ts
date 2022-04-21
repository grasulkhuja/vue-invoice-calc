import Vue from 'vue'
import Vuex from 'vuex'
import { Product } from '@/types/product'
import { getAllProducts, addProduct, deleteProducts } from '@/services/product.service'
import { NotificationType } from '@/types/notification'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notifications: [] as NotificationType[],
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
    products: (state) => {
      return state.products.map((product) => {
        const summary = product.price * product.quantity
        return { ...product, summary }
      })
    },
    productTableHeaders: (state) => state.productTableHeaders,
    selectedProducts: (state) => state.selectedProducts,
    total: (state) => {
      return state.products.reduce((total: number, product: Product) => {
        return total + product.price * product.quantity
      }, 0)
    },
    notifications: (state) => state.notifications,
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
    ADD_NOTIFICATION(state, notification: NotificationType) {
      state.notifications.push(notification)
    },
  },
  actions: {
    async getAllProducts({ commit }) {
      const products = await getAllProducts()
      commit('SET_PRODUCTS', products)
    },

    async addProduct({ commit, dispatch }, product: Product) {
      const newProduct = await addProduct(product).catch((error) => {
        commit('ADD_NOTIFICATION', {
          type: 'error',
          message: error.response.data.message,
        })
      })
      commit('ADD_PRODUCT', newProduct)
      await dispatch('addNotification', {
        type: 'success',
        message: 'Product added successfully',
      })
    },

    async deleteProducts({ commit, dispatch }, products: Product[]): Promise<void> {
      await deleteProducts(products).catch((error) => {
        commit('ADD_NOTIFICATION', {
          type: 'error',
          message: error.response.data.message,
        })
      })
      await dispatch('getAllProducts')
      await dispatch('addNotification', {
        type: 'success',
        message: 'Product added successfully',
      })
    },
    addNotification({ commit }, notification: NotificationType) {
      commit('ADD_NOTIFICATION', notification)
    },
  },
  modules: {},
})
