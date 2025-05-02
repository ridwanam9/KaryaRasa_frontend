const HeroSection = () => (
    <div className="relative h-64 w-full max-w-[90%] mx-auto bg-cover bg-center rounded-lg overflow-hidden my-6"
         style={{ backgroundImage: "url('/herosection.png')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-xl font-bold mb-6">CREATE YOUR OWN CREATIVITY!</h1>
          <button className="bg-orange-500 px-4 py-2 rounded-full text-white text-sm  hover:bg-orange-600 transition duration-300">
            JOIN NOW
          </button>
        </div>
      </div>
    </div>
  );
  
  export default HeroSection;
  