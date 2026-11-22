import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import DemoBanner from "./components/DemoBanner/DemoBanner";
import { IS_DEMO } from "./config";
import "./App.css";

function App() {
  return (
    <>
      {IS_DEMO && <DemoBanner />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
}

export default App;
