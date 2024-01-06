import { useTranslation } from "react-i18next";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { publicRoutes } from "../routes/route";

export const GioiMonApp = () => {
  document.body.style.margin = '0';
  document.body.style.padding = '0';
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<HomePage />} />
        <Route path="/tim-truyen/:categoryId" element={<SearchPage />} /> */}
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
