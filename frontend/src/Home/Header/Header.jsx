import '../../main.css'
import './Header.css'
import { Link } from 'react-router-dom'
import logo from './img/logo.svg'
import search from './img/search.svg'
import geoicon from './img/geoicon.svg'


export default function Header() {
    return (
        <>
            <header className="header">
                <div className="container">
                    <div className="header-inner">
                        <h2>ДОСТУПНА СРОЧНАЯ ДОСТАВКА ПО МОСКВЕ - <Link to="#">ДЕТАЛЬНЫЕ УСЛОВИЯ</Link></h2>
                        <nav className='header-top'>
                            <img className='logo' src={logo} alt="" />
                            <div className='header-search'>
                                <input type="text" />
                                <button>
                                    <img src={search} alt="" />
                                </button>
                            </div>

                            <div className='nav-right'>
                                <div className='authentication'>
                                    <div>
                                        <Link to="#">Регистрация</Link>
                                        <Link to="#">Вход</Link>
                                    </div>
                                    <Link to="#">Личный кабинет</Link>
                                </div>
                                <div className='geolocation'>
                                    <div>
                                        <img src={geoicon} alt="" />
                                        <p>Москва</p>
                                    </div>
                                    <p>063 658 32 21</p>
                                </div>
                                <div className='basket'>
                                    <div>
                                        <Link to="#"> Корзина: 0</Link>
                                    </div>
                                    <p>0 р</p>
                                </div>
                            </div>

                        </nav>

                        <nav className='header-bot'>
                            <ul className='header-bot-item'>
                                <li><Link to="#">Вино</Link></li>
                                <li><Link to="#">Игристое</Link></li>
                                <li><Link to="#">Виски</Link></li>
                                <li><Link to="#">Коньяк</Link></li>
                                <li><Link to="#">Арманьяк</Link></li>
                                <li><Link to="#">Ром</Link></li>
                                <li><Link to="#">Водка</Link></li>
                                <li><Link to="#">Ликер</Link></li>
                                <li><Link to="#">Коктели</Link></li>
                                <li><Link to="#">Деликатесы</Link></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
        </>
    )
}