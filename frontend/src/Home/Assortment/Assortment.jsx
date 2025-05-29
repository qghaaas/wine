import '../../main.css'
import './Assortment.css'
import React, { useState, useEffect } from 'react';
import arrowShow from './img/arrowShow.svg'
import sortproductArr from './img/sortproductArr.svg'
import ellipse from './img/ellipse.svg'
import { Link, useNavigate } from 'react-router-dom';



export default function Assortment() {
    const [wines, setWines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openForms, setOpenForms] = useState({
        color: true,
        sweetness: true,
        price: true,
        country: false,
        region: false,
        classification: false,
        grape: false,
    });
    const navigate = useNavigate();
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const toggleFilter = () => {
        setIsFilterOpen((prev) => !prev);
    };

    useEffect(() => {
        const fetchWines = async () => {
            try {
                const response = await fetch('http://localhost:3010/api/wines');
                const data = await response.json();
                setWines(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching wines:', error);
                setLoading(false);
            }
        };

        fetchWines();
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
                    product_type: 'wine'
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
                    <div className="assortment-inner">
                        <button className="filter-toggle-btn" onClick={toggleFilter}>
                            Фильтры
                        </button>
                        <aside className={`leftbar-assortment ${isFilterOpen ? "open" : ""}`}>

                            <form action="" className={`assortment-form ${openForms.color ? 'open' : ''}`}>
                                <div className='assortment-form-title'>
                                    <legend>Цвет</legend>
                                    <button onClick={(e) => {
                                        e.preventDefault();
                                        toggleForm('color');
                                    }}>
                                        {openForms.color ? '-' : '+'}
                                    </button>
                                </div>

                                {openForms.color && (
                                    <>
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
                                    </>
                                )}
                            </form>


                            <form action="" className={`assortment-form ${openForms.sweetness ? 'open' : ''}`}>
                                <div className='assortment-form-title'>
                                    <legend>Сладость</legend>
                                    <button onClick={(e) => {
                                        e.preventDefault();
                                        toggleForm('sweetness');
                                    }}>
                                        {openForms.sweetness ? '-' : '+'}
                                    </button>
                                </div>

                                {openForms.sweetness && (
                                    <>
                                        <div className='assortment-form-input_item'>
                                            <input type="checkbox" id='Brut' />
                                            <label htmlFor="Brut">
                                                <div className="checkbox-box"></div>
                                                Брют
                                            </label>
                                            <span>3</span>
                                        </div>
                                        <div className='assortment-form-input_item'>
                                            <input type="checkbox" id='Dessert' />
                                            <label htmlFor="Dessert">
                                                <div className="checkbox-box"></div>
                                                Десертное
                                            </label>
                                            <span>3</span>
                                        </div>
                                        <div className='assortment-form-input_item'>
                                            <input type="checkbox" id='Mounted' />
                                            <label htmlFor="Mounted">
                                                <div className="checkbox-box"></div>
                                                Крепленное
                                            </label>
                                            <span>3</span>
                                        </div>
                                        <div className='assortment-form-input_item'>
                                            <input type="checkbox" id='Non-Dosage' />
                                            <label htmlFor="Non-Dosage">
                                                <div className="checkbox-box"></div>
                                                Нон-Дозаж
                                            </label>
                                            <span>3</span>
                                        </div>
                                        <div className='assortment-form-input_item'>
                                            <input type="checkbox" id='Semi-sweet' />
                                            <label htmlFor="Semi-sweet">
                                                <div className="checkbox-box"></div>
                                                Полусладкое
                                            </label>
                                            <span>3</span>
                                        </div>
                                        <div className='assortment-form-input_item'>
                                            <input type="checkbox" id='Semi-dry' />
                                            <label htmlFor="Semi-dry">
                                                <div className="checkbox-box"></div>
                                                Полусухое
                                            </label>
                                            <span>3</span>
                                        </div>
                                        <div className='assortment-form-input_item'>
                                            <input type="checkbox" id='Dry' />
                                            <label htmlFor="Dry">
                                                <div className="checkbox-box"></div>
                                                Сухое
                                            </label>
                                            <span>3</span>
                                        </div>
                                    </>
                                )}
                            </form>


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
                                {wines.map((wine) => {
                                    const [year, volume] = wine.wine_year_volume.split('/');
                                    const [country, manufacturer] = wine.country_manufacturer.split('/');

                                    return (
                                        <div className='product-card' key={wine.id}>
                                            <Link to={`/Product-Wine/${wine.id}`}>
                                                <div className='product-card-top'>
                                                    <img src={wine.wine_image_path || product} alt={wine.wine_name} />
                                                </div>
                                            </Link>
                                            <div className='product-card-bot'>
                                                <h3>{wine.wine_name}</h3>
                                                <div className='product-card-bot-info'>
                                                    <span>{year}/{volume} л</span>
                                                    <div className='product-card-bot-country'>
                                                        <img src={wine.flag_image_path || flag} alt={country} />
                                                        <p>{country}/{manufacturer}</p>
                                                    </div>
                                                    <div className='product-card-bot-bot'>
                                                        <div>
                                                            <span>ЦЕНА ЗА 1 ШТ</span>
                                                            <p>{new Intl.NumberFormat('ru-RU').format(wine.price)} р</p>
                                                        </div>
                                                        <button onClick={() => handleAddToBasket(wine.id)}>В КОРЗИНУ</button>
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