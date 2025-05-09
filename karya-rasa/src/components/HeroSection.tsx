import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';


const HeroSection = () => {
    const router = useRouter();

    const handleJoinNow = () => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

        if (token) {
            router.push('/seller/create_seller');
        } else {
            router.push('/login'); // Ganti dengan path halaman login kamu
        }
    };
    return (
        <div className="hero-section">
            <img src="/banner.png" alt="Hero Image" width={1400}  height={400} className="hero-image" />
            <div className="hero-content">
                <h1>CREATE YOUR OWN CREATIVITY!</h1>
                <button className="hero-button" onClick={handleJoinNow}>
                    JOIN NOW!
                </button>
            </div>
        </div>
    );
};

export default HeroSection;

// import Image from 'next/image';

// const HeroSection = () => {
//     return (
//         <div className="hero-section">
//             <Image
//                 src="/banner.png"
//                 alt="Hero Image"
//                 layout="fill"
//                 objectFit="cover"
//                 className="hero-image"
//                 priority
//             />

//             <div className="hero-content">
//                 <h1 className="hero-title">CREATE YOUR OWN CREATIVITY!</h1>
//                 <button className="hero-button">JOIN NOW!</button>
//             </div>
//         </div>
//     );
// };

// export default HeroSection;