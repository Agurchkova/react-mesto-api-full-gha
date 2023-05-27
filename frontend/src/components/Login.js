import React from 'react';
import useFormWithValidation from '../hooks/useFormWithValidation';

function Login({ onLogin }) {
    const { values, handleChange, errors } = useFormWithValidation({});

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (!values.email || !values.password) {
            return;
        }
        onLogin(values);
    };

    return (
        <div className="auth">
            <h2 className="auth__title">Вход</h2>
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
                    Войти
                </button>
            </form>
        </div >
    );
};

export default Login;
