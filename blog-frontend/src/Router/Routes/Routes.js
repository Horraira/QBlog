import { createBrowserRouter } from "react-router-dom";
import SignUp from "../../Pages/signup/SignUp";
import Home from "../../Pages/home/Home";
import Login from "../../Pages/login/Login";
import Main from "../../layouts/Main";
import { Navigate } from "react-router-dom";
import SingleUserBlog from "../../Pages/home/SingleUserBlog";

const AccessControl = ({ element }) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
        return element;
    } else {
        return <Navigate to="/unauthorized" />;
    }
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <AccessControl element={<Home />} />
            },
            {
                path: "/blog/:id",
                element: <AccessControl element={<SingleUserBlog />} />
            },
            {
                path: "/unauthorized",
                element: <div className="bg-base-200 p-5">
                    <h1 className="text-2xl text-center">Unauthorized!!</h1>
                    <p className="text-center">You are not authorized to view this page</p>
                    <button className="btn btn-primary block mx-auto mt-5" onClick={() => window.location.href = "/login"}>Login</button>
                </div>
            }
        ]
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/signup",
        element: <SignUp />
    },
]);

export default router;