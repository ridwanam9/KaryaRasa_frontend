import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from "@/components/Navbar";


interface Product {
  id: number
  name: string
  description: string
  price: number
  image_url: string
  category: string
  stock: number
}

const ProductDetail = () => {
  const router = useRouter()
  const { id } = router.query
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    if (id) {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`)
        .then(res => setProduct(res.data))
        .catch(err => console.error(err))
    }
  }, [id])

  if (!product) return <div className="text-center mt-10">Loading...</div>

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-6 flex gap-6">
        <img src={product.image_url} alt={product.name} className="w-1/2 rounded object-cover" />
        
        <div className="flex flex-col w-1/2 justify-between">
          <div>
            <h2 className="text-2xl font-semibold">{product.name}</h2>
            <div className="text-sm text-gray-500 mt-1">⭐ 4.9</div>
            <div className="text-xl font-bold text-black mt-2">Rp. {product.price.toLocaleString()}</div>
            
            <h3 className="mt-4 text-green-600 font-bold">Detail</h3>
            <p className="text-sm text-gray-700 mt-1">{product.description}</p>
          </div>

          <div className="border mt-6 p-4 rounded shadow-sm">
            <h4 className="font-medium">Set quantity and notes</h4>
            {/* Form qty & catatan */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
