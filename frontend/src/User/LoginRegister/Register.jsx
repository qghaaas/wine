import { useState } from 'react';
import axios from 'axios';
import './LoginRegister.css';
import showIcon from './img/showIcon.svg'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


export default function Register() {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const validatePassword = password => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { password, confirmPassword } = form;

    if (!agree) return setError('Вы должны согласиться с условиями использования');
    if (password !== confirmPassword) return setError('Пароли не совпадают');
    if (!validatePassword(password)) {
      return setError('Пароль должен быть не менее 8 символов, содержать заглавную, строчную букву и спецсимвол');
    }

    try {
      await axios.post('http://localhost:3010/api/register', form);
      alert('Регистрация успешна!');
      navigate('/');

      setForm({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      setAgree(false);
    } catch (err) {
      if (err.response?.status === 400) {
        setError('Пользователь с таким email уже существует');
      } else {
        setError('Ошибка регистрации');
      }
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
        <h2>Регистрация</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label className='auth-logreg-label' htmlFor="">Имя</label>
          <input name="first_name" placeholder="Егор" onChange={handleChange} required />
          <label className='auth-logreg-label' htmlFor="">Фамилия</label>
          <input name="last_name" placeholder="Кешин" onChange={handleChange} required />
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

          <label className='auth-logreg-label'>Повторите пароль</label>
          <div className="password-field">
            <input
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              placeholder="********"
              onChange={handleChange}
              required
            />
          </div>


          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="agree"
              checked={agree}
              onChange={e => setAgree(e.target.checked)}
            />
            <label htmlFor="agree">
              Я соглашаюсь с{' '}
              <a href="#" target="_blank" rel="noopener noreferrer">условиями использования</a>
            </label>
          </div>
          <button type="submit" className="auth-button">Зарегистрироваться</button>
          {error && <p className="auth-error">{error}</p>}
        </form>
      </div>
    </section>
  );
}




