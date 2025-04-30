import Header from "../Home/Header/Header";
import Swiperoffers from "../Home/Swiperoffers/Swiperoffers";
import Offersbot from "../Home/Offersbot/Offersbot";
import AssortmentWinePage from "../WinePage/AssortmentWinePage";
import Сonsultation from "../Home/Сonsultation/Сonsultation";
import Newsletter from "../Home/Newsletter/Newsletter";
import Footer from "../Home/Footer/Footer";




export default function WinePagelink(){
    return(
        <>
        <Header/>
        <Swiperoffers/>
        <Offersbot/>
        <AssortmentWinePage/>
        <Сonsultation/>
        <Newsletter/>
        <Footer/>
        </>
    )
}