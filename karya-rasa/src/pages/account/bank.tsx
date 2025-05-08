'use client' ;

import React, { useState, useRef, useEffect } from 'react';
import AccountLayout from '@/components/AccountLayout';

type BankAccount = {
    id: number;
    bankName: string;
    accountNumber: string;
    accountHolder: string;
};

export default function Bank() {
    const formRef = useRef<HTMLDivElement>(null);

    const [accounts, setAccounts] = useState<BankAccount[]>([
        {
            id: 1,
            bankName: 'BRI',
            accountNumber: '112233445555',
            accountHolder: 'Nausica',
        },
    ]);
    const [showForm, setShowForm] = useState(false);
    const [bankName, setBankName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [accountHolder, setAccountHolder] = useState('');

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (formRef.current && !formRef.current.contains(event.target as Node)) {
                setShowForm(false);
            }
        }

        if (showForm) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document. removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showForm]);

    const handleAddAccount = () => {
        const newAccount: BankAccount = {
            id: Date.now(),
            bankName,
            accountNumber,
            accountHolder,
        };
        setAccounts([...accounts, newAccount]);

        // Reset form
        setBankName('');
        setAccountNumber('');
        setAccountHolder('');
        setShowForm(false);
    };

    const handleDelete = (id:number) => {
        setAccounts(accounts.filter((acc) => acc.id !== id));
    };

    return(
        <AccountLayout>
        <div className="containerr">
            <div className="headerr">
                <h2>Bank Account</h2>
                <button className="addBtn" onClick={() => setShowForm(true)}>
                    + Add New Account
                </button>
            </div>

            {showForm && (
                <div className="formContainer" ref={formRef}>
                    <h3>What account do you want to add?</h3>
                    <input 
                        type="text" 
                        placeholder="Bank Name"
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                    />
                    <input 
                        type="text" 
                        placeholder="Account number"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                    />
                    <input 
                        type="text" 
                        placeholder="Account holder"
                        value={accountHolder}
                        onChange={(e) => setAccountHolder(e.target.value)}
                    />
                    <button onClick={handleAddAccount}>Add account</button>
                </div>
            )}

            <div className="accountList">
                {accounts.map((acc) => (
                    <div key={acc.id} className="accountCard">
                        <p><strong>{acc.bankName}</strong></p>
                        <p><strong>{acc.accountNumber}</strong></p>
                        <p><strong>{acc.accountHolder}</strong></p>
                        <button className="deleteBtn" onClick={() => handleDelete(acc.id)}>
                            Hapus
                        </button>
                    </div>
                ))}
            </div>
        </div>
        </AccountLayout>
    );
}