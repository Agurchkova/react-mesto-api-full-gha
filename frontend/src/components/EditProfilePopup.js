import React, { useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import useFormWithValidation from "../hooks/useFormWithValidation";

function EditProfilePopup({ isOpen, onClose, onUpdateUser,
    onLoading }) {

    const currentUser = useContext(CurrentUserContext);
    const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();

    useEffect(() => {
        currentUser ? resetForm(currentUser) : resetForm();
    }, [currentUser, resetForm, isOpen]);

    function handleSubmit(e) {

        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name: values.name,
            about: values.about
        });
    }

    return (
        <PopupWithForm
            name="EditProfilePopup"
            title="Редактировать профиль"
            btnText="Сохранить"
            loadingTxt="Сохранение..."
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            onLoading={onLoading}
            isValid={isValid}
        >
            <label>
                <input
                    className="popup__input popup__input_type_name"
                    type="text"
                    placeholder="Имя"
                    name="name"
                    minLength="2"
                    maxLength="40"
                    id="input-name"
                    required
                    value={values.name || ''}
                    onChange={handleChange}
                />
                <span
                    className="popup__input-error"
                    id="input-name-error">
                    {errors.name}
                </span>
            </label>
            <label>
                <input
                    className="popup__input popup__input_type_job"
                    type="text"
                    placeholder="Профессия"
                    name="about"
                    minLength="2"
                    maxLength="200"
                    id="input-job"
                    required
                    value={values.about || ''}
                    onChange={handleChange}
                />
                <span
                    className="popup__input-error"
                    id="input-job-error">
                    {errors.about}
                </span>
            </label>
        </PopupWithForm >
    );
};

export default EditProfilePopup;