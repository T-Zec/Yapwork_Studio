import { useNavigate } from "react-router-dom";
import ProfileHeader from "../components/profile/ProfileHeader";
import PasswordForm from "../components/profile/PasswordForm";
import AvatarUpload from "../components/profile/AvatarUpload";
import DangerZone from "../components/profile/DangerZone";
import bgImage from "../assets/background/bg-blue.jpg";

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white/10 text-gray-900 max-w-3xl mx-auto m-8 p-6 flex flex-col gap-3 rounded-lg outline outline-white/80">
      
      <img 
        src={bgImage}
        className="fixed inset-0 w-full h-full object-cover -z-10"
      />

      <div className="fixed inset-0 bg-black/20 -z-10" />

      <h1 className="flex items-center gap-3 bg-white text-2xl font-semibold mb-2 px-4 py-2 rounded-lg shadow">
        <button 
          title="Back to dashboard"
          onClick={() => navigate("/dashboard")}
          className="w-10 h-8 text-2xl font-semibold hover:text-blue-600 hover:bg-gray-200 rounded"
        >
          &#8592;
        </button>
        
        <span className="flex-1">
          Profile Settings
        </span>
      </h1>

      <ProfileHeader />

      <AvatarUpload />

      <PasswordForm />

      <DangerZone />

    </div>
  );
};

export default Profile;