import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '@/components/Navbar'

interface Product {
  id: number
  name: string
  description: string
  price: number
  image_url: string
  rating: number
}

const ProductDetailPage = () => {
  const router = useRouter()
  const { id } = router.query
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    if (id) {
      axios.get(`https://dying-helli-ridwanam9-4b98d171.koyeb.app/products/${id}`)
        .then((res) => setProduct(res.data))
        .catch((err) => console.error(err))
    }
  }, [id])

  if (!product) return <div className="text-center mt-10">Loading product...</div>

  return (
    <>
      <Navbar />
      <div className="bg-[#ffffff] min-h-screen text-black pt-40 px-6">

        <div className="bg-white max-w-6xl mx-auto rounded-md shadow p-6">
          <h1 className="text-lg text-gray-700 font-semibold mb-4">Product detail</h1>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Left: Product Image */}
            <div className="md:w-1/2">
              <img
                src={product.image_url}
                alt={product.name}
                className="rounded w-full object-cover"
              />
            </div>

            {/* Right: Product Info */}
            <div className="md:w-1/2 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-bold">{product.name}</h2>
                {/* <div className="flex items-center gap-1 mt-1 text-sm text-gray-600">
                  <span>⭐</span>
                  <span>{product.rating.toFixed(1)}</span>
                </div> */}
                <div className="text-sm text-gray-500 mt-1">⭐ 4.9</div>


                <p className="text-lg font-semibold text-black mt-2">
                  Rp. {product.price.toLocaleString()}
                </p>

                <div className="mt-4">
                  <h3 className="text-green-600 font-semibold">Detail</h3>
                  <p className="text-sm text-gray-700 mt-1 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Quantity and Notes Box */}
              <div className="mt-6 border rounded-md p-4 shadow-sm">
                <h4 className="font-medium">Set quantity and notes</h4>
                <textarea
                  placeholder="Add notes (optional)..."
                  className="mt-2 w-full border rounded-md p-2 text-sm resize-none"
                  rows={3}
                ></textarea>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-gray-600 mt-10 border-t pt-6">
            © 2025 Karya Rasa. All Right Reserved.
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductDetailPage
