import '../main.css'
import './BasketPage.css'
import basketProduct from './img/basketProduct.png'
import deleteBTN from './img/deleteBTN.svg'
import flag from '../Home/Assortment/img/flag.svg'
import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function BasketPage() {
    const [basketItems, setBasketItems] = useState([]);

    useEffect(() => {
        const fetchBasket = async () => {
            try {
                const response = await fetch('http://localhost:3010/api/basket', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await response.json();
                if (Array.isArray(data)) {
                    setBasketItems(data);
                } else {
                    console.error('Некорректные данные:', data);
                }
            } catch (error) {
                console.error('Ошибка получения корзины:', error);
            }
        };

        fetchBasket();
    }, []);

    const handleDelete = async (productId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:3010/api/basket/${productId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setBasketItems(prev => prev.filter(item => item.id !== productId));
        } catch (err) {
            console.error('Ошибка удаления товара:', err);
        }
    };

    const handleQuantityChange = async (productId, delta) => {
        const product = basketItems.find(item => item.id === productId);
        if (!product) return;

        const newQuantity = product.quantity + delta;
        if (newQuantity < 1) return;

        try {
            const token = localStorage.getItem('token');
            await axios.patch(
                `http://localhost:3010/api/basket/${productId}`,
                { change: delta },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setBasketItems(prev =>
                prev.map(item =>
                    item.id === productId ? { ...item, quantity: newQuantity } : item
                )
            );
        } catch (err) {
            console.error('Ошибка изменения количества:', err);
        }
    };

    const deliveryPrice = 100;
    const discount = 0;
    const subtotal = Math.round(
        basketItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    );
    const final = subtotal - discount + deliveryPrice;

    return (
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
                        <Link className='see-all continue-shopping'><p>ПРОДОЛЖИТЬ ПОКУПКИ</p> <div></div></Link>
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

                            {basketItems.length === 0 ? (
                                <p className="empty-basket-message">Ваша корзина пуста</p>
                            ) : (
                                basketItems.map(item => (
                                    <div className="basket-product-card" key={item.id}>
                                        <div className="basket-product-card-main">
                                            <div className='basket-product-card-img'>
                                                <img
                                                    className='basket-product-deleteBTN'
                                                    src={deleteBTN}
                                                    alt="Удалить"
                                                    onClick={() => handleDelete(item.id)}
                                                />
                                                <img
                                                    className='basket-product-photo'
                                                    src={item.image_path || basketProduct}
                                                    alt={item.name}
                                                />
                                            </div>
                                            <div className="basket-product-card-description">
                                                <div className='basket-product-card-name'>
                                                    <h5>{item.name}</h5>
                                                    <div></div>
                                                </div>
                                                <p>{item.year_volume}</p>
                                                <div className='basket-product-card-flag'>
                                                    <img src={item.flag || flag} alt="флаг" />
                                                    <p>{item.country_manufacturer}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="basket-product-card-item">
                                            <p>{Math.round(item.price)}₽</p>
                                            <div className='basket-product-card-add-del'>
                                                <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                                            </div>
                                            <p className='basket-price-total'>{Math.round(item.price * item.quantity)}₽</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="basket-price">
                            <ul className='basket-price-item'>
                                <li><span>СУММА................... {subtotal}₽</span></li>
                                <li><span>СКИДКА.................. {discount}₽</span></li>
                                <li><span>ДОСТАВКА............... {deliveryPrice}₽</span></li>
                                <li><span>К ОПЛАТЕ................ {final}₽</span></li>
                            </ul>

                            <Link to="#">Оформить заказ</Link>

                            <ul className='basket-payment-met'>
                                <li><span>Способы оплаты:</span></li>
                                <li><span>- картой Visa и MasterCard</span></li>
                                <li><span>- наличными при получении </span></li>
                                <li><span>- юридическому лицу на р/с</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

