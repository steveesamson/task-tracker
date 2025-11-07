import { NavLink } from "react-router";
import Footer from "./footer";
import Logo from "./logo";
import "./sidebar.css"

const SideBar = () => {
  return (
    <header>

      <Logo />

      <nav>
        <ul>
          <li>
            <NavLink
              to="/tasks"
              className={({ isActive, isPending }) =>
                isActive ? "active" : isPending ? "pending" : ""
              }
            >
              Tasks
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/stats"
              className={({ isActive, isPending }) =>
                isActive ? "active" : isPending ? "pending" : ""
              }
            >
              Stats
            </NavLink>
          </li>
        </ul>
      </nav>
      <Footer />
    </header>
  );
};

export default SideBar;
