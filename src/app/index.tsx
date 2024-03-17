import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRouter from "../routes/PrivateRouter";
import PublicRouter from "../routes/PublicRouter";
import AuthRouter from "../routes/AuthRouter";
import { UserSlice } from "../redux-toolkit/slice/userSlice";

export const GioiMonApp = () => {
  document.body.style.margin = "0";
  document.body.style.padding = "0";
  UserSlice();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/*" element={<AuthRouter />} />
        <Route path="/*" element={<PublicRouter />} />
        <Route path="/user/*" element={<PrivateRouter />} />
      </Routes>
    </BrowserRouter>
  );
};
