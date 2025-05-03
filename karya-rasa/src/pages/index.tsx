import Navbar from "@/components/Navbar";
import AuthModal from "@/components/AuthModal";
import { useState } from "react";

export default function Home(){
    const [showAuth, setShowAuth] = useState(false);

    return (
        <div>
            <Navbar />
        </div>
    );
}