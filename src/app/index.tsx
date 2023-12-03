import { useTranslation } from "react-i18next";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { SearchPage } from "./pages/SearchPage";

export const GioiMonApp = () => {
  document.body.style.margin = '0';
  document.body.style.padding = '0';
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tim-truyen/*" element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  );
};
