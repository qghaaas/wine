import '../main.css'
import './BasketPage.css'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../Breadcrumbs'


export default function BasketPage() {
    return (
        <>
            <section className="basketpage">
                <div className="container">
                    <div className="basketpage-inner">
                        <div className="basketpage-title">
                            <Breadcrumbs />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}