import Header from '../Home/Header/Header'
import BasketPage from '../BasketPage/BasketPage'
import ProductOffers from '../ProductPage/ProductOffers/ProductOffers'
import SpecOffers from '../ProductPage/SpecOffers/SpecOffers'
import Newsletter from '../Home/Newsletter/Newsletter'
import Footer from '../Home/Footer/Footer'


export default function BasketPagelink() {
    return (
        <>
            <Header />
            <BasketPage />
            <ProductOffers />
            <SpecOffers/>
            <Newsletter/>
            <Footer/>
        </>
    )
}