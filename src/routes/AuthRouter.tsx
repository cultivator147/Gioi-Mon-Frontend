import { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { getUserSelector } from "../redux-toolkit/slice/userSlice/selector";
import { LoginPage } from "../app/pages/LoginPage";
import { RegisterPage } from "../app/pages/RegisterPage";
const AuthRouter = () => {
  const auth = useSelector(getUserSelector);
  console.log('authrouter: ', auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!!auth.token && auth.token !== "") {
      navigate("/");
    }
  }, []);
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};

export default AuthRouter;
