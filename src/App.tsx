import { createBrowserRouter } from "react-router-dom";
import CustomDropdown from "./components/CustomDropdown";
import TestView from "./views/TestView/TestView";

const router = createBrowserRouter([
  {
    path: "/results/:examId/:city",
    element: <TestView />,
  },
  {
    path: "/test",
    element: <CustomDropdown />,
  },
]);

export default router;
