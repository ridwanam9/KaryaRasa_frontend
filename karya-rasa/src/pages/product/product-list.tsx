'use client';

import { useState } from 'react';
import { products as allProducts } from '../../data/products';
import ProductCard from '../../components/ProductCard';
import FilterBar from '../../components/FilterBar';
import SortDropdown from '../../components/SortDropdown';
import Navbar from '@/components/Navbar';

export default function Home() {
    const [category, setCategory] = useState('');
    const [sort, setSort] = useState('relevance');

    let filtered = allProducts.filter(p => !category || p.category === category);

    if (sort === 'priceLow') filtered.sort((a, b) => a.price - b.price);
    if (sort === 'priceHigh') filtered.sort((a, b) => b.price - a.price);

    return (
        <>
        <Navbar />
        <div className="p-4">
        <div className="flex justify-between items-center mb-4">
        <FilterBar onChange={setCategory} />
        <SortDropdown onChange={setSort} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
        ))}
        </div>
        </div>
    </>
    );
}
