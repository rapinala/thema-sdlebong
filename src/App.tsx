import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import DatasetPage from "./pages/DatasetPage";
import OrganisasiPage from "./pages/OrganisasiPage";
import GroupPage from "./pages/GroupPage";
import TopikPage from "./pages/TopikPage";
import PanduanPage from "./pages/PanduanPage";
import MasukPage from "./pages/MasukPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/masuk" element={<Layout><MasukPage /></Layout>} />
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/dataset" element={<Layout><DatasetPage /></Layout>} />
        <Route path="/organisasi" element={<Layout><OrganisasiPage /></Layout>} />
        <Route path="/group" element={<Layout><GroupPage /></Layout>} />
        <Route path="/topik" element={<Layout><TopikPage /></Layout>} />
        <Route path="/panduan" element={<Layout><PanduanPage /></Layout>} />
        <Route path="*" element={<Layout><HomePage /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}