import { Route, Routes } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import Homelink from "./Route/Homelink";
import WinePagelink from "./Route/WinePagelink";
import WhiskeyPagelink from "./Route/WhiskeyPagelink";

export default function MainRouter() {
    return (
        <>
            <HashRouter>
                <Routes>

                    <Route path="/" index element={<Homelink />}/>
                    <Route path="/Home" element={<Homelink />}/>
                    <Route path="/Wine" element={<WinePagelink />}/>
                    <Route path="/Whiskey" element={<WhiskeyPagelink />}/>
                    
                </Routes>
            </HashRouter>
        </>
    )
}