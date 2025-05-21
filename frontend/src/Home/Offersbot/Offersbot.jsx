import '../../main.css'
import './Offersbot.css'



export default function Offersbot() {
    return (
        <>
            <section className='offersbot'>
                <div className="container">
                    <div className="offersbot-inner">

                        <div className="offersbot-block" style={{
                            backgroundImage: "url('/src/Home/Offersbot/img/offersbot1.jpg')"
                        }}>
                            <div className='offersbot-background-color'></div>
                            <p>НА ТЕРРИТОРИИ БОРДО</p>
                            <h3>БРЕНДИРОВАНИЕ ВИН</h3>

                        </div>
                        <div className="offersbot-block" style={{ backgroundImage: "url('/src/Home/Offersbot/img/offersbot2.jpg')" }}>
                            <div className='offersbot-background-color'></div>
                            <p>ЧТО ДЕЛАЕТ НАС ОСОБЕННЫМИ?</p>
                            <h3>БЕСЕДА С СОМЕЛЬЕ</h3>
                        </div>
                        <div className="offersbot-block" style={{ backgroundImage: "url('/src/Home/Offersbot/img/offersbot3.jpg')" }}>
                            <div className='offersbot-background-color'></div>
                            <p>С ИНТЕРЕСНЫМИ ИНГРЕДИЕНТАМИ</p>
                            <h3>ФИРМЕННЫЕ КОКТЕЙЛИ</h3>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}