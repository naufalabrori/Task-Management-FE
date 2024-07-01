import { createBrowserRouter } from "react-router-dom";
import Task from "../pages/Task/index";
import TaskDetail from "../pages/Task/_id";
import NewTaskHeader from "../pages/Task/new";
import UpdateTaskHeader from "../pages/Task/update";
import NewTaskDetail from "../pages/Task/detail/new";
import UpdateTaskDetail from "../pages/Task/detail/update";
import History from "../pages/Task/history";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Task />,
  },
  {
    path: "/detail/:id",
    element: <TaskDetail />,
  },
  {
    path: "/new",
    element: <NewTaskHeader />,
  },
  {
    path: "edit/:id",
    element: <UpdateTaskHeader />,
  },
  {
    path: "detail/:headerId/new",
    element: <NewTaskDetail />,
  },
  {
    path: "detail/:headerId/edit/:id",
    element: <UpdateTaskDetail />,
  },
  {
    path: "/history",
    element: <History />,
  },
]);
