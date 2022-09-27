import "./styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Index } from "./pages";
import { TestCases } from "./pages/TestCases";
import { CoreShopping } from "./pages/CoreShopping";
import { HomeScreen } from "./pages/HomeScreen";
import { NestedLayoutGrids } from "./pages/NestedLayoutGrids";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/TestCases" element={<TestCases />} />
        <Route path="/CoreShopping" element={<CoreShopping />} />
        <Route path="/HomeScreen" element={<HomeScreen />} />
        <Route path="/NestedLayoutGrids" element={<NestedLayoutGrids />} />
      </Routes>
    </BrowserRouter>
  );
}
