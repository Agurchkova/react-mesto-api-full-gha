function ImagePopup({ card, onClose }) {

  return (
      <div className={`popup popup_type_big-image ${card.link ? "popup_opened" : ""}`}>
          <figure className="popup__container-image">
              <img src={card.link}
                  className="popup__big-image"
                  alt={card.name}
              />
              <figcaption
                  className="popup__image-caption">
                  {card.name}
              </figcaption>
              <button
                  type="button"
                  className="popup__close-button button"
                  aria-label="Закрыть окно"
                  name="closebigimage"
                  onClick={onClose}>
              </button>
          </figure>
      </div>
  );
};

export default ImagePopup;