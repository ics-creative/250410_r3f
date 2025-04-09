import "./App.css";
import { Route, HashRouter as Router, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage.tsx";
import PointerPage from "./pages/PointerPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import InteractionPage from "./pages/InteractionPage.tsx";
import ModelPage from "./pages/ModelPage.tsx";
import MinimumConfigPage from "./pages/MinimumConfigPage.tsx";
import DreiSamplePage from "./pages/DreiSamplePage.tsx";

const App = () => {
  const baseName = import.meta.env.MODE === "development" ? "/" : "/250410_r3f";

  return (
    <Router basename={baseName}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/minimum" element={<MinimumConfigPage />} />
        <Route path="/model" element={<ModelPage />} />
        <Route path="/pointer" element={<PointerPage />} />
        <Route path="/interaction" element={<InteractionPage />} />
        <Route path="/dreisample" element={<DreiSamplePage />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </Router>
  );
};

export default App;
