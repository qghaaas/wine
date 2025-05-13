import '../../main.css'
import './Productinfo.css'
import productpagephoto from './img/productpagephoto.png'
import flag from '../../Home/Assortment/img/flag.svg'

export default function Productinfo() {
    return (
        <>
            <section className="productinfo">
                <div className="container">
                    <div className="productinfo-inner">
                        <div className="productinfo-photo">
                            <img src={productpagephoto} alt="" />
                        </div>

                        <div className="productinfo-info-content">
                            <div className="productinfo-info-content-top">
                                <div className="productinfo-info-content-top-item">
                                    <div className='productinfo-info-content-top-item-nameprice'>
                                        <h2>CHATEAU <br />
                                            HAUT-BRION</h2>
                                        <div className='productinfo-info-content-top-item-nameprice-price'>
                                            <span>цена за 1 шт</span>
                                            <p>90 000 Р</p>
                                        </div>
                                    </div>
                                    <div className='productinfo-info-content-top-flag'>
                                        <div>
                                            <p>2009/0.75 л</p>
                                            <img src={flag} alt="" />
                                            <span>франция/HAUT-BRION</span>
                                        </div>
                                        <div className='add-basket'>
                                            <span>1</span>
                                            <button>В КОРЗИНУ</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="productinfo-info-content-top-main">
                                    <ul className='productinfo-info-content-top-main-item'>
                                        <li>
                                            <span>ГЕОГРАФИЯ:</span>
                                            <p>Франция - Бордо - Пессак-Леоньян</p>
                                        </li>
                                        <li>
                                            <span>КРЕПОСТЬ:</span>
                                            <p>14,5%</p>
                                        </li>
                                        <li>
                                            <span>ИМПОРТЕР:</span>
                                            <p>SIMPLE WINE</p>
                                        </li>
                                        <li>
                                            <span>КЛАССИФИКАЦИЯ:</span>
                                            <p>1-er gcc</p>
                                        </li>
                                        <li>
                                            <span>САХАР:</span>
                                            <p>0,1 г/л</p>
                                        </li>
                                        <li>
                                            <span>РЕЙТИНГ:</span>
                                            <p>rp 95</p>
                                        </li>
                                        <li>
                                            <span>СОРТОВОЙ СОСТАВ:</span>
                                            <p>Каберне Фран Каберне Совин. Мерло Пти Вердо</p>
                                        </li>
                                        <li>
                                            <img src="" alt="" />
                                            <img src="" alt="" />
                                            <img src="" alt="" />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}