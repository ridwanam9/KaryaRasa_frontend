'use client';
export default function SortDropdown({ onChange }: { onChange: (sort: string) => void }) {
    return (
    <select
        className="border p-2 rounded"
        onChange={(e) => onChange(e.target.value)}
    >
        <option value="relevance">Sort by: Relevance</option>
        <option value="priceLow">Price: Low to High</option>
        <option value="priceHigh">Price: High to Low</option>
    </select>
    );
}
