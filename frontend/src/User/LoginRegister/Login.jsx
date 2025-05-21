import { useState } from 'react';
import axios from 'axios';
import './LoginRegister.css';
import showIcon from './img/showIcon.svg'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();


  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:3010/api/login', form);
      localStorage.setItem('token', res.data.token);
      alert('Вы успешно вошли!');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка входа');
    }


  };

  return (
    <section className='login-register'>
      <Link
        className='see-all log-reg-back'
        onClick={() => navigate(-1)}
      >
        <p>ПРОДОЛЖИТЬ ПОКУПКИ</p>
        <div></div>
      </Link>
      <div className="auth-container">
        <h2>Вход</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label className='auth-logreg-label' htmlFor="">Email</label>
          <input name="email" type="email" placeholder="wine@mail.com" onChange={handleChange} required />
          <label className='auth-logreg-label'>Пароль</label>
          <div className="password-field">
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="********"
              onChange={handleChange}
              required
            />
            <img
              src={showIcon}
              alt="Показать пароль"
              className="show-icon"
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
            />
          </div>
          <button type="submit" className="auth-button">Войти</button>
          {error && <p className="auth-error">{error}</p>}
        </form>
      </div>
    </section>
  );
}
