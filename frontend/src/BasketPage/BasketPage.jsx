import '../main.css'
import './BasketPage.css'
import basketProduct from './img/basketProduct.png'
import deleteBTN from './img/deleteBTN.svg'
import flag from '../Home/Assortment/img/flag.svg'


export default function BasketPage() {
    return (
        <>
            <section className="basketpage">
                <div className="container">
                    <div className="basketpage-inner">
                        <div className="basketpage-title">
                            <div className='basketpage-title-path'>
                                <p>МОЯ КОРЗИНА</p>
                                <div></div>
                                <span>ОФОРМЛЕНИЕ ЗАКАЗА</span>
                                <div></div>
                                <span>ЗАКАЗ ОФОРМЛЕН</span>
                            </div>
                            <button className='see-all'><p>ПРОДОЛЖИТЬ ПОКУПКИ</p> <div></div></button>
                        </div>

                        <div className="basket-container">
                            <div className="basket-product">
                                <div className="basket-product-title">
                                    <h4>ТОВАР</h4>
                                    <div className="basket-product-title-right">
                                        <h4>ЦЕНА</h4>
                                        <h4>КОЛИЧЕСТВО</h4>
                                        <h4>ВСЕГО</h4>
                                    </div>
                                </div>

                                <div className="basket-product-card">
                                    <div className="basket-product-card-main">
                                        <div className='basket-product-card-img'>
                                            <img className='basket-product-photo' src={basketProduct} alt="" />
                                            <img className='basket-product-deleteBTN' src={deleteBTN} alt="" />
                                        </div>
                                        <div className="basket-product-card-description">
                                            <div className='basket-product-card-name'>
                                                <h5>LE MEAL
                                                    HERMITAGE</h5>
                                                    <div></div>
                                            </div>
                                            <p>2010/0.75 л</p>
                                            <div className='basket-product-card-flag'>
                                                <img src={flag} alt="" />
                                                <p>франция/M.CHAPOUTIER</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="basket-product-card-item">
                                        <p>9 000</p>
                                        <div className='basket-product-card-add-del'>
                                            <button>-</button>
                                            <span>1</span>
                                            <button>+</button>
                                        </div>
                                        <p>9000</p>
                                    </div>
                                </div>
                            </div>

                            <div className="basket-price">

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}