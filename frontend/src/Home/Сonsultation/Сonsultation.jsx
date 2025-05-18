import '../../main.css'
import './Сonsultation.css'
import consultationimg from './img/consultationimg.jpg'
import { Link } from 'react-router-dom'
import { useEffect } from 'react';



export default function Сonsultation() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    return (
        <>
            <section className="consultation">
                <div className="consultation-inner">
                    <div className='consultation-offers'>
                        <img src={consultationimg} alt="" />
                        <div className='consultation-offers-text'>
                            <h2>Sommelier Choice</h2>
                            <p>НЕ УВЕРЕНЫ В ВЫБОРЕ?<br />
                                МЫ ГОТОВЫ ПОМОЧЬ!</p>
                            <Link to="#">ЗАКАЗАТЬ КОНСУЛЬТАЦИЮ</Link>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="consultation-main-text">
                        <p>Благодаря рекомендациям наших опытных кавистов, вы сможете не только приобрести ту самую бутылку вина, но и узнать много нового о сочетаниях, подборе гастрономической пары, необходимости декантации, хранении и сервировке. </p>
                        <p>Мы с удовольствием поделимся с Вами самыми главными винными секретами, а также поможем подобрать идеальные букет и вкус, соответствующие поводу, вашим предпочтениям и статусу. </p>
                    </div>
                    <Link
                        to="/Blog"
                        className='see-all consultation-see-all'
                        onClick={scrollToTop}
                    >
                        <p>УЗНАТЬ БОЛЬШЕ</p>
                        <div></div>
                    </Link>
                </div>
            </section>
        </>
    )
}