import '../../main.css'
import './ProductOffers.css'
import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import product from '../../Home/Assortment/img/product.png'
import flag from '../../Home/Assortment/img/flag.svg'
import btnswipslider from '../../Home/Swiperoffers/img/btnswipslider.svg'

export default function ProductOffers({ showTitle = true }) {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    return (
        <>
            <section className="productoffers">
                <div className="container">
                    <div className="productoffers-inner">
                       {showTitle && <h2>ВАМ ТАКЖЕ ПОНРАВИТСЯ...</h2>} 

                        <div className="swiper-buttons swiper-buttons-product-offers">
                            <button ref={prevRef} className="swiper-button-prev-custom">
                                <img src={btnswipslider} alt="prev" />
                            </button>
                            <button ref={nextRef} className="swiper-button-next-custom">
                                <img src={btnswipslider} alt="next" />
                            </button>
                        </div>

                        <Swiper
                            slidesPerView={3}
                            spaceBetween={30}
                            modules={[Navigation]}
                            className="swiper-product-card-offers"
                            navigation={{
                                prevEl: prevRef.current,
                                nextEl: nextRef.current
                            }}
                            onBeforeInit={(swiper) => {
                                swiper.params.navigation.prevEl = prevRef.current;
                                swiper.params.navigation.nextEl = nextRef.current;
                            }}
                        >
                            <SwiperSlide className='swiper-slide-product-offers'>
                                <div className='product-card-container product-card-container-offers'>
                                    <div className='product-card'>
                                        <Link to="/Product-Wine">
                                            <div className='product-card-top'>
                                                <img src={product} />
                                            </div>
                                        </Link>
                                        <div className='product-card-bot'>
                                            <h3>L’ERMITE
                                                HERMITAGE</h3>
                                            <div className='product-card-bot-info'>
                                                <span>2009/0.75 л</span>
                                                <div className='product-card-bot-country'>
                                                    <img src={flag} />
                                                    <p>франция/M.CHAPOUTIER</p>
                                                </div>
                                                <div className='product-card-bot-bot'>
                                                    <div>
                                                        <span>ЦЕНА ЗА 1 ШТ</span>
                                                        <p>90 000 р</p>
                                                    </div>
                                                    <button>В КОРЗИНУ</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className='swiper-slide-product-offers'>
                                <div className='product-card-container product-card-container-offers'>
                                    <div className='product-card'>
                                        <Link to="/Product-Wine">
                                            <div className='product-card-top'>
                                                <img src={product} />
                                            </div>
                                        </Link>
                                        <div className='product-card-bot'>
                                            <h3>L’ERMITE
                                                HERMITAGE</h3>
                                            <div className='product-card-bot-info'>
                                                <span>2009/0.75 л</span>
                                                <div className='product-card-bot-country'>
                                                    <img src={flag} />
                                                    <p>франция/M.CHAPOUTIER</p>
                                                </div>
                                                <div className='product-card-bot-bot'>
                                                    <div>
                                                        <span>ЦЕНА ЗА 1 ШТ</span>
                                                        <p>90 000 р</p>
                                                    </div>
                                                    <button>В КОРЗИНУ</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className='swiper-slide-product-offers'>
                                <div className='product-card-container product-card-container-offers'>
                                    <div className='product-card'>
                                        <Link to="/Product-Wine">
                                            <div className='product-card-top'>
                                                <img src={product} />
                                            </div>
                                        </Link>
                                        <div className='product-card-bot'>
                                            <h3>L’ERMITE
                                                HERMITAGE</h3>
                                            <div className='product-card-bot-info'>
                                                <span>2009/0.75 л</span>
                                                <div className='product-card-bot-country'>
                                                    <img src={flag} />
                                                    <p>франция/M.CHAPOUTIER</p>
                                                </div>
                                                <div className='product-card-bot-bot'>
                                                    <div>
                                                        <span>ЦЕНА ЗА 1 ШТ</span>
                                                        <p>90 000 р</p>
                                                    </div>
                                                    <button>В КОРЗИНУ</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide >
                            <SwiperSlide>Slide 4</SwiperSlide>
                            <SwiperSlide>Slide 5</SwiperSlide>
                            <SwiperSlide>Slide 6</SwiperSlide>
                            <SwiperSlide>Slide 7</SwiperSlide>
                            <SwiperSlide>Slide 8</SwiperSlide>
                            <SwiperSlide>Slide 9</SwiperSlide>
                            <button className='see-all'><p>СМОТРЕТЬ ВСЕ</p> <div></div></button>
                        </Swiper>
                    </div>
                </div>
            </section>
        </>
    )
}