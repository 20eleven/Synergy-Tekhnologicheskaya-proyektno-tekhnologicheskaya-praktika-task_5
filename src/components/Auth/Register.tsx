import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = await register(username, password);
      if (success) {
        alert('Регистрация успешна! Войдите в систему.');
        navigate('/login');
      } else {
        alert('Пользователь с таким именем уже существует');
      }
    } catch (err) {
      alert('Ошибка регистрации');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="col-lg-5 col-md-7">
        <div className="card p-4 shadow">
          <h2 className="text-center">Регистрация</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Имя пользователя</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label>Пароль</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-success w-100" disabled={loading}>
              {loading ? 'Регистрация...' : 'Зарегистрироваться'}
            </button>
          </form>
          <p className="mt-3 text-center">
            Уже есть аккаунт? <a href="/login">Войти</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;