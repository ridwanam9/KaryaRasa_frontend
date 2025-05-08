import Image from 'next/image';

const HeroSection = () => {
    return (
        <div className="hero-section">
            <Image src="/banner.png" alt="Hero Image" width={1400}  height={400} className="hero-image" />
            <div className="hero-content">
                <h1>CREATE YOUR OWN CREATIVITY!</h1>
                <button className="hero-button">JOIN NOW!</button>
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