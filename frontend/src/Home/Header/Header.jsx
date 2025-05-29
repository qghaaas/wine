import '../../main.css'
import './Header.css'
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './img/logo.svg'
import search from './img/search.svg'
import geoicon from './img/geoicon.svg'
import axios from 'axios';
import OpenMenu from './img/OpenMenu.svg'
import CloseMenu from './img/CloseMenu.svg'
import basketIcon from './img/basketIcon.svg'


export default function Header() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [basketCount, setBasketCount] = useState(0);
    const [basketSum, setBasketSum] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [allWines, setAllWines] = useState([]);


    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);

        if (token) {
            axios.get('http://localhost:3010/api/basket', {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(response => {
                    const items = response.data;
                    const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);
                    const totalSum = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
                    setBasketCount(totalCount);
                    setBasketSum(totalSum);
                })
                .catch(err => {
                    console.error('Ошибка получения корзины в Header:', err);
                    setBasketCount(0);
                    setBasketSum(0);
                });
        } else {
            setBasketCount(0);
            setBasketSum(0);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/');
    };

    const handleBasketClick = (e) => {
        e.preventDefault();
        if (isAuthenticated) {
            navigate('/Basket');
        } else {
            navigate('/AccountSelect');
        }
    };

    const displayCount = basketCount > 9 ? '9+' : basketCount;
    const displaySum = basketSum > 99990 ? '99999+' : basketSum;

    useEffect(() => {
        const fetchWines = async () => {
            try {
                const response = await fetch('http://localhost:3010/api/wines');
                const data = await response.json();
                setAllWines(data);
            } catch (err) {
                console.error('Ошибка загрузки вин:', err);
            }
        };
        fetchWines();
    }, []);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setSearchResults([]);
            return;
        }

        const filtered = allWines.filter(wine =>
            wine.wine_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            wine.country_manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            wine.color.toLowerCase().includes(searchTerm.toLowerCase()) ||
            wine.sweetness.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setSearchResults(filtered);
    }, [searchTerm, allWines]);

    const handleResultClick = (id) => {
        navigate(`/Product-Wine/${id}`);
        setSearchTerm('');
        setSearchResults([]);
    };
    return (
        <>
            <header className="header">
                <div className="container">
                    <div className="header-inner">
                        <h2>ДОСТУПНА СРОЧНАЯ ДОСТАВКА ПО МОСКВЕ - <Link to="#">ДЕТАЛЬНЫЕ УСЛОВИЯ</Link></h2>
                        <nav className='header-top'>
                            <Link className='logo' to="/"><img src={logo} alt="Logo" /></Link>

                            <div className='header-search'>
                                <input
                                    type="text"
                                    placeholder="Поиск..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <button>
                                    <img src={search} alt="Search" />
                                </button>

                                {searchResults.length > 0 && (
                                    <ul className="search-dropdown">
                                        {searchResults.map(wine => (
                                            <li key={wine.id} onClick={() => handleResultClick(wine.id)}>
                                                {wine.wine_name}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            <div className="nav-right">
                                <div className='authentication'>
                                    <div>
                                        {isAuthenticated ? (
                                            <button onClick={handleLogout} className="logout-button">Выйти</button>
                                        ) : (
                                            <>
                                                <Link to="/Register">Регистрация</Link>
                                                <Link to="/Login">Вход</Link>
                                            </>
                                        )}
                                    </div>
                                    <Link to="#">Личный кабинет</Link>
                                </div>

                                <div className="geolocation">
                                    <div>
                                        <img src={geoicon} alt="geo" />
                                        <p>Москва</p>
                                    </div>
                                    <p>063 658 32 21</p>
                                </div>

                                <div className="basket">
                                    <div>
                                        <Link to="/Basket" onClick={handleBasketClick}>
                                            Корзина: {displayCount}
                                        </Link>
                                    </div>

                                    <Link className='basketIcon' to="/Basket" onClick={handleBasketClick}>
                                        <img src={basketIcon} alt="" />
                                    </Link>
                                    <p>{displaySum} р</p>
                                </div>

                                <button className="burger-button" onClick={() => setMenuOpen(!menuOpen)}>
                                    <img src={menuOpen ? CloseMenu : OpenMenu} alt="menu" />
                                </button>
                            </div>
                        </nav>



                        <nav className={`header-bot ${menuOpen ? 'open' : ''}`}>
                            <div className="mobile-menu-content">
                                <div className="mobile-auth">
                                    <div>
                                        {isAuthenticated ? (
                                            <button onClick={handleLogout} className="logout-button">Выйти</button>
                                        ) : (
                                            <>
                                                <Link to="/Register">Регистрация</Link>
                                                <Link to="/Login">Вход</Link>
                                            </>
                                        )}
                                    </div>
                                    <Link to="#">Личный кабинет</Link>
                                </div>

                                <div className="mobile-geo">
                                    <div>
                                        <img src={geoicon} alt="geo" />
                                        <p>Москва</p>
                                    </div>
                                    <p>063 658 32 21</p>
                                </div>
                            </div>

                            <ul className='header-bot-item'>
                                <li><Link to="/Wine">Вино</Link></li>
                                <li><Link to="/Error">Игристое</Link></li>
                                <li><Link to="/Whiskey">Виски</Link></li>
                                <li><Link to="/Error">Коньяк</Link></li>
                                <li><Link to="/Error">Арманьяк</Link></li>
                                <li><Link to="/Error">Ром</Link></li>
                                <li><Link to="/Error">Водка</Link></li>
                                <li><Link to="/Error">Ликер</Link></li>
                                <li><Link to="/Error">Коктели</Link></li>
                                <li><Link to="/Error">Деликатесы</Link></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
        </>
    )
}