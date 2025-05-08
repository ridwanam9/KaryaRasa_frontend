import React from 'react';
import { useState } from 'react';

type Props = {
  onSwitch: () => void;
};

interface UseVoucherButtonProps extends Props {
  onClick?: () => void; // Add onClick as an optional property
}

const UseVoucherButton: React.FC<UseVoucherButtonProps> = ({ onSwitch, onClick }) => {
    const [voucherButton, setVoucherButton] = useState(false);

    const toggleVoucher = () => {
        setVoucherButton(false);

    };

    return (
        <div className="flex flex-col items-center mb-6">
            <button
                className="bg-gray-200 text-gray-700 rounded-full px-6 py-2 font-semibold border border-gray-300"
                onClick={() => { toggleVoucher(); onSwitch(); }}
            >
                Use Voucher or Promo code
            </button>

{voucherButton && (
            <div className="mb-4">
                <input
                    type="text"
                    className="mt-2 w-full p-2 border rounded"
                    placeholder="Add voucher code here..."
                    onChange={(e) => console.log(e.target.value)}
                />
                <button className="bg-blue-500 text-white rounded px-4 py-2 mt-2" onClick={onClick}>
                  Use Voucher
                </button>
            </div>
            )}
        </div>
    );
};

export default UseVoucherButton;