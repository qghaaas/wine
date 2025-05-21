import '../main.css'
import './Error404.css'
import errorArrow from './img/errorArrow.svg'

export default function Error404() {
    const handleArrowClick = () => {
        const nextSection = document.getElementById('specoffers');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <section className="error404">
                <div className="container">
                    <div className="error404-inner">
                        <div className='error404-content'>
                            <div className='error404-BG'></div>
                            <div className='error404-text'>
                                <div className='error404-title'>
                                    <h2>Ooooops...</h2>
                                    <p>404</p>
                                </div>

                                <div className='error404-subtitle'>
                                    <p>
                                        похоже, мы не можем найти
                                        нужную вам страницу
                                        <br />
                                        <br />
                                        загляните сюда
                                    </p>
                                    <img
                                        src={errorArrow}
                                        alt="Прокрутить вниз"
                                        onClick={handleArrowClick}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}