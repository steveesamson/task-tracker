import { useNavigate } from "react-router";
import useSession from "../hooks/useSession";
import Display from "./display-when";
import "./footer.css";

const Footer = () => {
  const { logout, inSession, user } = useSession();
  const navigate = useNavigate();
  return (
    <footer>
      <Display when={inSession}>
        <p className="in-session">Hi, {user?.userId}</p>
        <button className="logout-button" onClick={logout}>
          Logout
        </button>
      </Display>
      <Display when={!inSession}>
        <button className="logout-button" onClick={() => navigate("/login")}>
          Login
        </button>
      </Display>

      <p>&copy; Copyright 2025, Task Tracker.</p>
    </footer>
  );
};

export default Footer;
