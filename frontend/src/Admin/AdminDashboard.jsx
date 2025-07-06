import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [wines, setWines] = useState([]);
    const [whiskeys, setWhiskeys] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('users');
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [wineColors, setWineColors] = useState([]);
    const [sweetnessLevels, setSweetnessLevels] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        year_volume: '',
        price: '',
        country_manufacturer: '',
        region: '',
        classification: '',
        image_path: '',
        flag_image_path: '',
        color: '',
        sweetness: '',
        grape_varieties: '',
        alcohol_content: '',
        sugar_content: '',
        importer: '',
        rating: '',
        color_taste_aroma: '',
        legend: '',
        vinification: ''
    });
    const navigate = useNavigate();

    const [formErrors, setFormErrors] = useState({});

    const validateForm = () => {
        const errors = {};
        Object.keys(formData).forEach(key => {
            if (!formData[key] && key !== 'id') {
                errors[key] = 'Это поле обязательно для заполнения';
            }
        });
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('adminToken');
                if (!token) {
                    navigate('/admin');
                    return;
                }

                const [usersRes, winesRes, whiskeysRes, colorsRes, sweetnessRes] = await Promise.all([
                    fetch('http://localhost:3010/api/admin/users', {
                        headers: { 'Authorization': `Bearer ${token}` },
                    }),
                    fetch('http://localhost:3010/api/wines', {
                        headers: { 'Authorization': `Bearer ${token}` },
                    }),
                    fetch('http://localhost:3010/api/whiskey', {
                        headers: { 'Authorization': `Bearer ${token}` },
                    }),
                    fetch('http://localhost:3010/api/wine-colors', {
                        headers: { 'Authorization': `Bearer ${token}` },
                    }),
                    fetch('http://localhost:3010/api/wine-sweetness-levels', {
                        headers: { 'Authorization': `Bearer ${token}` },
                    })
                ]);

                if (!usersRes.ok || !winesRes.ok || !whiskeysRes.ok || !colorsRes.ok || !sweetnessRes.ok) {
                    throw new Error('Ошибка при загрузке данных');
                }

                const usersData = await usersRes.json();
                const winesData = await winesRes.json();
                const whiskeysData = await whiskeysRes.json();
                const colorsData = await colorsRes.json();
                const sweetnessData = await sweetnessRes.json();

                setUsers(usersData);
                setWines(winesData);
                setWhiskeys(whiskeysData);
                setWineColors(colorsData);
                setSweetnessLevels(sweetnessData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (formErrors[name]) {
            setFormErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            year_volume: '',
            price: '',
            country_manufacturer: '',
            region: '',
            classification: '',
            image_path: '',
            flag_image_path: '',
            color: '',
            sweetness: '',
            grape_varieties: '',
            alcohol_content: '',
            sugar_content: '',
            importer: '',
            rating: '',
            color_taste_aroma: '',
            legend: '',
            vinification: ''
        });
        setEditingItem(null);
    };

    const handleAddItem = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const token = localStorage.getItem('adminToken');
            if (!token) {
                navigate('/admin');
                return;
            }

            let response;
            if (activeTab === 'wines') {
                const wineData = {
                    wine_name: formData.name,
                    wine_year_volume: formData.year_volume,
                    price: formData.price,
                    country_manufacturer: formData.country_manufacturer,
                    region: formData.region,
                    color: formData.color,
                    sweetness: formData.sweetness,
                    classification: formData.classification,
                    grape_varieties: formData.grape_varieties,
                    alcohol_content: formData.alcohol_content,
                    sugar_content: formData.sugar_content,
                    importer: formData.importer,
                    rating: formData.rating,
                    color_taste_aroma: formData.color_taste_aroma,
                    legend: formData.legend,
                    vinification: formData.vinification,
                    wine_image_path: formData.image_path,
                    flag_image_path: formData.flag_image_path
                };

                const url = editingItem
                    ? `http://localhost:3010/api/admin/wines/${editingItem.id}`
                    : 'http://localhost:3010/api/admin/wines';

                response = await fetch(url, {
                    method: editingItem ? 'PUT' : 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(wineData)
                });
            } else if (activeTab === 'whiskey') {
                const whiskeyData = {
                    whiskey_name: formData.name,
                    whiskey_year_volume: formData.year_volume,
                    price: formData.price,
                    country_manufacturer: formData.country_manufacturer,
                    region: formData.region,
                    classification: formData.classification,
                    whiskey_image_path: formData.image_path,
                    flag_image_path: formData.flag_image_path
                };

                const url = editingItem
                    ? `http://localhost:3010/api/admin/whiskey/${editingItem.id}`
                    : 'http://localhost:3010/api/admin/whiskey';

                response = await fetch(url, {
                    method: editingItem ? 'PUT' : 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(whiskeyData)
                });
            }

            if (!response.ok) {
                throw new Error('Ошибка при сохранении');
            }

            const data = await response.json();

            if (activeTab === 'wines') {
                if (editingItem) {
                    setWines(wines.map(w => w.id === editingItem.id ? data : w));
                } else {
                    setWines([...wines, data]);
                }
            } else if (activeTab === 'whiskey') {
                if (editingItem) {
                    setWhiskeys(whiskeys.map(w => w.id === editingItem.id ? data : w));
                } else {
                    setWhiskeys([...whiskeys, data]);
                }
            }

            setShowAddForm(false);
            resetForm();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleEditItem = (item) => {
        if (activeTab === 'wines') {
            setFormData({
                name: item.wine_name,
                year_volume: item.wine_year_volume,
                price: item.price,
                country_manufacturer: item.country_manufacturer,
                region: item.region,
                classification: item.classification,
                image_path: item.wine_image_path,
                flag_image_path: item.flag_image_path,
                color: item.color,
                sweetness: item.sweetness,
                grape_varieties: item.grape_varieties,
                alcohol_content: item.alcohol_content,
                sugar_content: item.sugar_content,
                importer: item.importer,
                rating: item.rating,
                color_taste_aroma: item.color_taste_aroma,
                legend: item.legend,
                vinification: item.vinification
            });
        } else if (activeTab === 'whiskey') {
            setFormData({
                name: item.whiskey_name,
                year_volume: item.whiskey_year_volume,
                price: item.price,
                country_manufacturer: item.country_manufacturer,
                region: item.region,
                classification: item.classification,
                image_path: item.whiskey_image_path,
                flag_image_path: item.flag_image_path
            });
        }
        setEditingItem(item);
        setShowAddForm(true);
    };

    const handleDeleteItem = async (id) => {
        try {
            const token = localStorage.getItem('adminToken');
            if (!token) {
                navigate('/admin');
                return;
            }

            const url = activeTab === 'wines'
                ? `http://localhost:3010/api/admin/wines/${id}`
                : `http://localhost:3010/api/admin/whiskey/${id}`;

            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Ошибка при удалении');
            }

            if (activeTab === 'wines') {
                setWines(wines.filter(w => w.id !== id));
            } else if (activeTab === 'whiskey') {
                setWhiskeys(whiskeys.filter(w => w.id !== id));
            }
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div className="loading-message">Loading...</div>;

    return (
        <div className="admin-dashboard-container">
            <div className="admin-dashboard-header">
                <h2 className="admin-dashboard-title">АДМИН ПАНЕЛЬ</h2>
                <button onClick={handleLogout} className="admin-dashboard-logout">
                    Выйти
                </button>
            </div>

            {error && <p className="admin-dashboard-error">{error}</p>}

            <div className="admin-tabs">
                <button
                    className={`admin-tab ${activeTab === 'users' ? 'active' : ''}`}
                    onClick={() => setActiveTab('users')}
                >
                    Пользователи
                </button>
                <button
                    className={`admin-tab ${activeTab === 'wines' ? 'active' : ''}`}
                    onClick={() => setActiveTab('wines')}
                >
                    Вино
                </button>
                <button
                    className={`admin-tab ${activeTab === 'whiskey' ? 'active' : ''}`}
                    onClick={() => setActiveTab('whiskey')}
                >
                    Виски
                </button>
            </div>

            <div className="admin-content">
                {activeTab === 'users' && (
                    <>
                        <h3 className="admin-users-title">Зарегистрированные пользователи</h3>
                        <table className="admin-users-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Имя</th>
                                    <th>Фамилия</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.first_name}</td>
                                        <td>{user.last_name}</td>
                                        <td>{user.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}

                {(activeTab === 'wines' || activeTab === 'whiskey') && (
                    <>
                        <div className="admin-items-header">
                            <h3 className="admin-items-title">
                                {activeTab === 'wines' ? 'Вино ассортимент' : 'Виски ассортимент'}
                            </h3>
                            <button
                                className="admin-add-item-btn"
                                onClick={() => {
                                    resetForm();
                                    setShowAddForm(true);
                                }}
                            >
                                Добавить {activeTab === 'wines' ? 'Вино' : 'Виски'}
                            </button>
                        </div>

                        {showAddForm && (
                            <div className="admin-item-form-container">
                                <form className="admin-item-form" onSubmit={handleAddItem}>
                                    <h4>{editingItem ? 'Edit' : 'Добавить'} {activeTab === 'wines' ? 'Вино' : 'Виски'}</h4>

                                    <div className="form-group">
                                        <label>Название:</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                        />
                                        {formErrors.name && <span className="error-message">{formErrors.name}</span>}
                                    </div>

                                    <div className="form-group">
                                        <label>Год/Объем:</label>
                                        <input
                                            type="text"
                                            name="year_volume"
                                            value={formData.year_volume}
                                            onChange={handleInputChange}
                                        />
                                        {formErrors.year_volume && <span className="error-message">{formErrors.year_volume}</span>}
                                    </div>

                                    <div className="form-group">
                                        <label>Цена:</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleInputChange}
                                        />
                                        {formErrors.price && <span className="error-message">{formErrors.price}</span>}
                                    </div>

                                    <div className="form-group">
                                        <label>Страна/Производитель:</label>
                                        <input
                                            type="text"
                                            name="country_manufacturer"
                                            value={formData.country_manufacturer}
                                            onChange={handleInputChange}
                                        />
                                        {formErrors.country_manufacturer && <span className="error-message">{formErrors.country_manufacturer}</span>}
                                    </div>

                                    <div className="form-group">
                                        <label>Регион:</label>
                                        <input
                                            type="text"
                                            name="region"
                                            value={formData.region}
                                            onChange={handleInputChange}
                                        />
                                        {formErrors.region && <span className="error-message">{formErrors.region}</span>}
                                    </div>

                                    <div className="form-group">
                                        <label>Классификация:</label>
                                        <input
                                            type="text"
                                            name="classification"
                                            value={formData.classification}
                                            onChange={handleInputChange}
                                        />
                                        {formErrors.classification && <span className="error-message">{formErrors.classification}</span>}
                                    </div>

                                    <div className="form-group">
                                        <label>Image URL:</label>
                                        <input
                                            type="url"
                                            name="image_path"
                                            value={formData.image_path}
                                            onChange={handleInputChange}
                                        />
                                        {formErrors.image_path && <span className="error-message">{formErrors.image_path}</span>}
                                    </div>

                                    <div className="form-group">
                                        <label>Flag Image URL:</label>
                                        <input
                                            type="url"
                                            name="flag_image_path"
                                            value={formData.flag_image_path}
                                            onChange={handleInputChange}
                                        />
                                        {formErrors.flag_image_path && <span className="error-message">{formErrors.flag_image_path}</span>}
                                    </div>

                                    {activeTab === 'wines' && (
                                        <>
                                            <div className="form-group">
                                                <label>Цвет:</label>
                                                <select
                                                    name="color"
                                                    value={formData.color}
                                                    onChange={handleInputChange}
                                                >
                                                    <option value="">Выбери цвет</option>
                                                    {wineColors.map((color, index) => (
                                                        <option key={index} value={color}>
                                                            {color}
                                                        </option>
                                                    ))}
                                                </select>
                                                {formErrors.color && <span className="error-message">{formErrors.color}</span>}
                                            </div>

                                            <div className="form-group">
                                                <label>Сладость:</label>
                                                <select
                                                    name="sweetness"
                                                    value={formData.sweetness}
                                                    onChange={handleInputChange}
                                                >
                                                    <option value="">Выберите сладость</option>
                                                    {sweetnessLevels.map((level, index) => (
                                                        <option key={index} value={level}>
                                                            {level}
                                                        </option>
                                                    ))}
                                                </select>
                                                {formErrors.sweetness && <span className="error-message">{formErrors.sweetness}</span>}
                                            </div>

                                            <div className="form-group">
                                                <label>Сорта винограда:</label>
                                                <input
                                                    type="text"
                                                    name="grape_varieties"
                                                    value={formData.grape_varieties}
                                                    onChange={handleInputChange}
                                                />
                                                {formErrors.grape_varieties && <span className="error-message">{formErrors.grape_varieties}</span>}
                                            </div>

                                            <div className="form-group">
                                                <label>Содержание алкоголя:</label>
                                                <input
                                                    type="number"
                                                    step="0.1"
                                                    name="alcohol_content"
                                                    value={formData.alcohol_content}
                                                    onChange={handleInputChange}
                                                />
                                                {formErrors.alcohol_content && <span className="error-message">{formErrors.alcohol_content}</span>}
                                            </div>

                                            <div className="form-group">
                                                <label>Содержание сахара:</label>
                                                <input
                                                    type="text"
                                                    name="sugar_content"
                                                    value={formData.sugar_content}
                                                    onChange={handleInputChange}
                                                />
                                                {formErrors.sugar_content && <span className="error-message">{formErrors.sugar_content}</span>}
                                            </div>

                                            <div className="form-group">
                                                <label>Импортер:</label>
                                                <input
                                                    type="text"
                                                    name="importer"
                                                    value={formData.importer}
                                                    onChange={handleInputChange}
                                                />
                                                {formErrors.importer && <span className="error-message">{formErrors.importer}</span>}
                                            </div>

                                            <div className="form-group">
                                                <label>Рейтинг:</label>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    max="10"
                                                    name="rating"
                                                    value={formData.rating}
                                                    onChange={handleInputChange}
                                                />
                                                {formErrors.rating && <span className="error-message">{formErrors.rating}</span>}
                                            </div>

                                            <div className="form-group">
                                                <label>Цвет/Вкус/Аромат:</label>
                                                <textarea
                                                    name="color_taste_aroma"
                                                    value={formData.color_taste_aroma}
                                                    onChange={handleInputChange}
                                                />
                                                {formErrors.color_taste_aroma && <span className="error-message">{formErrors.color_taste_aroma}</span>}
                                            </div>

                                            <div className="form-group">
                                                <label>Легенда:</label>
                                                <textarea
                                                    name="legend"
                                                    value={formData.legend}
                                                    onChange={handleInputChange}
                                                />
                                                {formErrors.legend && <span className="error-message">{formErrors.legend}</span>}
                                            </div>

                                            <div className="form-group">
                                                <label>Винификация:</label>
                                                <textarea
                                                    name="vinification"
                                                    value={formData.vinification}
                                                    onChange={handleInputChange}
                                                />
                                                {formErrors.vinification && <span className="error-message">{formErrors.vinification}</span>}
                                            </div>
                                        </>
                                    )}

                                    <div className="form-actions">
                                        <button type="submit" className="save-btn">
                                            {editingItem ? 'Обновить' : 'Сохранить'}
                                        </button>
                                        <button
                                            type="button"
                                            className="cancel-btn"
                                            onClick={() => {
                                                setShowAddForm(false);
                                                resetForm();
                                            }}
                                        >
                                            Закрыть
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        <table className="admin-items-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Название</th>
                                    <th>Год/Объем</th>
                                    <th>Цена</th>
                                    <th>Страна</th>
                                    {activeTab === 'wines' && <th>Цвет</th>}
                                    {activeTab === 'wines' && <th>Сладость</th>}
                                    <th>Действия</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(activeTab === 'wines' ? wines : whiskeys).map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{activeTab === 'wines' ? item.wine_name : item.whiskey_name}</td>
                                        <td>{activeTab === 'wines' ? item.wine_year_volume : item.whiskey_year_volume}</td>
                                        <td>{item.price}</td>
                                        <td>{item.country_manufacturer}</td>
                                        {activeTab === 'wines' && <td>{item.color}</td>}
                                        {activeTab === 'wines' && <td>{item.sweetness}</td>}
                                        <td>
                                            <button
                                                className="edit-btn"
                                                onClick={() => handleEditItem(item)}
                                            >
                                                Редактировать
                                            </button>
                                            <button
                                                className="delete-btn"
                                                onClick={() => handleDeleteItem(item.id)}
                                            >
                                                Удалить
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;