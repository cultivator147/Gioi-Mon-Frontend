import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { getUserSelector } from "../redux-toolkit/slice/userSlice/selector";
import { SearchPage } from "../app/pages/SearchPage";
import NickName from "../app/pages/RegisterPage/RegisterProfile/NickName";
import Birth from "../app/pages/RegisterPage/RegisterProfile/Birthday";
import Gender from "../app/pages/RegisterPage/RegisterProfile/Gender";
import { UserSlice } from "../redux-toolkit/slice/userSlice";
import Avatar from "../app/pages/RegisterPage/RegisterProfile/Avatar";
import { ProfilePage } from "../app/pages/ProfilePage";
const PrivateRouter = () => {
  const auth = useSelector(getUserSelector);
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth.isLogin) {
      const item = localStorage.getItem("persist:state");
      const itemUser = JSON.parse(JSON.parse(item || "{}")?.user);
      if (itemUser.isLogin) {
        return;
      }else{
        navigate("/auth");
      }
    }else{
      return;
    }
  }, []);
  UserSlice();

  return (
    <Routes>
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/profile/nickname" element={<NickName />} />
      <Route path="/profile/avatar" element={<Avatar />} />
      <Route path="/profile/birthday" element={<Birth />} />
      <Route path="/profile/gender" element={<Gender />} />
    </Routes>
  );
};

export default PrivateRouter;
