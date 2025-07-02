import '../../main.css'
import './Assortment.css'
import React, { useState, useEffect } from 'react';
import arrowShow from './img/arrowShow.svg'
import sortproductArr from './img/sortproductArr.svg'
import ellipse from './img/ellipse.svg'
import { Link, useNavigate } from 'react-router-dom';



export default function Assortment() {
    const [wines, setWines] = useState([]);
    const [filteredWines, setFilteredWines] = useState([]);
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
    const [filters, setFilters] = useState({
        color: [],
        sweetness: [],
        price: { min: null, max: null },
        country: [],
        region: [],
        classification: [],
        grape: [],
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
                setFilteredWines(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching wines:', error);
                setLoading(false);
            }
        };

        fetchWines();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [filters, wines]);

    const applyFilters = () => {
        let result = [...wines];

        if (filters.color.length > 0) {
            result = result.filter(wine => filters.color.includes(wine.color));
        }

        if (filters.sweetness.length > 0) {
            result = result.filter(wine => filters.sweetness.includes(wine.sweetness));
        }

        if (filters.price.min !== null) {
            result = result.filter(wine => wine.price >= filters.price.min);
        }
        if (filters.price.max !== null) {
            result = result.filter(wine => wine.price <= filters.price.max);
        }

        setFilteredWines(result);
    };

    const toggleForm = (formName) => {
        setOpenForms(prev => ({
            ...prev,
            [formName]: !prev[formName]
        }));
    };

    const handleFilterChange = (category, value) => {
        setFilters(prev => {
            const newFilters = { ...prev };
            if (newFilters[category].includes(value)) {
                newFilters[category] = newFilters[category].filter(item => item !== value);
            } else {
                newFilters[category] = [...newFilters[category], value];
            }
            return newFilters;
        });
    };

    const handlePriceFilter = (min, max) => {
        setFilters(prev => ({
            ...prev,
            price: {
                min: min ? Number(min) : null,
                max: max ? Number(max) : null
            }
        }));
    };

    const countByCategory = (category) => {
        return wines.reduce((acc, wine) => {
            const value = wine[category];
            acc[value] = (acc[value] || 0) + 1;
            return acc;
        }, {});
    };

    const colorCounts = countByCategory('color');
    const sweetnessCounts = countByCategory('sweetness');

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
                                            <input
                                                type="checkbox"
                                                id='white'
                                                checked={filters.color.includes('Белое')}
                                                onChange={() => handleFilterChange('color', 'Белое')}
                                            />
                                            <label htmlFor="white">
                                                <div className="checkbox-box"></div>
                                                Белое
                                            </label>
                                            <span>{colorCounts['Белое'] || 0}</span>
                                        </div>
                                        <div className='assortment-form-input_item'>
                                            <input
                                                type="checkbox"
                                                id="red"
                                                checked={filters.color.includes('Красное')}
                                                onChange={() => handleFilterChange('color', 'Красное')}
                                            />
                                            <label htmlFor="red">
                                                <div className="checkbox-box"></div>
                                                Красное
                                            </label>
                                            <span>{colorCounts['Красное'] || 0}</span>
                                        </div>
                                        <div className='assortment-form-input_item'>
                                            <input
                                                type="checkbox"
                                                id="pink"
                                                checked={filters.color.includes('Розовое')}
                                                onChange={() => handleFilterChange('color', 'Розовое')}
                                            />
                                            <label htmlFor="pink">
                                                Розовое
                                                <div className="checkbox-box"></div>
                                            </label>
                                            <span>{colorCounts['Розовое'] || 0}</span>
                                        </div>
                                        <div className='assortment-form-input_item'>
                                            <input
                                                type="checkbox"
                                                id="other"
                                                checked={filters.color.includes('Прочее')}
                                                onChange={() => handleFilterChange('color', 'Прочее')}
                                            />
                                            <label htmlFor="other">
                                                Прочее
                                                <div className="checkbox-box"></div>
                                            </label>
                                            <span>{colorCounts['Прочее'] || 0}</span>
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
                                            <input
                                                type="checkbox"
                                                id='Brut'
                                                checked={filters.sweetness.includes('Брют')}
                                                onChange={() => handleFilterChange('sweetness', 'Брют')}
                                            />
                                            <label htmlFor="Brut">
                                                <div className="checkbox-box"></div>
                                                Брют
                                            </label>
                                            <span>{sweetnessCounts['Брют'] || 0}</span>
                                        </div>
                                        <div className='assortment-form-input_item'>
                                            <input
                                                type="checkbox"
                                                id='Dessert'
                                                checked={filters.sweetness.includes('Десертное')}
                                                onChange={() => handleFilterChange('sweetness', 'Десертное')}
                                            />
                                            <label htmlFor="Dessert">
                                                <div className="checkbox-box"></div>
                                                Десертное
                                            </label>
                                            <span>{sweetnessCounts['Десертное'] || 0}</span>
                                        </div>
                                        <div className='assortment-form-input_item'>
                                            <input
                                                type="checkbox"
                                                id='Mounted'
                                                checked={filters.sweetness.includes('Крепленное')}
                                                onChange={() => handleFilterChange('sweetness', 'Крепленное')}
                                            />
                                            <label htmlFor="Mounted">
                                                <div className="checkbox-box"></div>
                                                Крепленное
                                            </label>
                                            <span>{sweetnessCounts['Крепленное'] || 0}</span>
                                        </div>
                                        <div className='assortment-form-input_item'>
                                            <input
                                                type="checkbox"
                                                id='Non-Dosage'
                                                checked={filters.sweetness.includes('Нон-Дозаж')}
                                                onChange={() => handleFilterChange('sweetness', 'Нон-Дозаж')}
                                            />
                                            <label htmlFor="Non-Dosage">
                                                <div className="checkbox-box"></div>
                                                Нон-Дозаж
                                            </label>
                                            <span>{sweetnessCounts['Нон-Дозаж'] || 0}</span>
                                        </div>
                                        <div className='assortment-form-input_item'>
                                            <input
                                                type="checkbox"
                                                id='Semi-sweet'
                                                checked={filters.sweetness.includes('Полусладкое')}
                                                onChange={() => handleFilterChange('sweetness', 'Полусладкое')}
                                            />
                                            <label htmlFor="Semi-sweet">
                                                <div className="checkbox-box"></div>
                                                Полусладкое
                                            </label>
                                            <span>{sweetnessCounts['Полусладкое'] || 0}</span>
                                        </div>
                                        <div className='assortment-form-input_item'>
                                            <input
                                                type="checkbox"
                                                id='Semi-dry'
                                                checked={filters.sweetness.includes('Полусухое')}
                                                onChange={() => handleFilterChange('sweetness', 'Полусухое')}
                                            />
                                            <label htmlFor="Semi-dry">
                                                <div className="checkbox-box"></div>
                                                Полусухое
                                            </label>
                                            <span>{sweetnessCounts['Полусухое'] || 0}</span>
                                        </div>
                                        <div className='assortment-form-input_item'>
                                            <input
                                                type="checkbox"
                                                id='Dry'
                                                checked={filters.sweetness.includes('Сухое')}
                                                onChange={() => handleFilterChange('sweetness', 'Сухое')}
                                            />
                                            <label htmlFor="Dry">
                                                <div className="checkbox-box"></div>
                                                Сухое
                                            </label>
                                            <span>{sweetnessCounts['Сухое'] || 0}</span>
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
                                            <input
                                                type="number"
                                                placeholder='от'
                                                onChange={(e) => handlePriceFilter(e.target.value, filters.price.max)}
                                            />
                                            <input
                                                type="number"
                                                placeholder='до'
                                                onChange={(e) => handlePriceFilter(filters.price.min, e.target.value)}
                                            />
                                        </div>
                                        <button type="button" onClick={() => applyFilters()}><span>ОК</span></button>
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

                            {filteredWines.length > 0 ? (
                                <>
                                    <div className='product-card-container'>
                                        {filteredWines.map((wine) => {
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
                                </>
                            ) : (
                                <div className="no-products-container">
                                    <div className="no-products-message">
                                        <h3>Товаров по выбранным фильтрам не найдено</h3>
                                        <p>Попробуйте изменить параметры поиска или сбросить фильтры</p>
                                        <button 
                                            className="reset-filters-btn"
                                            onClick={() => setFilters({
                                                color: [],
                                                sweetness: [],
                                                price: { min: null, max: null },
                                                country: [],
                                                region: [],
                                                classification: [],
                                                grape: [],
                                            })}
                                        >
                                            Сбросить все фильтры
                                        </button>
                                    </div>
                                </div>
                            )}
                            
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}