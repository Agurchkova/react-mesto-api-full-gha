import React from "react";
import logoHeader from '../images/logo.svg';
import { Link, Routes, Route } from 'react-router-dom';

function Header({ userEmail, onSignOut }) {
      
    return (
        <header className="header">
            <img
                src={logoHeader}
                className="header__logo"
                alt="Логотип Место Россия"
            />
            <Routes>
                <Route
                    path='/sign-up'
                    element={
                        <Link to="/sign-in"
                            className="header__link"> Войти
                        </Link>}
                />
                <Route
                    path='/sign-in'
                    element={
                        <Link to="/sign-up"
                            className="header__link"> Регистрация
                        </Link>}
                />
                <Route path="/" element={
                    <>
                        <div className="header__auth">
                            <p className="header__email">
                                {userEmail}
                            </p>
                            <button className="header__button-sign-out"
                                onClick={() => onSignOut()}>
                                Выйти
                            </button>
                        </div>
                    </>
                } />
            </Routes>
        </header>
    );
}

export default Header;