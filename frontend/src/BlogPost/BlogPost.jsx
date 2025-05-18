import '../main.css';
import './BlogPost.css';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductOffers from '../ProductPage/ProductOffers/ProductOffers';

export default function BlogPost() {
    const { card_id } = useParams();
    const [post, setPost] = useState(null);
    const [blogCards, setBlogCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [randomCards, setRandomCards] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [postResponse, cardsResponse] = await Promise.all([
                    fetch(`http://localhost:3010/api/blogpost/${card_id}`),
                    fetch('http://localhost:3010/api/blog-cards')
                ]);

                if (!postResponse.ok) throw new Error('Ошибка при загрузке поста');
                if (!cardsResponse.ok) throw new Error('Ошибка при загрузке карточек');

                const [postData, cardsData] = await Promise.all([
                    postResponse.json(),
                    cardsResponse.json()
                ]);

                setPost(postData);
                setBlogCards(cardsData);

                const filtered = cardsData.filter(card => card.id !== card_id);
                const shuffled = [...filtered].sort(() => 0.5 - Math.random());
                setRandomCards(shuffled.slice(0, 2));

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [card_id]);

    if (loading) return <div className="loading">Загрузка...</div>;
    if (error) return <div className="error">Ошибка: {error}</div>;
    if (!post) return <div className="not-found">Статья не найдена</div>;

    return (
        <>
            <section className="blogpost">
                <div className="container">
                    <div className="blogpost-inner">
                        <div className="blogpost-content">
                            <div className="blogpost-item">
                                <div className='blogpost-item-left'>
                                    <h2>{post.main_title}</h2>
                                    <p>{post.main_content}</p>
                                </div>
                                <img src={post.main_image_url} alt="" />
                            </div>

                            <div className="blogpost-item">
                                <div className='blogpost-item-left'>
                                    <h3>{post.subtitle_1}</h3>
                                </div>
                                <div className='blogpost-item-right'>
                                    <p>{post.content_1}</p>
                                </div>
                            </div>
                            <ProductOffers showTitle={false} />
                            <div className="blogpost-item">
                                <div className='blogpost-item-left'>
                                    <h3>{post.subtitle_2}</h3>
                                </div>
                                <div className='blogpost-item-right'>
                                    <p>{post.content_2}</p>
                                </div>
                            </div>
                            <ProductOffers showTitle={false} />
                            <div className="blogpost-item">
                                <div className='blogpost-item-left'>
                                    <h3>{post.subtitle_3}</h3>
                                </div>
                                <div className='blogpost-item-right'>
                                    <p>{post.content_3}</p>
                                </div>
                            </div>
                            <ProductOffers showTitle={false} />
                        </div>


                        <div className="blog-container blog-container-blogpost">
                            {randomCards.map((card) => (
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

                    </div>
                </div>
            </section>
        </>
    );
}