import '../main.css'
import './BasketPage.css'




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