import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ErrorPage from './views/error-page';
import { NotiProvider } from './context/notification';
import { findTask, findTasks } from './pages/tasks/loader';
import TaskList from './pages/tasks/list';
import TaskForm from './pages/tasks/form';
import Landing from './pages/landing';
import Stats from './pages/stats';
import { findStats } from './pages/stats/loader';
import Login from './pages/auth/login';
import App from './app';
import './app.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "tasks",
        element: <TaskList />,
        loader: findTasks,
      },
      {
        path: "addtask",
        element: <TaskForm />,
        loader: findTask,
      },
      {
        path: "edittask/:taskId",
        element: <TaskForm />,
        loader: findTask,
      },
      {
        path: "stats",
        element: <Stats />,
        loader: findStats,
      },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NotiProvider>
      <RouterProvider router={router} />
    </NotiProvider>
  </StrictMode>
);
