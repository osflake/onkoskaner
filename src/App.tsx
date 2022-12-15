import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/js/bootstrap";
import CustomDropdown from "./components/atoms/CustomDropdown/CustomDropdown";
import FacilityDetailsPage from "./components/pages/FacilityDetailsPage/FacilityDetailsPage";
import StatsPage from "./components/pages/StatsPage/StatsPage";
import TestPage from "./components/pages/TestPage/TestPage";

function App() {
  return (
    <Routes>
      <Route path="results" element={<TestPage />} />
      <Route path="test" element={<CustomDropdown />} />
      <Route path="stats" element={<StatsPage />} />
      <Route path="details/:facilityId" element={<FacilityDetailsPage />} />
      <Route path="*" element={<p>There's nothing here: 404! TEST</p>} />
    </Routes>
  );
}

export default App;
