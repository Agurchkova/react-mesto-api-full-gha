import React from 'react';
import { Link } from 'react-router-dom';
import useFormWithValidation from '../hooks/useFormWithValidation';

function Register({ onRegister }) {
    const { values, handleChange, errors } = useFormWithValidation();

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onRegister(values);
    };

    return (
        <>
            <div className="auth">
                <h2 className="auth__title">Регистрация</h2>
                <form className="form auth__form"
                    onSubmit={handleSubmit}
                    noValidate>
                    <input
                        className="auth__input"
                        placeholder="Email"
                        type="email"
                        name="email"
                        id="email"
                        value={values.email || ''}
                        onChange={handleChange}
                        required
                        autoComplete="email"
                    />
                    <span className="auth__error">
                        {errors.email}
                    </span>
                    <input
                        className="auth__input"
                        placeholder="Пароль"
                        type="password"
                        name="password"
                        id="password"
                        value={values.password || ''}
                        onChange={handleChange}
                        minLength="8"
                        required
                        autoComplete="password"
                    />
                    <span className="auth__error">
                        {errors.password}
                    </span>
                    <button className="auth__button"
                        type="submit">
                        Зарегистрироваться
                    </button>
                </form>
            </div>
            <Link to="/sign-in"
                className="auth__link">
                Уже зарегистрированы? Войти
            </Link>
        </>
    );
};

export default Register;