import '../main.css'
import React, { useState, useEffect } from 'react';
import arrowShow from '../Home/Assortment/img/arrowShow.svg'
import sortproductArr from '../Home/Assortment/img/sortproductArr.svg'
import ellipse from '../Home/Assortment/img/ellipse.svg'
import './WhiskeyPage.css'
import { Link, useNavigate } from 'react-router-dom';


export default function WhiskeyPage() {
    const [whiskey, setWhiskey] = useState([]);
    const [filteredWhiskey, setFilteredWhiskey] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openForms, setOpenForms] = useState({
        price: true,
        country: false,
        region: false,
        classification: false,
    });
    const [filters, setFilters] = useState({
        price: { min: null, max: null },
        country: [],
        region: [],
        classification: [],
    });
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchWhiskey = async () => {
            try {
                const response = await fetch('http://localhost:3010/api/whiskey');
                const data = await response.json();
                setWhiskey(data);
                setFilteredWhiskey(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching whiskey:', error);
                setLoading(false);
            }
        };

        fetchWhiskey();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [filters, whiskey]);

    const applyFilters = () => {
        let result = [...whiskey];

        if (filters.price.min !== null) {
            result = result.filter(item => item.price >= filters.price.min);
        }
        if (filters.price.max !== null) {
            result = result.filter(item => item.price <= filters.price.max);
        }

        if (filters.country.length > 0) {
            result = result.filter(item => {
                const [country] = item.country_manufacturer.split('/');
                return filters.country.includes(country);
            });
        }

        if (filters.region.length > 0) {
            result = result.filter(item => item.region && filters.region.includes(item.region));
        }

        if (filters.classification.length > 0) {
            result = result.filter(item => item.classification && filters.classification.includes(item.classification));
        }

        setFilteredWhiskey(result);
    };

    const toggleFilter = () => {
        setIsFilterOpen(prev => !prev);
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

    const countByCategory = (category, extractFn = null) => {
        return whiskey.reduce((acc, item) => {
            let value;
            if (extractFn) {
                value = extractFn(item);
            } else {
                value = item[category];
            }
            
            if (value) {
                acc[value] = (acc[value] || 0) + 1;
            }
            return acc;
        }, {});
    };

    const countryCounts = countByCategory('country_manufacturer', (item) => {
        const [country] = item.country_manufacturer.split('/');
        return country;
    });
    
    const regionCounts = countByCategory('region');
    const classificationCounts = countByCategory('classification');

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

    const countries = [...new Set(whiskey.map(item => {
        const [country] = item.country_manufacturer.split('/');
        return country;
    }))].filter(Boolean);

    const regions = [...new Set(whiskey.map(item => item.region))].filter(Boolean);
    const classifications = [...new Set(whiskey.map(item => item.classification))].filter(Boolean);

    return (
        <>
            <section className="assortment">
                <div className="container">
                    <div className="assortment-inner Wine-assortment-inner">
                        <button className="filter-toggle-btn" onClick={toggleFilter}>
                            Фильтры
                        </button>
                        <aside className={`leftbar-assortment ${isFilterOpen ? "open" : ""}`}>
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
                                        {countries.map(country => (
                                            <div className='assortment-form-input_item' key={country}>
                                                <input 
                                                    type="checkbox" 
                                                    id={`country-${country}`}
                                                    checked={filters.country.includes(country)}
                                                    onChange={() => handleFilterChange('country', country)}
                                                />
                                                <label htmlFor={`country-${country}`}>
                                                    <div className="checkbox-box"></div>
                                                    {country}
                                                </label>
                                                <span>{countryCounts[country] || 0}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </form>

                            <form action="" className={`assortment-form ${openForms.region ? 'open' : ''}`}>
                                <div className='assortment-form-title'>
                                    <legend>Регион </legend>
                                    <button onClick={(e) => {
                                        e.preventDefault();
                                        toggleForm('region');
                                    }}>
                                        {openForms.region ? '-' : '+'}
                                    </button>
                                </div>
                                {openForms.region && (
                                    <div>
                                        {regions.map(region => (
                                            <div className='assortment-form-input_item' key={region}>
                                                <input 
                                                    type="checkbox" 
                                                    id={`region-${region}`}
                                                    checked={filters.region.includes(region)}
                                                    onChange={() => handleFilterChange('region', region)}
                                                />
                                                <label htmlFor={`region-${region}`}>
                                                    <div className="checkbox-box"></div>
                                                    {region}
                                                </label>
                                                <span>{regionCounts[region] || 0}</span>
                                            </div>
                                        ))}
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
                                        {classifications.map(classification => (
                                            <div className='assortment-form-input_item' key={classification}>
                                                <input 
                                                    type="checkbox" 
                                                    id={`classification-${classification}`}
                                                    checked={filters.classification.includes(classification)}
                                                    onChange={() => handleFilterChange('classification', classification)}
                                                />
                                                <label htmlFor={`classification-${classification}`}>
                                                    <div className="checkbox-box"></div>
                                                    {classification}
                                                </label>
                                                <span>{classificationCounts[classification] || 0}</span>
                                            </div>
                                        ))}
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

                            {filteredWhiskey.length > 0 ? (
                                <>
                                    <div className='product-card-container'>
                                        {filteredWhiskey.map((item) => {
                                            const [year, volume] = item.whiskey_year_volume.split('/');
                                            const [country, manufacturer] = item.country_manufacturer.split('/');

                                            return (
                                                <div className='product-card' key={item.id}>
                                                    <div className='product-card-top whiskey-product-card-top'>
                                                        <img src={item.whiskey_image_path || product} alt={item.whiskey_name} />
                                                    </div>
                                                    <div className='product-card-bot'>
                                                        <h3>{item.whiskey_name}</h3>
                                                        <div className='product-card-bot-info'>
                                                            <span>{year}/{volume} л</span>
                                                            <div className='product-card-bot-country'>
                                                                <img src={item.flag_image_path || flag} alt={country} />
                                                                <p>{country}/{manufacturer}</p>
                                                            </div>
                                                            <div className='product-card-bot-bot'>
                                                                <div>
                                                                    <span>ЦЕНА ЗА 1 ШТ</span>
                                                                    <p>{new Intl.NumberFormat('ru-RU').format(item.price)} р</p>
                                                                </div>
                                                                <button onClick={() => handleAddToBasket(item.id)}>В КОРЗИНУ</button>
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
                                                price: { min: null, max: null },
                                                country: [],
                                                region: [],
                                                classification: [],
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