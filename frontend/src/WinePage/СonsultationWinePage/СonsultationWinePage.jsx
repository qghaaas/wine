import '../../main.css'
import './СonsultationWinePage.css'
import consultationimg2 from './img/consultationimg2.jpg'
import { Link } from 'react-router-dom'


export default function СonsultationWinePage() {
    return (
        <>
            <section className="consultation">
                <div className="consultation-inner">
                    <div className='consultation-offers'>
                        <img src={consultationimg2} alt="" />
                        <div className='consultation-offers-text consultation-offers-textWINEPAGE'>
                            <h2>Sommelier Choice</h2>
                            <p>СПЕЦИАЛЬНЫЕ ЦЕНЫ ДЛЯ <br />
                                КОРПОРАТИВНЫХ КЛИЕНТОВ</p>
                            <Link to="#">УЗНАТЬ БОЛЬШЕ</Link>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="consultation-main-text">
                        <p>Благодаря рекомендациям наших опытных кавистов, вы сможете не только приобрести ту самую бутылку вина, но и узнать много нового о сочетаниях, подборе гастрономической пары, необходимости декантации, хранении и сервировке. </p>
                        <p>Мы с удовольствием поделимся с Вами самыми главными винными секретами, а также поможем подобрать идеальные букет и вкус, соответствующие поводу, вашим предпочтениям и статусу. </p>
                    </div>
                    <button className='see-all consultation-see-all'><p>УЗНАТЬ БОЛЬШЕ</p> <div></div></button>
                </div>
            </section>
        </>
    )
}