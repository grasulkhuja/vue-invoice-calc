import axios from '@/libs/axios'
import { Product } from '@/types/product'

export const getAllProducts = async (): Promise<Product[]> => {
  const { data } = await axios.get('/products')
  return data
}

export const addProduct = async (product: Product): Promise<Product> => {
  const { data } = await axios.post('/products', product)
  return data
}

export const deleteProducts = async (products: Product[]): Promise<boolean> => {
  await Promise.all(
    products.map(async (product) => {
      await axios.delete(`/products/${product.id}`)
    }),
  )
  return true
}
