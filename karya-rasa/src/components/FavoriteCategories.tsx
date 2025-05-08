import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';

const categories = [
    { name: 'Clothing', image: '/clothing.png' },
    { name: 'Accessories', image: '/accessories.png' },
    { name: 'Keychain', image: '/keychain.png' },
    { name: 'Toys', image: '/toys.png' },
    { name: 'Jewelry', image: '/accs6.jpg' },
    { name: 'Art', image: '/art3.jpg' }
];

const MostSearchedCategories = () => {
    return (
        <div className="categories-section">
            <h2>Most searched categories</h2>
            <Swiper
                slidesPerView={2}
                spaceBetween={20}
                navigation
                breakpoints={{
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                }}
                modules={[Navigation]}
            >
                {categories.map((cat, index) => (
                    <SwiperSlide key={index}>
                        <div className="category-item">
                            <a href="#">
                                <img src={cat.image} alt={cat.name} className="category-image" />
                                <p>{cat.name}</p>
                            </a>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default MostSearchedCategories;

// // components/HeroSection.tsx
// import Image from 'next/image';

// const HeroSection = () => {
//   return (
//     <div className="w-full">
//       <Image src="/hero-craft.jpg" alt="Hero Image" width={1400} height={400} className="rounded-xl object-cover w-full h-[400px]" />
//       <div className="absolute top-32 left-1/2 transform -translate-x-1/2 text-white text-center">
//         <h1 className="text-3xl font-bold mb-4">CREATE YOUR OWN CREATIVITY!</h1>
//         <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full">JOIN NOW!</button>
//       </div>
//     </div>
//   );
// };

// export default HeroSection;


// // components/MostSearchedCategories.tsx
// const categories = [
//   { name: 'Clothing', image: '/category1.jpg' },
//   { name: 'Accessories', image: '/category2.jpg' },
//   { name: 'Keychain', image: '/category3.jpg' },
//   { name: 'Toys', image: '/category4.jpg' },
// ];

// const MostSearchedCategories = () => {
//   return (
//     <div className="px-10 mt-12">
//       <h2 className="text-xl font-semibold mb-6">Most searched categories</h2>
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//         {categories.map((cat, index) => (
//           <div key={index} className="text-center">
//             <img src={cat.image} alt={cat.name} className="rounded-xl w-full h-48 object-cover mb-2" />
//             <p>{cat.name}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MostSearchedCategories;


// // components/AboutSection.tsx
// const AboutSection = () => {
//   return (
//     <div className="bg-orange-100 py-10 px-10 grid md:grid-cols-3 gap-8">
//       <div>
//         <h3 className="font-semibold mb-2">Celebrating Craft, Embracing Soul</h3>
//         <p className="text-sm">Karya Rasa is a digital home for local artisans... every craft carries a soul.</p>
//       </div>
//       <div>
//         <h3 className="font-semibold mb-2">Empowering Local Artisans</h3>
//         <p className="text-sm">There are no warehouses at Karya Rasa... heartfelt creations.</p>
//       </div>
//       <div>
//         <h3 className="font-semibold mb-2">Safe and Seamless Shopping</h3>
//         <p className="text-sm">We simplify the process... heartfelt creations.</p>
//       </div>
//     </div>
//   );
// };

// export default AboutSection;


// // components/HelpSection.tsx
// const HelpSection = () => {
//   return (
//     <div className="text-center py-10 bg-orange-100">
//       <p className="mb-4 font-medium">Have a question? Well, we’ve got some answers.</p>
//       <button className="border border-gray-800 px-6 py-2 rounded-full hover:bg-gray-100">Go to Help Center</button>
//     </div>
//   );
// };

// export default HelpSection;


// // components/Footer.tsx
// import { FaInstagram, FaEnvelope, FaPhone } from 'react-icons/fa';

// const Footer = () => {
//   return (
//     <footer className="bg-indigo-200 py-6 text-center">
//       <div className="flex justify-center gap-6 mb-2 text-xl">
//         <FaInstagram />
//         <FaEnvelope />
//         <FaPhone />
//       </div>
//       <p className="text-sm">© 2025 Karya Rasa. All Right Reserved.</p>
//     </footer>
//   );
// };

// export default Footer;