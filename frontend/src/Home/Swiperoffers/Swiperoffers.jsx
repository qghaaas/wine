import '../../main.css'
import './Swiperoffers.css'
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import swiperoffer1 from './img/swiperoffer1.jpg'
import { Link } from 'react-router-dom'
import btnswipslider from './img/btnswipslider.svg'


export default function Swiperoffers() {
    return (
        <>
            <section className="swiperoffers">
                <div className="container">
                    <div className="swiperoffers-inner">

                        <div className="swiper-buttons">
                            <button className="swiper-button-prev-custom">
                                <img src={btnswipslider} alt="prev" />
                            </button>
                            <button className="swiper-button-next-custom">
                                <img src={btnswipslider} alt="next" />
                            </button>
                        </div>
                        <Swiper
                            cssMode={true}
                            navigation={{
                                prevEl: '.swiper-button-prev-custom',
                                nextEl: '.swiper-button-next-custom',
                            }}
                            pagination={{
                                el: '.swiper-custom-pagination',
                                clickable: true,
                                renderBullet: function (index, className) {
                                    return `<span class="${className}"></span>`;
                                },
                            }}
                            mousewheel={true}
                            keyboard={true}
                            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                            className="swiperwine"
                        >
                            <SwiperSlide>
                                <div className='slide-swiper-offers'>
                                    <img className='swiperoffer-img' src={swiperoffer1} alt="" />
                                    <div className='swiper-offers-text'>
                                        <h2>Special offer</h2>
                                        <p>pichon longueville <br />
                                            comtesse de lalande </p>
                                        <Link to="#">Заказать вино</Link>
                                    </div>
                                </div>

                            </SwiperSlide>

                            <SwiperSlide>
                                <div className='slide-swiper-offers2'>
                                    <div className='swiper-offers-text2'>
                                        <h2>Special offer</h2>
                                        <p>ПИНО НУАР: <br />
                                            БУРГУНДИЯ VS. ЮАР </p>
                                        <Link to="#">УЗНАТЬ БОЛЬШЕ</Link>
                                    </div>
                                </div>
                            </SwiperSlide>

                            <SwiperSlide>
                                <div className='slide-swiper-offers2'>
                                    <div className='swiper-offers-text2'>
                                        <h2>Special offer</h2>
                                        <p>ПИНО НУАР: <br />
                                            БУРГУНДИЯ VS. ЮАР</p>
                                        <Link to="#">УЗНАТЬ БОЛЬШЕ</Link>
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                        <div className="swiper-custom-pagination"></div>
                    </div>
                </div>
            </section>
        </>
    )
}
