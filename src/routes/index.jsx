import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import LoginPage from "../pages/auth/LoginPage";

const router = createBrowserRouter([
    {
        path: "*",
        element: <div>Routes Not Found!</div>,
    },
    {
        children: [
            {
                path: "/",
                element: <LoginPage />,
            },
            // {
            //     path: "/register",
            //     element: <RegisterPage />,
            // },
        ],
    },
    {
        path: "/user",
        element: (
            <ProtectedRoutes>
                <UserLayout />
            </ProtectedRoutes>
        ),
        children: [
            {
                path: "/user",
                element: <DashboardPage />,
            },
            {
                path: "/user/content",
                element: <ContentPage />,
            },
            {
                path: "/user/komentar",
                element: <KomentarPage />,
            }
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
                theme="dark"
            />
            <RouterProvider router={router} />
        </>
    );
};

export default AppRouter;