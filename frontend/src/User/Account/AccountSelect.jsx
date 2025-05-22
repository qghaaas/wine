import {Link,  useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../../main.css'
import './AccountSelect.css'



export default function AccountSelect() {
    const navigate = useNavigate();
    const [accounts, setAccounts] = useState(
        JSON.parse(localStorage.getItem('savedAccounts')) || []
    );

    const handleAccountSelect = (email) => {
        navigate(`/Login?email=${encodeURIComponent(email)}`);
    };

    return (
        
        <section className='account-select'>
             <Link
                className='see-all log-reg-back'
                onClick={() => navigate(-1)}
            >
                <p>ПРОДОЛЖИТЬ ПОКУПКИ</p>
                <div></div>
            </Link>
            <div className="account-select-container">
                <h2>Выберите аккаунт</h2>
                <div className="accounts-list">
                    {accounts.map((account) => (
                        <button
                            key={account}
                            className="account-item"
                            onClick={() => handleAccountSelect(account)}
                        >
                            {account}
                        </button>
                    ))}
                </div>
                <button
                    className="new-account-button"
                    onClick={() => navigate('/Login')}
                >
                    Войти с другим аккаунтом
                </button>
            </div>
        </section>
    );
}