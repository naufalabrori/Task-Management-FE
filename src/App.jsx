/* eslint-disable no-unused-vars */
import "./index.css";
import { router } from "./routers";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;