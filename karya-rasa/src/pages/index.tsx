import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import AuthModal from "@/components/AuthModal";
import MostSearchedCategories from "@/components/FavoriteCategories";
import AboutSection from "@/components/AboutUs";
import { useState } from "react";

export default function Home(){
    const [showAuth, setShowAuth] = useState(false);

    return (
        <div>
            <Navbar />
            <HeroSection />
            <MostSearchedCategories />
            <AboutSection />
            <Footer/>
        </div>
    );
}