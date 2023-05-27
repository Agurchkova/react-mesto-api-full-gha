import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import useFormWithValidation from "../hooks/useFormWithValidation";

function AddPlacePopup({ isOpen, onClose, onAddPlace, onLoading }) {

    const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();

    useEffect(() => {
        resetForm();
    }, [resetForm, isOpen]);

    function handleSubmit(event) {
        event.preventDefault();

        onAddPlace({
            name: values.name,
            link: values.link
        });
    };

    return (
        <PopupWithForm
            name="AddPlacePopup"
            title="Новое место"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            onLoading={onLoading}
            btnText="Создать"
            loadingTxt="Добавление..."
            isValid={isValid}
        >
            <label>
                <input
                    className="popup__input popup__input_type_nameAdd"
                    required
                    value={values.name || ''}
                    type="text"
                    placeholder="Название"
                    name="name"
                    minLength="2"
                    maxLength="30"
                    id="input-title"
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
                    className="popup__input popup__input_type_urlAdd"
                    value={values.link || ''}
                    type="url"
                    placeholder="Ссылка на картинку"
                    name="link"
                    id="input-url"
                    required
                    onChange={handleChange}
                />
                <span
                    className="popup__input-error"
                    id="input-name-error">
                    {errors.link}
                </span>
            </label>
        </PopupWithForm>
    );
};

export default AddPlacePopup;