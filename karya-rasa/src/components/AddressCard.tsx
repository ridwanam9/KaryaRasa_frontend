type AddressCardProps = {
    name: string;
    phone: string;
    address: string;
};

export default function AddressCard({ name, phone, address }: AddressCardProps) {
    return (
        <div className="address-card">
            <p><strong>{name}</strong></p>
            <p>{phone}</p>
            <p>{address}</p>
            <div className="address-actions">
                <a href="#" className="edit">Ubah Alamat</a>
                <a href="#" className="delete">Hapus</a>
            </div>
        </div>
    );
}