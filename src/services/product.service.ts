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
  const ids = products.map((product) => product.id)
  await ids.forEach((id) => axios.delete(`/products/${id}`))
  return true
}
