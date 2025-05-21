import '../../main.css'
import './SpecOffers.css'
import specoffersimg1 from './img/specoffersimg1.jpg'
import specoffersimg2 from './img/specoffersimg2.jpg'


export default function SpecOffers() {
    return (
        <>
            <section className="specoffers" id='specoffers'>
                <div className="container">
                    <div className="specoffers-inner">
                        <div className='specoffers-item'>
                            <div className='specoffers-item-top'>
                                <div className='specoffers-item-bg'
                                    style={{ backgroundImage: `url(${specoffersimg1})` }}>
                                </div>
                                <span>ЧТО ДЕЛАЕТ НАС ОСОБЕННЫМИ?</span>
                                <h3>БЕСЕДА С СОМЕЛЬЕ</h3>
                            </div>

                            <div className='specoffers-item-bot'>
                                <p>Благодаря рекомендациям наших опытных кавистов, вы сможете не только приобрести ту самую бутылку вина, но и узнать много нового о сочетаниях, подборе гастрономической пары, необходимости декантации, хранении и сервировке. </p>
                            </div>

                        </div>

                        <div className='specoffers-item'>
                            <div className='specoffers-item-top'>
                                <div className='specoffers-item-bg'
                                    style={{ backgroundImage: `url(${specoffersimg2})` }}>
                                </div>
                                <span>ДЛЯ КОРПОРАТИВНЫХ КЛИЕНТОВ</span>
                                <h3>СПЕЦИАЛЬНЫЕ ЦЕНЫ</h3>
                            </div>

                            <div className='specoffers-item-bot'>
                                <p>Мы с удовольствием поделимся с Вами самыми главными винными секретами, а также поможем подобрать идеальные букет и вкус, соответствующие поводу, вашим предпочтениям и статусу. </p>
                            </div>
                        </div>
                    </div>
                    <button className='see-all find-out-more'><p>Узнать больше</p> <div></div></button>
                </div>
            </section>
        </>
    )
}