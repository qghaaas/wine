import Header from '../Home/Header/Header'
import Error404 from '../Error404/Error404'
import SpecOffers from '../ProductPage/SpecOffers/SpecOffers'
import Newsletter from '../Home/Newsletter/Newsletter'
import Footer from '../Home/Footer/Footer'

export default function Error404link() {
    return (
        <>
            <Header />
            <Error404 />
            <SpecOffers />
            <Newsletter />
            <Footer />
        </>
    )
}