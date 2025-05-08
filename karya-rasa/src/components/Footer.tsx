import { FaInstagram, FaEnvelope, FaPhone } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-icons">
                <a href="#">
                <FaInstagram />
                </a>
                <a href="#">
                <FaEnvelope />
                </a>
                <a href="#">
                <FaPhone />
                </a>
            </div>
            <p className="footer-text">© 2025 Karya Rasa. All Right Reserved.</p>
        </footer>
    );
};

export default Footer;