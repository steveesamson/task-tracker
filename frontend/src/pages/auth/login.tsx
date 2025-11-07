import { useCallback, useState, type ChangeEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { login as dologin } from "./loader";
import Display from "../../views/display-when";
import useSession from "../../hooks/useSession";
import "./login.css";
import type { LoginParams } from "../../types";
import { isEmpty } from "../../utils";
import Logo from "../../views/logo";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useSession();
  const [params, setParams] = useState<LoginParams>({ userId: "", password: "" });
  const [formError, setError] = useState("");

  const onParams = useCallback(
    (e: ChangeEvent<HTMLInputElement>, name: string) => {
      const { value } = e.target;
      setParams((oldVal) => ({ ...oldVal, [name]: value }));
    },
    [setParams]
  );

  const onLogin = useCallback(
    async () => {
      const { userId, password } = params;
      if (!isEmpty(userId) && !isEmpty(password)) {
        const { error, data } = await dologin(params);
        if (error) {
          setError(error);
          return;
        }
        if (location.state) {
          login(data, location.state);
        } else {
          login(data);
        }

        return;
      }
      setError("Enter User ID and password to login.");
    },
    [params, setError, login, location]
  );

  const onKeyUp = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      onLogin();
    }
  }, [onLogin])

  return (
    <form className="content login" method="POST">
      <Logo size={60} />
      <fieldset>
        <legend>Login to Task Tracker</legend>
        <Display when={!!formError}>
          <small className="error">{formError}</small>
        </Display>

        <div className="form-field">
          <label htmlFor="userId">User ID:</label>
          <input
            type="text"
            id="userId"
            name="userId"
            className="input"
            placeholder="Enter User ID"
            defaultValue={params.userId}
            onChange={(e) => onParams(e, "userId")}
          />
        </div>
        <div className="form-field">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            className="input"
            placeholder="Enter Password"
            defaultValue={params.password}
            onChange={(e) => onParams(e, "password")}
            onKeyUp={onKeyUp}
          />
        </div>
      </fieldset>
      <section className="card submit">
        <button type="button" className="primary" onClick={onLogin}>
          Login
        </button>
        <button type="button" className="button" onClick={() => navigate(-1)}>
          Cancel
        </button>
      </section>
    </form>
  );
};

export default Login;
