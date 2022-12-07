import { Route, Routes } from "react-router-dom";
import CustomDropdown from "./components/atoms/CustomDropdown/CustomDropdown";
import FacilityDetailsPage from "./components/pages/FacilityDetailsPage/FacilityDetailsPage";
import RaportsPage from "./components/pages/RaportsPage/RaportsPage";
import TestPage from "./components/pages/TestPage/TestPage";

function App() {
  return (
    <Routes>
      <Route
        path="/results/:service/:serviceId/:queue/:queueId/:province/:provinceId/:city/:cityId"
        element={<TestPage />}
      />
      <Route path="/test" element={<CustomDropdown />} />
      <Route path="/raports" element={<RaportsPage />} />
      <Route path="/details/:facilityId" element={<FacilityDetailsPage />} />
    </Routes>
  );
}

export default App;
