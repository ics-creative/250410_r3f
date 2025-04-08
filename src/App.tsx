import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage.tsx";
import PointerPage from "./pages/PointerPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import InteractionPage from "./pages/InteractionPage.tsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/interaction" element={<InteractionPage />} />
        <Route path="/pointer" element={<PointerPage />} />
      </Routes>
    </Router>
  );
};

export default App;
