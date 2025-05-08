import HelpSection from "./HelpSection";

const AboutSection = () => {
    return (
        <div className="about-section">
            <h2>What is Karya Rasa?</h2>
            <div className="about-block">
                <h3>Celebrating Craft, Embracing Soul</h3>
                <p>Karya Rasa is a digital home for local artisans to share meaningful creations. Here, every product is more than just an item — it’s a reflection of passion, dedication, and the heartfelt journey behind each handmade piece. We believe that every craft carries a soul.</p>
            </div>
            <div className="about-block">
                <h3>Empowering Local Artisans</h3>
                <p>There are no warehouses at Karya Rasa — only talented creators working from their homes and small studios. We simplify the process so you can connect directly with makers and discover unique, heartfelt creations.</p>
            </div>
            <div className="about-block">
                <h3>Safe and Seamless Shopping</h3>
                <p>There are no warehouses at Karya Rasa — only talented creators working from their homes and small studios. We simplify the process so you can connect directly with makers and discover unique, heartfelt creations.</p>
            </div>
            <HelpSection />
        </div>
    );
};

export default AboutSection;