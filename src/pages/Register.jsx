import { UseAuthContext } from "../utils/authContext";
import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
const Register = () => {
  const { user, registerUser } = UseAuthContext();
  const navigate = useNavigate();
  const registerFormRef = useRef(null);
  const [emailErr, setEmailErr] = useState(false);
  const [passErr, setPassErr] = useState(false);
  const [confirmPassErr, setConfirmPassErr] = useState(false);
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);
  const validEmail = () => {
    const email = registerFormRef.current.email.value;
    const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (emailRegexp.test(email)) {
      return true;
    } else {
      return false;
    }
  };
  const validPassword = () => {
    if (registerFormRef.current.pass.value.length >= 8) {
      return true;
    } else {
      setPassErr(true);
      return false;
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = registerFormRef.current.name.value;
    const email = validEmail()
      ? registerFormRef.current.email.value
      : setEmailErr(true);

    const pass =
      validPassword() ||
      registerFormRef.current.pass.value ===
        registerFormRef.current.confirm.value
        ? registerFormRef.current.pass.value
        : setConfirmPassErr(true);

    if (name && email && pass) {
      registerUser({ name, email, pass });
    }
  };
  return (
    <div className="form-container">
      <h2 className="header">Sign In</h2>
      <form className="form" ref={registerFormRef} onSubmit={handleSubmit}>
        <label htmlFor="name">Username</label>
        <input
          type="text"
          id="name"
          placeholder="Enter Username..."
          required
          className="input"
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          required
          placeholder="Enter Email"
          className="input"
        />
        {emailErr && <span className="error">Email Is Invalid</span>}
        <label htmlFor="pass">Password</label>
        <input
          id="pass"
          type="password"
          required
          placeholder="Enter Password"
          className="input"
        />
        {passErr && (
          <span className="error">
            Password Should Be At Least 8 characters
          </span>
        )}
        <label htmlFor="confirm">Confirm Password</label>
        <input
          id="confirm"
          type="password"
          required
          placeholder="Enter Password Again..."
          className="input"
        />
        {confirmPassErr && (
          <span className="error">Password And Re-password Do Not Match</span>
        )}
        <button type="submit" className="btn">
          Sign In
        </button>
      </form>
      <p className="text-white">
        Already Have an account?{" "}
        <Link to="/login" className="link">
          Log In
        </Link>
      </p>
    </div>
  );
};

export default Register;
