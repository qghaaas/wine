import '../../main.css'
import './Assortment.css'
import React, { useState } from 'react';
import arrowShow from './img/arrowShow.svg'
import sortproductArr from './img/sortproductArr.svg'
import ellipse from './img/ellipse.svg'
import product from './img/product.png'
import flag from './img/flag.svg'


export default function Assortment() {
    return (
        <>
            <section className="assortment">
                <div className="container">
                    <div className="assortment-inner">
                        <aside className='leftbar-assortment'>
                            {/* <h2 className='title-aside'>Red Wine</h2> */}
                            <form action="" className="assortment-form">
                                <div className='assortment-form-title'>
                                    <legend>Цвет</legend>
                                    <button>-</button>
                                </div>

                                <div className='assortment-form-input_item'>
                                    <input type="checkbox" id='white' />
                                    <label htmlFor="white">
                                        <div className="checkbox-box"></div>
                                        Белое
                                    </label>
                                    <span>33</span>
                                </div>
                                <div className='assortment-form-input_item'>
                                    <input type="checkbox" id="red" />
                                    <label htmlFor="red">
                                        <div className="checkbox-box"></div>
                                        Красное
                                    </label>
                                    <span>3</span>
                                </div>
                                <div className='assortment-form-input_item'>
                                    <input type="checkbox" id="pink" />
                                    <label htmlFor="pink">
                                        Розовое
                                        <div className="checkbox-box"></div>
                                    </label>
                                    <span>3</span>
                                </div>
                                <div className='assortment-form-input_item'>
                                    <input type="checkbox" id="other" />
                                    <label htmlFor="other">
                                        Прочее
                                        <div className="checkbox-box"></div>
                                    </label>
                                    <span>3</span>
                                </div>
                            </form>

                            <form action="" className="assortment-form">
                                <div className='assortment-form-title'>
                                    <legend>Сладость</legend>
                                    <button></button>
                                </div>

                                <div className='assortment-form-input_item' >
                                    <input type="checkbox" id='Brut' />
                                    <label htmlFor="Brut">
                                        <div className="checkbox-box"></div>
                                        Брют
                                    </label>
                                    <span>3</span>
                                </div>
                                <div className='assortment-form-input_item' >
                                    <input type="checkbox" id='Dessert' />
                                    <label htmlFor="Dessert">
                                        <div className="checkbox-box"></div>
                                        Десертное
                                    </label>
                                    <span>3</span>
                                </div>
                                <div className='assortment-form-input_item' >
                                    <input type="checkbox" id='Mounted' />
                                    <label htmlFor="Mounted">
                                        <div className="checkbox-box"></div>
                                        Крепленное
                                    </label>
                                    <span>3</span>
                                </div>
                                <div className='assortment-form-input_item' >
                                    <input type="checkbox" id='Non-Dosage' />
                                    <label htmlFor="Non-Dosage">
                                        <div className="checkbox-box"></div>
                                        Нон-Дозаж
                                    </label>
                                    <span>3</span>
                                </div>
                                <div className='assortment-form-input_item' >
                                    <input type="checkbox" id='Semi-sweet' />
                                    <label htmlFor="Semi-sweet">
                                        <div className="checkbox-box"></div>
                                        Полусладкое
                                    </label>
                                    <span>3</span>
                                </div>
                                <div className='assortment-form-input_item' >
                                    <input type="checkbox" id='Semi-dry' />
                                    <label htmlFor="Semi-dry">
                                        <div className="checkbox-box"></div>
                                        Полусухое
                                    </label>
                                    <span>3</span>
                                </div>
                                <div className='assortment-form-input_item' >
                                    <input type="checkbox" id='Dry' />
                                    <label htmlFor="Dry">
                                        <div className="checkbox-box"></div>
                                        Сухое
                                    </label>
                                    <span>3</span>
                                </div>
                            </form>

                            <form action="" className="assortment-form">
                                <div className='assortment-form-title'>
                                    <legend>Цена</legend>
                                    <button></button>
                                </div>
                                <div className='assortment-sort-price'>
                                    <div>
                                        <input type="number"
                                            placeholder='от'

                                        />
                                        <input type="number"
                                            placeholder='до'
                                        />
                                    </div>
                                    <button><span>ОК</span></button>
                                </div>
                            </form>

                            <form action="" className="assortment-form">
                                <div className='assortment-form-title'>
                                    <legend>Страна</legend>
                                    <button></button>
                                </div>
                            </form>

                            <form action="" className="assortment-form">
                                <div className='assortment-form-title'>
                                    <legend>Регион</legend>
                                    <button>-</button>
                                </div>
                            </form>

                            <form action="" className="assortment-form">
                                <div className='assortment-form-title'>
                                    <legend>Классификация</legend>
                                    <button>+</button>
                                </div>
                            </form>

                            <form action="" className="assortment-form">
                                <div className='assortment-form-title'>
                                    <legend>Сорт Винограда</legend>
                                    <button></button>
                                </div>
                            </form>
                        </aside>



                        <div className='product-inner'>
                            <nav className='sort-product-nav'>
                                <ul className='sort-product-item'>
                                    <li><p>Бестселлеры</p> <img src={arrowShow} alt="" /></li>
                                    <li className='sort-product-item-center'>
                                        <div>
                                            <p>Цена</p>
                                            <div className='sort-product-item-img'><img src={sortproductArr} alt="" /> <img className='sort-product-item-img-sort' src={sortproductArr} alt="" /></div>
                                            <img src={arrowShow} alt="" />
                                        </div>
                                        <div>
                                            <p>Производитель A-Z</p>
                                            <img src={arrowShow} alt="" />
                                        </div>
                                        <div>
                                            <p>Винтаж</p>
                                            <div className='sort-product-item-img'><img src={sortproductArr} alt="" /> <img className='sort-product-item-img-sort' src={sortproductArr} alt="" /></div>
                                            <img src={arrowShow} alt="" />
                                        </div>
                                    </li>
                                    <li>
                                        <p>Новинки</p>
                                        <img src={ellipse} alt="" />
                                        <p>Популярный</p>
                                    </li>
                                </ul>
                            </nav>



                            <div className='product-card-container'>
                                <div className='product-card'>
                                    <div className="product-card-top">
                                        <img src={product} alt="" />
                                    </div>
                                    <div className="product-card-bot">
                                        <h3>L’ERMITE
                                            HERMITAGE</h3>
                                        <div className='product-card-bot-info'>
                                            <span>2009/0.75 л</span>
                                            <div className='product-card-bot-country'>
                                                <img src={flag} alt="" />
                                                <p>франция/M.CHAPOUTIER </p>
                                            </div>

                                            <div className='product-card-bot-bot'>
                                                <div>
                                                    <span>ЦЕНА ЗА 1 ШТ</span>
                                                    <p>90 000 р</p>
                                                </div>
                                                <button>В КОРЗИНУ</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>                     
                            </div>
                            <button className='see-all'><p>СМОТРЕТЬ ВСЕ</p> <div></div></button>  
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}