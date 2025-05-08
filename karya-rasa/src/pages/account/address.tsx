import AccountLayout from "@/components/AccountLayout";
import AddressCard from "@/components/AddressCard";

export default function AddressPage () {
    return (
        <AccountLayout>
            <h2>Address List</h2>
            <div className="search-barr">
                <input 
                    type="text" 
                    placeholder="Write the name of the address / city / sub-district of the delivery destination"
                />
                <button className="add-btn">+ Add new address</button>
            </div>

            <AddressCard
                name="Nausica"
                phone="+62 8237462748"
                address="Juan Kost Boulevard Residence, Jalan Anggrek Loka Blok AH 1 No.35, Rw. Buntu, Kec. Serpong, Kota Tangerang Selatan, Banten 15310"
            />
        </AccountLayout>
    );
}