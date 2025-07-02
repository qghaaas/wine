import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('adminToken');
                if (!token) {
                    navigate('/admin');
                    return;
                }

                const response = await fetch('http://localhost:3010/api/admin/users', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Ошибка при загрузке пользователей');
                }

                const data = await response.json();
                setUsers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin');
    };

    if (loading) return <div className="loading-message">Loading...</div>;

    return (
        <div className="admin-dashboard-container">
            <div className="admin-dashboard-header">
                <h2 className="admin-dashboard-title">Admin Dashboard</h2>
                <button onClick={handleLogout} className="admin-dashboard-logout">
                    Logout
                </button>
            </div>

            {error && <p className="admin-dashboard-error">{error}</p>}

            <h3 className="admin-users-title">Registered Users</h3>
            <table className="admin-users-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
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
        </div>
    );
};

export default AdminDashboard;