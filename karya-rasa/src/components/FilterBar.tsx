'use client';
export default function FilterBar({ onChange }: { onChange: (category: string) => void }) {
    return (
        <select
            className="border p-2 rounded"
            onChange={(e) => onChange(e.target.value)}
        >
        <option value="">All Categories</option>
        <option value="Accessories">Accessories</option>
        <option value="Art&Colectibles">Art & Collectibles</option>
        <option value="Clothing">Clothing</option>
        <option value="Jewelry">Jewelry</option>
        <option value="Craft-Supplies&Tools">Craft Supplies & Tools</option>
        <option value="Toys&Games">Toys & Games</option>
    </select>
    );
}
