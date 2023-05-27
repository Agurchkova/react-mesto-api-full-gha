import React, { useContext } from "react";
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick,
    onCardLike, onCardDeleteClick, cards }) {
    const currentUser = useContext(CurrentUserContext);
    const { name, about, avatar } = currentUser;

    return (
        <main className="page__content">
            <section className="profile">
                <img
                    className="profile__avatar"
                    src={avatar}
                    alt="Аватар профиля" />
                <button
                    className="profile__avatar-edit-button"
                    onClick={onEditAvatar} />
                <div className="profile__info">
                    <h1 className="profile__title">{name}</h1>
                    <p className="profile__subtitle">{about}</p>
                    <button
                        type="button"
                        className="profile__edit-button button"
                        aria-label="редактировать профиль"
                        onClick={onEditProfile} />
                </div>
                <button
                    type="button"
                    className="profile__add-button button"
                    aria-label="добавить фотографию"
                    onClick={onAddPlace} />
            </section>
            <section className="photo-gallery" aria-label="фото-галерея">
                <ul className="photo-gallery__items">
                    {cards.map((card) => {
                        return (
                            <Card
                                key={card._id}
                                card={card}
                                onCardClick={onCardClick}
                                onCardLike={onCardLike}
                                onCardDeleteClick={onCardDeleteClick}
                            />
                        )
                    }
                    )}
                </ul>
            </section>
        </main>
    );
}

export default Main;