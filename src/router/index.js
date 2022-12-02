import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import CustomDropdown from "../components/CustomDropdown"
import TestView from "../views/TestView/TestView"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/results/:examId/:city",
    element: <TestView />
  },
  {
    path: "/test",
    element: <CustomDropdown />
  }
])

export default router
