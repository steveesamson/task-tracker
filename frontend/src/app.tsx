import { Outlet } from "react-router-dom";
import SideBar from "./views/sidebar";
import Status from "./views/status";
import "./app.css";
import useSession from "./hooks/useSession";

const App = () => {
  const { inSession } = useSession();

  if (inSession) {
    return (
      <div className="page">
        <SideBar />
        <main>
          <Status />
          <section className="liner" id="scroller">
            <article className="container">
              <Outlet />
            </article>
          </section>
        </main>
      </div>
    );
  }
  return (
    <div className="page guest">
      <main>
        <Status />
        <section className="liner" id="scroller">
          <article className="container">
            <Outlet />
          </article>
        </section>
      </main>
    </div>
  );


}

export default App
