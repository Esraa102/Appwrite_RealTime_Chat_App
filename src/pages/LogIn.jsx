import { useEffect, useRef } from "react";
import { UseAuthContext } from "../utils/authContext";
import { Link, useNavigate } from "react-router-dom";

const LogIn = () => {
  const { user, logInUser } = UseAuthContext();
  const logInForm = useRef(null);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = logInForm.current.email.value;
    const password = logInForm.current.pass.value;
    if (email && password) {
      logInUser({ email, password });
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);
  return (
    <div className="form-container">
      <h2 className="header">Log In</h2>
      <form className="form" onSubmit={handleSubmit} ref={logInForm}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          required
          placeholder="Enter Email"
          className="input"
        />
        <label htmlFor="pass">Password</label>
        <input
          id="pass"
          type="password"
          required
          placeholder="Enter Password"
          className="input"
        />
        <button type="submit" className="btn">
          Log In
        </button>
      </form>
      <p className="text-white">
        Don&rsquo;t have an account?{" "}
        <Link className="link" to="/register">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default LogIn;
