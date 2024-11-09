import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const MianLayout = lazy(() => import("@layouts/MianLayout/MianLayout"));
const Home = lazy(() => import("@pages/Home"));
const Categories = lazy(() => import("@pages/Categories"));
const Products = lazy(() => import("@pages/Products"));
const AboutUs = lazy(() => import("@pages/AboutUs"));
const Login = lazy(() => import("@pages/Login"));
const Register = lazy(() => import("@pages/Register"));
const Cart = lazy(() => import("@pages/Cart"));
const Wishlist = lazy(() => import("@pages/Wishlist"));
const Profile = lazy(() => import("@pages/Profile"));
const ProfileLayout = lazy(() => import("@layouts/ProfileLayout"));
const Orders = lazy(() => import("@pages/Orders"));
import Error from "@pages/Error";
import ProtectedRoutes from "@utilities/ProtectedRoutes";
import PageSuspenseFallback from "@components/feedback/PageSuspense/Suspense";

const router = createBrowserRouter([
    {
        path: "/",
        element: 
        <PageSuspenseFallback>
            <MianLayout />
        </PageSuspenseFallback>,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: (
                    <PageSuspenseFallback>
                        <Home />
                    </PageSuspenseFallback>
                )
            },
            {
                path: "categories/products/:prefix",
                element: (
                    <PageSuspenseFallback>
                        <Products />
                    </PageSuspenseFallback>
                ),
                loader: ({ params }) => {
                    if (
                        typeof params.prefix !== "string" ||
                        !/^[a-z]+$/i.test(params.prefix)
                    ) {
                        throw new Response("Bad Request", {
                            statusText: "Category not found",
                            status: 400,
                        });
                    }
                    return true;
                }
            },
            {
                path: "categories",
                element: (
                    <PageSuspenseFallback>
                        <Categories />
                    </PageSuspenseFallback>
                )
            },
            {
                path: "about-us",
                element: (
                    <PageSuspenseFallback>
                        <AboutUs />
                    </PageSuspenseFallback>
                )
            },
            {
                path: "login",
                element: (
                    <PageSuspenseFallback>
                        <Login />
                    </PageSuspenseFallback>
                )
            },
            {
                path: "register",
                element: (
                    <PageSuspenseFallback>
                        <Register />
                    </PageSuspenseFallback>
                )
            },
            {
                path: "cart",
                element: (
                    <PageSuspenseFallback>
                        <Cart />
                    </PageSuspenseFallback>
                )
            },
            {
                path: "wishlist",
                element: (
                    <ProtectedRoutes>
                    <PageSuspenseFallback>
                        <Wishlist />
                    </PageSuspenseFallback>
                    </ProtectedRoutes>
                )
            },
            {
                path: "profile",
                element: (
                    <ProtectedRoutes>
                    <PageSuspenseFallback>
                        <ProfileLayout />
                    </PageSuspenseFallback>
                    </ProtectedRoutes>
                ),children:[
                    {
                        index:true,element:
                        <PageSuspenseFallback>
                        <Profile/>
                        </PageSuspenseFallback>
                    },
                    {
                        path:"orders",element:
                        <PageSuspenseFallback>
                        <Orders/>
                        </PageSuspenseFallback>
                    }
                ]
            }
            
        ]
    }
]);

const AppRouter = () => {
    return <RouterProvider router={router} />;
};

export default AppRouter;
