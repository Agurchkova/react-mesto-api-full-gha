import { useEffect } from "react";

function ConfirmationDltPopup({ isOpen, onClose, card, onSubmit, onLoading,
    onCloseEsc, onCloseOverlay }) {

    function handleConfirmiation(event) {
        event.preventDefault();
        onSubmit(card);
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', onCloseEsc);

            return () => {
                document.removeEventListener('keydown', onCloseEsc);
            };
        }
    }, [isOpen])

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', onCloseOverlay);

            return () => {
                document.removeEventListener('mousedown', onCloseOverlay);
            };
        }
    }, [isOpen])

    return (
        <div className={`popup popup_type_confirmation
        ${isOpen ? "popup_opened" : ""}`}>
            <div className="popup__container">
                <button
                    type="button"
                    className="popup__close-button button"
                    aria-label="Закрыть окно"
                    onClick={onClose} />
                <form
                    className="form popup__form"
                    name="confirmationForm"
                    onSubmit={handleConfirmiation}>
                    <h2 className="popup__title">Вы уверены?</h2>
                    <button
                        className="popup__save-button button"
                        type="submit" >
                        {onLoading ? "Удаление" : "Да"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ConfirmationDltPopup;