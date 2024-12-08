import { CgProfile } from "react-icons/cg";

interface ProfileIconProps {
  userName: string;
}

const ProfileIcon = ({ userName }: ProfileIconProps) => {
  return (
    <div className="flex items-center">
      <span className="px-2">{userName}</span>
      <CgProfile size={32} />
    </div>
  );
};

export default ProfileIcon;
