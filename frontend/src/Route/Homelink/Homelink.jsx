import Header from "../../Home/Header/Header"
import Swiperoffers from "../../Home/Swiperoffers/Swiperoffers"
import Offersbot from "../../Home/Offersbot/Offersbot"
import Assortment from "../../Home/Assortment/Assortment"
import Сonsultation from "../../Home/Сonsultation/Сonsultation"
import Newsletter from "../../Home/Newsletter/Newsletter"


export default function Homelink() {
    return (
        <>
            <Header />
            <Swiperoffers />
            <Offersbot />
            <Assortment />
            <Сonsultation />
            <Newsletter/>
        </>
    )
}