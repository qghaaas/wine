import { Route, Routes } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import Homelink from "./Route/Homelink";
import WinePagelink from "./Route/WinePagelink";
import WhiskeyPagelink from "./Route/WhiskeyPagelink";
import ProductPagelink from "./Route/ProductPagelink";
import Bloglink from './Route/Bloglink';
import BlogPostlink from "./Route/BlogPostlink";
import BasketPagelink from "./Route/BasketPagelink";
import Login from "./User/LoginRegister/Login";
import Register from "./User/LoginRegister/Register";
import Error404link from "./Route/Error404link";
import ScrollToTop from "./ScrollToTop";
import AccountSelect from "./User/Account/AccountSelect";


export default function MainRouter() {
    return (
        <>
            <HashRouter>
                <ScrollToTop />
                <Routes>
                    <Route path="/" index element={<Homelink />} />
                    <Route path="/Home" element={<Homelink />} />
                    <Route path="/Wine" element={<WinePagelink />} />
                    <Route path="/Whiskey" element={<WhiskeyPagelink />} />
                    <Route path="/Product-Wine/:id" element={<ProductPagelink />} />
                    <Route path="/Blog" element={<Bloglink />} />
                    <Route path="/BlogPost/:card_id" element={<BlogPostlink />} />
                    <Route path="/Basket" element={<BasketPagelink />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Register" element={<Register />} />
                    <Route path="/Error" element={<Error404link />} />
                    <Route path="/AccountSelect" element={<AccountSelect />} />

                </Routes>
            </HashRouter>
        </>
    )
}