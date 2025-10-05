import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const { currentUser, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">Дневник путешествий</Link>
        <div className="navbar-nav ms-auto">
          {currentUser ? (
            <>
              <Link className="nav-link" to="/travel">Добавить</Link>
              <button className="btn btn-outline-secondary ms-2" onClick={logout}>
                Выйти
              </button>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/login">Войти</Link>
              <Link className="nav-link" to="/register">Регистрация</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;