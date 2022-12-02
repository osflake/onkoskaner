import { createBrowserRouter } from "react-router-dom";
import CustomDropdown from "./components/atoms/CustomDropdown";
import TestPage from "./components/pages/TestPage/TestPage";

const router = createBrowserRouter([
  {
    path: "/results/:examId/:city",
    element: <TestPage />,
  },
  {
    path: "/test",
    element: <CustomDropdown />,
  },
]);

export default router;
