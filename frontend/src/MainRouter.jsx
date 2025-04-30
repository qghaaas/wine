import { Route, Routes } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import Homelink from "./Route/Homelink/Homelink";



export default function MainRouter() {
    return (
        <>
            <HashRouter>
                <Routes>

                    <Route path="/" index element={<Homelink />}/>
                    <Route path="/Home" element={<Homelink />}/>
                    
                </Routes>
            </HashRouter>
        </>
    )
}