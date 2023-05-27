import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import useFormWithValidation from "../hooks/useFormWithValidation";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar,
    onLoading }) {

    const { handleChange, resetForm, errors, isValid } = useFormWithValidation();

    const avatarRef = useRef();

    useEffect(() => {
        avatarRef.current.value = '';
        resetForm();
    }, [resetForm, isOpen]);

    function handleSubmit(evt) {
        evt.preventDefault();

        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    return (
        <PopupWithForm
            name="EditAvatarPopup"
            title="Обновить аватар"
            btnText="Сохранить"
            loadingTxt="Сохранение..."
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            onLoading={onLoading}
            resetForm={resetForm}
            isValid={isValid}
        >
            <label>
                <input
                    className="popup__input popup__input_type_url"
                    type="url"
                    placeholder="Ссылка на картинку"
                    name="avatar"
                    id="input-avatar"
                    required
                    ref={avatarRef}
                    onInput={handleChange}
                />
                <span
                    className="popup__input-error"
                    id="input-avatar-error">
                    {errors.avatar}
                </span>
            </label>
        </PopupWithForm >
    );
};

export default EditAvatarPopup;