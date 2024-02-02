import { useTranslation } from "react-i18next";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../routes/route";
import PrivateRouter from "../routes/PrivateRouter";

export const GioiMonApp = () => {
  document.body.style.margin = '0';
  document.body.style.padding = '0';
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
    
      <Routes>
      {/* <Route element={<PrivateRouter/>}> */}
      <Route>
      {privateRoutes.map(item => (
                        <Route
                            key={item.path}
                            path={item.path}
                            element={<item.component/>}
                        />
                    ))}
      </Route>
      {publicRoutes.map(item => (
                        <Route
                            key={item.path}
                            path={item.path}
                            element={<item.component/>}
                        />
                    ))}
      </Routes>
        
    </BrowserRouter>
  );
};
