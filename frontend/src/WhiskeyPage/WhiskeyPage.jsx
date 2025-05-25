import '../main.css'
import React, { useState, useEffect } from 'react';
import arrowShow from '../Home/Assortment/img/arrowShow.svg'
import sortproductArr from '../Home/Assortment/img/sortproductArr.svg'
import ellipse from '../Home/Assortment/img/ellipse.svg'
import './WhiskeyPage.css'
import { Link, useNavigate } from 'react-router-dom';


export default function WhiskeyPage() {
    const [whiskey, setwhiskey] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openForms, setOpenForms] = useState({
        color: true,
        price: true,
        country: false,
        region: false,
        classification: false,
        grape: false,
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchwhiskey = async () => {
            try {
                const response = await fetch('http://localhost:3010/api/whiskey');
                const data = await response.json();
                setwhiskey(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching wines:', error);
                setLoading(false);
            }
        };

        fetchwhiskey();
    }, []);

    const toggleForm = (formName) => {
        setOpenForms(prev => ({
            ...prev,
            [formName]: !prev[formName]
        }));
    };

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);


    const handleAddToBasket = async (product_id) => {
        if (!isAuthenticated) {
            navigate('/AccountSelect');
            return;
        }

        try {
            const response = await fetch('http://localhost:3010/api/basket', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    product_id,
                    product_type: 'whiskey'
                })
            });

            if (response.ok) {
                alert('Товар добавлен в корзину');
            } else {
                const err = await response.json();
                alert('Ошибка: ' + (err.error || 'Не удалось добавить в корзину'));
            }
        } catch (error) {
            console.error('Ошибка добавления в корзину:', error);
            alert('Сетевая ошибка при добавлении в корзину');
        }
    };

    if (loading) return <div>Loading...</div>;
    return (
        <>
            <section className="assortment">
                <div className="container">
                    <div className="assortment-inner Wine-assortment-inner">
                        <aside className='leftbar-assortment'>
                            <h2 className='aside-title'>Whiskey</h2>

                        
                            <form action="" className={`assortment-form ${openForms.price ? 'open' : ''}`}>
                                <div className='assortment-form-title'>
                                    <legend>Цена</legend>
                                    <button onClick={(e) => {
                                        e.preventDefault();
                                        toggleForm('price');
                                    }}>
                                        {openForms.price ? '-' : '+'}
                                    </button>
                                </div>

                                {openForms.price && (
                                    <div className='assortment-sort-price'>
                                        <div>
                                            <input type="number" placeholder='от' />
                                            <input type="number" placeholder='до' />
                                        </div>
                                        <button><span>ОК</span></button>
                                    </div>
                                )}
                            </form>

                         
                            <form action="" className={`assortment-form ${openForms.country ? 'open' : ''}`}>
                                <div className='assortment-form-title'>
                                    <legend>Страна</legend>
                                    <button onClick={(e) => {
                                        e.preventDefault();
                                        toggleForm('country');
                                    }}>
                                        {openForms.country ? '-' : '+'}
                                    </button>
                                </div>
                                {openForms.country && (
                                    <div>
                                     
                                    </div>
                                )}
                            </form>

                          
                            <form action="" className={`assortment-form ${openForms.region ? 'open' : ''}`}>
                                <div className='assortment-form-title'>
                                    <legend>Регион</legend>
                                    <button onClick={(e) => {
                                        e.preventDefault();
                                        toggleForm('region');
                                    }}>
                                        {openForms.region ? '-' : '+'}
                                    </button>
                                </div>
                                {openForms.region && (
                                    <div>
                                       
                                    </div>
                                )}
                            </form>

                        
                            <form action="" className={`assortment-form ${openForms.classification ? 'open' : ''}`}>
                                <div className='assortment-form-title'>
                                    <legend>Классификация</legend>
                                    <button onClick={(e) => {
                                        e.preventDefault();
                                        toggleForm('classification');
                                    }}>
                                        {openForms.classification ? '-' : '+'}
                                    </button>
                                </div>
                                {openForms.classification && (
                                    <div>
                                      
                                    </div>
                                )}
                            </form>

                            <form action="" className={`assortment-form ${openForms.grape ? 'open' : ''}`}>
                                <div className='assortment-form-title'>
                                    <legend>Сорт Винограда</legend>
                                    <button onClick={(e) => {
                                        e.preventDefault();
                                        toggleForm('grape');
                                    }}>
                                        {openForms.grape ? '-' : '+'}
                                    </button>
                                </div>
                                {openForms.grape && (
                                    <div>
                                     
                                    </div>
                                )}
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
                                {whiskey.map((whiskey) => {
                                    const [year, volume] = whiskey.whiskey_year_volume.split('/');
                                    const [country, manufacturer] = whiskey.country_manufacturer.split('/');

                                    return (
                                        <div className='product-card' key={whiskey.id}>
                                            <div className='product-card-top whiskey-product-card-top'>
                                                <img src={whiskey.whiskey_image_path || product} alt={whiskey.whiskey_name} />
                                            </div>
                                            <div className='product-card-bot'>
                                                <h3>{whiskey.whiskey_name}</h3>
                                                <div className='product-card-bot-info'>
                                                    <span>{year}/{volume} л</span>
                                                    <div className='product-card-bot-country'>
                                                        <img src={whiskey.flag_image_path || flag} alt={country} />
                                                        <p>{country}/{manufacturer}</p>
                                                    </div>
                                                    <div className='product-card-bot-bot'>
                                                        <div>
                                                            <span>ЦЕНА ЗА 1 ШТ</span>
                                                            <p>{new Intl.NumberFormat('ru-RU').format(whiskey.price)} р</p>
                                                        </div>
                                                         <button onClick={() => handleAddToBasket(whiskey.id)}>В КОРЗИНУ</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <button className='see-all'><p>СМОТРЕТЬ ВСЕ</p> <div></div></button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}