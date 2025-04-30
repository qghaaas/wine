import '../../main.css'
import './Newsletter.css'
import { Link } from 'react-router-dom'


export default function Newsletter() {
    return (
        <>
            <section className="newsletter">
                <div className='newsletter-offers'>
                    <div className='newsletter-offers-text'>
                        <form action="" className='newsletter-form'>
                            <legend>ПОДПИСАТЬСЯ НА EMAIL РАССЫЛКУ</legend>
                            <div>
                                <label htmlFor="">EMAIL</label>
                                <input type="text" name="" id="" />
                                <button>ОТПРАВИТЬ</button>
                            </div>
                        </form>
                        <div className='social-link'>
                            <Link to="#"><img src="" alt="" /></Link>
                            <Link to="#"><img src="" alt="" /></Link>
                            <Link to="#"><img src="" alt="" /></Link>
                        </div>
                    </div>
                    <div className='newsletter-backimg'></div>
                </div>
                <div className="container">
                    <div className="newsletter-inner">

                    </div>
                </div>
            </section>
        </>
    )
}