import Header from '../Home/Header/Header'
import Productinfo from '../ProductPage/Productinfo/Productinfo'
import Newsletter from '../Home/Newsletter/Newsletter'
import Footer from '../Home/Footer/Footer'
import ProductOffers from '../ProductPage/ProductOffers/ProductOffers'
import SpecOffers from '../ProductPage/SpecOffers/SpecOffers'


export default function ProductPagelink() {
    return (
        <>
            <Header />
            <Productinfo />
            <ProductOffers />
            <SpecOffers />
            <Newsletter />
            <Footer />
        </>
    )
}