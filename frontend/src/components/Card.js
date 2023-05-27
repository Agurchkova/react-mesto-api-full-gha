import React, { useContext } from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDeleteClick }) {
    const currentUser = useContext(CurrentUserContext);
    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner === currentUser._id;
    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some((i) => i === currentUser._id);
    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (
        `photo-gallery__like-button ${isLiked ? 'photo-gallery__like-button_active' : ''}`
    );

    function handleClick() {
        onCardClick(card);
    };

    function handleDeleteClick() {
        onCardDeleteClick(card._id);
    };

    function handleLikeClick() {
        onCardLike(card);
    };

    return (
        <figure className="photo-gallery__container">
            {isOwn && <button type="button"
                className="photo-gallery__trash-button button"
                onClick={handleDeleteClick}
            />
            }
            <button
                className="photo-gallery__item-button"
                type="button"
                aria-label="Увеличение картинки">
                <img
                    className="photo-gallery__item"
                    src={card.link}
                    alt={card.name}
                    onClick={handleClick} />
            </button>
            <figcaption className="photo-gallery__description">
                <h2 className="photo-gallery__title">{card.name}</h2>
                <div className="photo-gallery__likes-area">
                    <button
                        type="button"
                        className={cardLikeButtonClassName}
                        onClick={handleLikeClick}
                    />
                    <span
                        className="photo-gallery__like-counter">
                        {card.likes.length}
                    </span>
                </div>
            </figcaption>
        </figure>
    );
};

export default Card;