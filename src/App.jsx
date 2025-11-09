import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Catalog from "./pages/Catalog/Catalog";
import CamperDetails from "./pages/CamperDetails/CamperDetails";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:id" element={<CamperDetails />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
