import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import HomeBefore from "../components/Home/HomeBefore";
import HomeAfter from "../components/Home/HomeAfter";
import LoginForm from "../pages/auth/LoginPage";
import RegisterOrganisasiPage from "../pages/auth/RegisterOrganisasi";
import RegisterPembeliPage from "../pages/auth/RegisterPembeli";
import LoginPage from "../pages/auth/LoginPage";
import HomeOrganisasi from "../components/Home/HomeOrganisasi";
import HomeAdmin from "../components/Home/HomeAdmin";
import HomeOwner from "../components/Home/HomeOwner";

const router = createBrowserRouter([
  {
    path: "*",
    element: <div>Routes Not Found!</div>,
  },
  {
    children: [
      {
        path: "/",
        element: <HomeBefore />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/registerPembeli",
        element: <RegisterPembeliPage />,
      },
      {
        path: "/registerOrganisasi",
        element: <RegisterOrganisasiPage />,
      },
      {
        path: "/homeAfter",
        element: <HomeAfter />,
      },
      {
        path: "/homeOrganisasi",
        element: <HomeOrganisasi />,
      },
      {
        path: "/homeAdmin",
        element: <HomeAdmin />,
      },
      {
        path: "/homeOwner",
        element: <HomeOwner />,
      },
      // {
      //   path: "/homeCS",
      //   element: <HomeCS />,
      // },
      // {
      //   path: "/homeGudang",
      //   element: <HomeGudang />,
      // },
    ],
  },
]);

const AppRouter = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <RouterProvider router={router} />
    </>
  );
};

export default AppRouter;
