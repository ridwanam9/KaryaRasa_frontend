import AccountLayout from "@/components/AccountLayout";

const Personal = () => {
    return (
        <AccountLayout>
            <div className="personal-data">
                <div className="profile-section">
                    <img 
                        src="../pp.jpeg" 
                        alt="Profile" 
                        className="profile-photo"
                    />
                    <button className="btn-secondary">Select a photo</button>
                    <button className="btn-secondary">Change password</button>
                </div>
                <div className="data-section">
                    <h3>Change Personal Data</h3>
                    <div className="data-row">
                        <span>Nama</span>
                        <span>Nausica <a href="#">Change</a></span>
                    </div>
                    <div className="data-row">
                        <span>Tanggal Lahir</span>
                        <span><a href="#">Add date of birth</a></span>
                    </div>
                    <div className="data-row">
                        <span>Email</span>
                        <span>munyanyinyenyo@wuu.com <span className="verified">Verified</span><a href="#">Change</a></span>
                    </div>
                    <div className="data-row">
                        <span>Phone Number</span>
                        <span>+62 8237462748<a href="#">Change</a></span>
                    </div>
                </div>
            </div>
        </AccountLayout>
    );
};

export default Personal;