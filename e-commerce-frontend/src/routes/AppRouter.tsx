import Home from "@pages/Home";
import Categories from "@pages/Categories";
import Products from "@pages/Products";
import AboutUs from "@pages/AboutUs";
import MianLayout from "@layouts/MianLayout/MianLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "@pages/Login";
import Register from "@pages/Register";
import Error from "@pages/Error";
import Cart from "@pages/Cart";
import Wishlist from "@pages/Wishlist";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MianLayout />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "categories/products/:prefix",
                element: <Products />,
                loader: ({ params }) => {
                    if (
                        typeof params.prefix !== "string" ||
                        !/^[a-z]+$/i.test(params.prefix)
                    ) {
                        throw new Response("Bad Request", {
                            statusText: "Category not found",
                            status: 400,
                        });
                    } return true;
                }

            },
            {
                path: "categories",
                element: <Categories />
            },
            {
                path: "about-us",
                element: <AboutUs />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "cart",
                element: <Cart />
            },
            {
                path: "wishlist",
                element: <Wishlist />
            },
        ]
    },
])

const AppRouter = () => {
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}
export default AppRouter
