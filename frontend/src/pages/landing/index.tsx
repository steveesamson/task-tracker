// import { useLocation, useNavigate } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../views/logo";
import "./landing.css";
import useSession from "../../hooks/useSession";
import { useEffect } from "react";

const Landing = () => {
    const { inSession } = useSession();
    const navigate = useNavigate();

    useEffect(() => {
        if (inSession) {
            navigate("/tasks");
            return;
        }
    }, [inSession, navigate]);

    return (<section className="hero">
        <Logo size={100} />
        <h1>We track your Tasks, Just Relax!</h1>
        <p>Task Tracker helps you put reliable tabs on all your interests, letting you know what most interest you - no noise - just your interests.</p>
        <p>Don't take our words for it.</p>
        <NavLink to={`/login`} className="button landing">
            Login and see for yourself
        </NavLink>
    </section>)
};

export default Landing;
