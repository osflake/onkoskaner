import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/js/bootstrap";
import CustomDropdown from "./components/atoms/CustomDropdown/CustomDropdown";
import RaportsPage from "./components/pages/RaportsPage/RaportsPage";
import TestPage from "./components/pages/TestPage/TestPage";

function App() {
  return (
    <Routes>
      <Route path="/results/:examId/:city" element={<TestPage />} />
      <Route path="/test" element={<CustomDropdown />} />
      <Route path="/raports" element={<RaportsPage />} />
    </Routes>
  );
}

export default App;
