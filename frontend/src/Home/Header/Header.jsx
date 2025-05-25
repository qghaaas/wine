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

export default function Header() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [basketCount, setBasketCount] = useState(0);
    const [basketSum, setBasketSum] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false); 
    const navigate = useNavigate();

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
    return (
        <>
             <header className="header">
            <div className="container">
                <div className="header-inner">
                    <h2>ДОСТУПНА СРОЧНАЯ ДОСТАВКА ПО МОСКВЕ - <Link to="#">ДЕТАЛЬНЫЕ УСЛОВИЯ</Link></h2>
                    <nav className='header-top'>
                        <Link className='logo' to="/"><img src={logo} alt="Logo" /></Link>

                        <div className='header-search'>
                            <input type="text" />
                            <button>
                                <img src={search} alt="Search" />
                            </button>
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
                                <p>{displaySum} р</p>
                            </div>

                            <button className="burger-button" onClick={() => setMenuOpen(!menuOpen)}>
                                <img src={menuOpen ? CloseMenu : OpenMenu} alt="menu" />
                            </button>
                        </div>
                    </nav>

                    <nav className={`header-bot ${menuOpen ? 'open' : ''}`}>
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