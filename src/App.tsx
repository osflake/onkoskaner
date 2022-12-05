import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import CustomDropdown from "./components/atoms/CustomDropdown/CustomDropdown";
import TestPage from "./components/pages/TestPage/TestPage";

function App() {
  return (
    <Container className="my-4">
      <Routes>
        <Route path="/results/:examId/:city" element={<TestPage />} />
        <Route path="/test" element={<CustomDropdown />} />
      </Routes>
    </Container>
  );
}

export default App;
