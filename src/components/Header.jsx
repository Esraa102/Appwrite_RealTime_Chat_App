import { Link } from "react-router-dom";
import { UseAuthContext } from "../utils/authContext";

const Header = () => {
  const { user, logOutUser } = UseAuthContext();

  return (
    <div className="p-4 bg-bgSecondaryColor sticky top-0 text-white">
      {user ? (
        <div className="flex items-center justify-between">
          <Link to={"/"} className="text-2xl font-bold text-mainColor">
            APPWRITE CHAT
          </Link>
          <button type="button" className="btn" onClick={logOutUser}>
            Log Out
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <p className="cursor-pointer text-2xl font-bold text-mainColor">
            APPWRITE CHAT
          </p>
          <Link className="btn" to={"/login"}>
            Log In
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
