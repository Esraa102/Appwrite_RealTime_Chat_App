import { useContext, useState, useEffect, createContext } from "react";
import { account } from "./appwriteConfig";
export const AuthContext = createContext();
import Loader from "../components/Loader";
import { ID } from "appwrite";
// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  useEffect(() => {
    checkStatus();
  }, []);
  const registerUser = async (info) => {
    setLoading(true);
    try {
      const response = await account.create(
        ID.unique(),
        info.email,
        info.pass,
        info.name
      );
      await account.createEmailSession(info.email, info.pass);
      console.log(response);
      const emailDetails = await account.get();
      setUser(emailDetails);
    } catch (error) {
      console.log("error comes from registerUser", error);
    }
    setLoading(false);
  };
  const logInUser = async (info) => {
    setLoading(true);
    try {
      const response = await account.createEmailSession(
        info.email,
        info.password
      );
      console.log(response);
      const emailDetails = await account.get();
      setUser(emailDetails);
    } catch (error) {
      console.log("error comes form logInUser", error);
    }
    setLoading(false);
  };
  const logOutUser = async () => {
    await account.deleteSession("current");
    setUser(null);
  };
  const checkStatus = async () => {
    try {
      const emailDetails = await account.get();
      setUser(emailDetails);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  return (
    <AuthContext.Provider
      value={{ user, registerUser, logInUser, logOutUser, checkStatus }}
    >
      {loading ? <Loader screen={true} bgTransparent={false} /> : children}
    </AuthContext.Provider>
  );
};

export const UseAuthContext = () => {
  return useContext(AuthContext);
};
