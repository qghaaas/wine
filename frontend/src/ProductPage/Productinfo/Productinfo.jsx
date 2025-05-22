import '../../main.css'
import './Productinfo.css'
import productpagephoto from './img/productpagephoto.png'
import flag from '../../Home/Assortment/img/flag.svg'
import productinfoicon from './img/productinfoicon.svg'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';



export default function Productinfo() {
    const { id } = useParams();
    const [wineData, setWineData] = useState(null);
    const [loading, setLoading] = useState(true);

   useEffect(() => {
  const fetchWineData = async () => {
    try {
      const response = await fetch(`http://localhost:3010/api/wines/${id}`); 
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      const data = await response.json();
      setWineData(data);
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
    } finally {
      setLoading(false);
    }
  };
  
  fetchWineData();
}, [id]);
    if (loading) return <div>Загрузка...</div>;
    if (!wineData) return <div>Товар не найден</div>;

    const [year, volume] = wineData.wine_year_volume.split('/');
    const [country, manufacturer] = wineData.country_manufacturer.split('/');
    return (
        <>
            <section className="productinfo">
                <div className="container">
                    <div className="productinfo-inner">
                        <div className="productinfo-photo">
                            <img src={wineData.wine_image_path || productpagephoto} alt={wineData.wine_name} />
                        </div>

                        <div className="productinfo-info-content">
                            <div className="productinfo-info-content-top">
                                <div className="productinfo-info-content-top-item">
                                    <div className='productinfo-info-content-top-item-nameprice'>
                                        <h2>{wineData.wine_name}</h2>
                                        <div className='productinfo-info-content-top-item-nameprice-price'>
                                            <span>цена за 1 шт</span>
                                            <p>{new Intl.NumberFormat('ru-RU').format(wineData.price)} Р</p>
                                        </div>
                                    </div>
                                    <div className='productinfo-info-content-top-flag'>
                                        <div className='productinfo-info-content-top-flag-item'>
                                            <p>{year}/{volume} л</p>
                                            <div>
                                                <img src={wineData.flag_image_path || flag} alt={country} />
                                                <span>{country}/{manufacturer}</span>
                                            </div>
                                        </div>
                                        <div className='add-basket'>
                                            <span>1</span>
                                            <button>В КОРЗИНУ</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="productinfo-info-content-top-main">
                                    <div className="product-columns-container">
                                        <ul className='product-column'>
                                            <li>
                                                <span>ГЕОГРАФИЯ:</span>
                                                <p>{wineData.region}</p>
                                            </li>
                                            <li>
                                                <span>КРЕПОСТЬ:</span>
                                                <p>{wineData.alcohol_content}%</p>
                                            </li>
                                            <li>
                                                <span>ИМПОРТЕР:</span>
                                                <p>{wineData.importer}</p>
                                            </li>
                                        </ul>

                                        <ul className='product-column'>
                                            <li>
                                                <span>КЛАССИФИКАЦИЯ:</span>
                                                <p>{wineData.classification}</p>
                                            </li>
                                            <li>
                                                <span>САХАР:</span>
                                                <p>{wineData.sugar_content} Г/Л</p>
                                            </li>
                                            <li>
                                                <span>РЕЙТИНГ:</span>
                                                <p>RP {wineData.rating}</p>
                                            </li>
                                        </ul>

                                        <ul className='product-column product-column-third'>
                                            <li>
                                                <span>СОРТОВОЙ СОСТАВ:</span>
                                                <p>{wineData.grape_varieties}</p>
                                            </li>
                                            <li className="product-image-container">
                                                <img src={productinfoicon} alt="" />
                                                <img src={productinfoicon} alt="" />
                                                <img src={productinfoicon} alt="" />
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className='product-info-description'>
                                <div className='product-info-description-item product-info-description-border '>
                                    <h3>цвет, вкус, аромат:</h3>
                                    <p>{wineData.color_taste_aroma}</p>
                                </div>
                                <div className='product-info-description-item product-info-description-border '>
                                    <h3>Легенда:</h3>
                                    <p>{wineData.legend}</p>
                                </div>
                                <div className='product-info-description-item'>
                                    <h3>винификация:</h3>
                                    <p>{wineData.vinification}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}