import '../../main.css'
import './Footer.css'



export default function Footer(){
    return(
        <>
        <footer className="footer">
            <div className="container">
                <div className="footer-inner">
                    <nav className='footer-nav-content'>
                        <ul className='footer-nav footer-nav-shop1'>
                            <li><h2>Shop</h2></li>
                            <li>History</li>
                            <li>Michel</li>
                            <li>Values</li>
                            <li>Biodynamics</li>
                        </ul>
                        <ul className='footer-nav footer-nav-shop2'>
                            <li><h2>Shop</h2></li>
                            <li>All Wines</li>
                            <li>Single vineyard selection</li>
                        </ul>
                        <ul className='footer-nav footer-nav-thewines'>
                            <li><h2>The Wines</h2></li>
                            <li>Hermitage in 3D</li>
                            <li>The soul of M. CHAPOUTIER</li>
                        </ul>
                        <ul className='footer-nav footer-nav-tourism'>
                            <li><h2>Wine Tourism</h2></li>
                            <li>Wine tasting services and visits</li>
                            <li>Bike ride</li>
                        </ul>
                    </nav>

                    <div className='footer-bot'>
                        <span className='gtyh'>2021 winemill</span>
                        <span>Privacy police</span>
                    </div>
                </div>
            </div>
        </footer>
        </>
    )
}