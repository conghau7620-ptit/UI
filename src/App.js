import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/login";
import List from "./pages/list";
import Single from "./pages/single";
import New from "./pages/new";
import NewUser from "./pages/new/NewUser";
import AuthorizeRoute from "./authorizeRoute";
import { DarkModeContext } from "./context/darkModeContext";

import { productInputs } from "./formSource";
import "./style/dark.scss";
import Product from "./pages/products";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    const { darkMode } = useContext(DarkModeContext);

    return (
        <div className={darkMode ? "app dark" : "app"}>
            <BrowserRouter>
                <ToastContainer />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/">
                        <Route
                            index
                            element={
                                <AuthorizeRoute>
                                    <Home />
                                </AuthorizeRoute>
                            }
                        />
                        <Route path="users">
                            <Route
                                index
                                element={
                                    <AuthorizeRoute>
                                        <List />
                                    </AuthorizeRoute>
                                }
                            />
                            <Route
                                path=":userId"
                                element={
                                    <AuthorizeRoute>
                                        <Single />
                                    </AuthorizeRoute>
                                }
                            />
                            <Route
                                path="new"
                                element={
                                    <AuthorizeRoute>
                                        <NewUser />
                                    </AuthorizeRoute>
                                }
                            />
                        </Route>
                        <Route path="products">
                            <Route
                                index
                                element={
                                    <AuthorizeRoute>
                                        <Product />
                                    </AuthorizeRoute>
                                }
                            />
                            <Route
                                path=":productId"
                                element={
                                    <AuthorizeRoute>
                                        <Single />
                                    </AuthorizeRoute>
                                }
                            />
                            <Route
                                path="new"
                                element={
                                    <AuthorizeRoute>
                                        <New
                                            inputs={productInputs}
                                            title="Add New Product"
                                        />
                                    </AuthorizeRoute>
                                }
                            />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
