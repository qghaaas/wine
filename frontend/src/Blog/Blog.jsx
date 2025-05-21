import '../main.css'
import './Blog.css'
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';



export default function Blog() {
    const [blogCards, setBlogCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogCards = async () => {
            try {
                const response = await fetch('http://localhost:3010/api/blog-cards');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setBlogCards(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogCards();
    }, []);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;
    return (
        <>
            <section className="blog">
                <div className="container">
                    <div className="blog-inner">
                        <div className="blog-title">
                            <h2>статьи о вине и крепких напитках</h2>
                            <p>Просто и понятно о винных стилях, регионах, сортах...</p>
                        </div>

                        <div className="blog-container">
                            {blogCards.map((card) => (
                                <div className="blog-card" key={card.id}>
                                    <div className='blog-card-bg'>
                                        <img src={card.image_url} alt={card.title} />
                                    </div>
                                    <h3>{card.title}</h3>
                                    <p>{card.subtitle}</p>
                                    <Link
                                        to={`/BlogPost/${card.id}`}
                                        className="blog-link"
                                        state={{ cardData: card }}
                                    >
                                        {card.call_to_action}
                                    </Link>
                                </div>
                            ))}
                        </div>
                        <button className='see-all'><p>СМОТРЕТЬ ВСЕ</p> <div></div></button>
                    </div>
                </div>
            </section>
        </>
    )
}