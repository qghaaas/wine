import { Route, Routes } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import Homelink from "./Route/Homelink";
import WinePagelink from "./Route/WinePagelink";
import WhiskeyPagelink from "./Route/WhiskeyPagelink";
import ProductPagelink from "./Route/ProductPagelink";
import Bloglink from './Route/Bloglink';
import BlogPostlink from "./Route/BlogPostlink";
import BasketPagelink from "./BasketPage/BasketPage";

export default function MainRouter() {
    return (
        <>
            <HashRouter>
                <Routes>

                    <Route path="/" index element={<Homelink />} />
                    <Route path="/Home" element={<Homelink />} />
                    <Route path="/Wine" element={<WinePagelink />} />
                    <Route path="/Whiskey" element={<WhiskeyPagelink />} />
                    <Route path="/Product-Wine" element={<ProductPagelink />} />
                    <Route path="/Blog" element={<Bloglink />} />
                    <Route path="/BlogPost/:card_id" element={<BlogPostlink />} />
                    <Route path="/Basket" element={<BasketPagelink />} />

                </Routes>
            </HashRouter>
        </>
    )
}