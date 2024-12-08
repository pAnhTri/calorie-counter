import { NavLink } from "react-router";
import ProfileIcon from "./ProfileIcon";

const Navbar = () => {
  return (
    <header className="flex items-center justify-between px-2 w-full h-14 bg-slate-950 text-white">
      <nav className="flex items-center space-x-4">
        <NavLink
          to="/"
          className={({ isActive }) => {
            return isActive ? "text-blue-400 font-bold" : "text-white";
          }}
        >
          Logo
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) => {
            return isActive ? "text-blue-400 font-bold" : "text-white";
          }}
        >
          Profile
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => {
            return isActive ? "text-blue-400 font-bold" : "text-white";
          }}
        >
          About
        </NavLink>
      </nav>
      <ProfileIcon userName="Guest" />
    </header>
  );
};

export default Navbar;
