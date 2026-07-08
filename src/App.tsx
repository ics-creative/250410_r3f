import { Route, HashRouter, Routes } from "react-router-dom";
import { PAGE_PATHS } from "./consts/pagePaths";
import { IndexPage } from "./pages/index/Page";
import { MinimumConfigPage } from "./pages/minimum/Page";
import { ModelPage } from "./pages/model/Page";
import { PointerPage } from "./pages/pointer/Page";
import { InteractionPage } from "./pages/interaction/Page";
import { DreiPage } from "./pages/drei/Page";
import { MainPage } from "./pages/main/Page";

export const App = () => (
  <HashRouter>
    <Routes>
      <Route path={PAGE_PATHS.index} element={<IndexPage />} />
      <Route path={PAGE_PATHS.minimum} element={<MinimumConfigPage />} />
      <Route path={PAGE_PATHS.model} element={<ModelPage />} />
      <Route path={PAGE_PATHS.pointer} element={<PointerPage />} />
      <Route path={PAGE_PATHS.interaction} element={<InteractionPage />} />
      <Route path={PAGE_PATHS.drei} element={<DreiPage />} />
      <Route path={PAGE_PATHS.main} element={<MainPage />} />
    </Routes>
  </HashRouter>
);
