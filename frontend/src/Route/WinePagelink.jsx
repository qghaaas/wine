import Header from "../Home/Header/Header";
import Swiperoffers from "../Home/Swiperoffers/Swiperoffers";
import AssortmentWinePage from "../WinePage/AssortmentWinePage/AssortmentWinePage";
import ConsultationWinePage from "../WinePage/СonsultationWinePage/СonsultationWinePage";
import Newsletter from "../Home/Newsletter/Newsletter";
import Footer from "../Home/Footer/Footer";





export default function WinePagelink(){
    return(
        <>
        <Header/>
        <Swiperoffers/>
        <AssortmentWinePage/>
        <ConsultationWinePage/>
        <Newsletter/>
        <Footer/>
        </>
    )
}