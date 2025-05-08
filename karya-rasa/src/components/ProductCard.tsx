'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function ProductCard({ product }: { product: any }) {
    return (
    <Link href={`/product/${product.id}`}>
        <div className="border rounded-lg p-2 hover:shadow-lg transition">
        <Image
            src={product.image}
            alt={product.name}
            width={200}
            height={200}
            className="rounded"
        />
        <div className="mt-2 text-sm text-gray-700">{product.category}</div>
        <div className="text-base font-semibold">{product.name}</div>
        <div className="text-sm text-blue-600">Rp. {product.price.toLocaleString()}</div>
        <div className="text-sm text-yellow-500">⭐ {product.rating}</div>
        </div>
    </Link>
    );
}
