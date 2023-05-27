import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ConfirmationDltPopup from './ConfirmationDltPopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmationDltPopupOpen, setIsConfirmationDltPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [deletedItemId, setDeletedItemId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ message: '' });
  const navigate = useNavigate();

  const [isRegSuccessful, setIsRegSuccessful] = useState(false);
  const [authEmail, setAuthEmail] = useState('');

  useEffect(() => {
    handleTokenCheck()
  }, [])

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmationDltPopupOpen(false);
    setSelectedCard({});
    setIsInfoTooltipOpen(false);
  };

  const isOpen = isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard.link ||
    isConfirmationDltPopupOpen ||
    isInfoTooltipOpen;

  useEffect(() => {
    function closePopupByEsc(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) { // навешиваем только при открытии
      document.addEventListener('keydown', closePopupByEsc);
      return () => {
        document.removeEventListener('keydown', closePopupByEsc);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    function closeByClickOnOverlay(event) {
      if (event.target.classList.contains('popup_opened')) {
        closeAllPopups();
      }
    }
    if (isOpen) { // навешиваем только при открытии
      document.addEventListener('mousedown', closeByClickOnOverlay);
      return () => {
        document.removeEventListener('mousedown', closeByClickOnOverlay);
      }
    }
  }, [isOpen]);

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleInfoTooltip = () => {
    setIsInfoTooltipOpen(true);
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    const jwt = localStorage.getItem('jwt');
    api.changeLikeCardStatus(card._id, !isLiked, jwt)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  const handleCardDeleteClick = (itemId) => {
    setIsConfirmationDltPopupOpen(!isConfirmationDltPopupOpen);
    setDeletedItemId(itemId);
  };

  function handleCardDelete(itemId) {
    setIsLoading(true);
    const jwt = localStorage.getItem('jwt');
    api.deleteItem(itemId, jwt)
      .then(() => {
        setCards((cards) => cards.filter((card) => card._id !== itemId));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const handleUpdateUser = (newUserInfo) => {
    setIsLoading(true);
    const jwt = localStorage.getItem('jwt');
    api.editUserData(newUserInfo, jwt)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUpdateAvatar = (newData) => {
    setIsLoading(true);
    const jwt = localStorage.getItem('jwt');
    api.changeAvatar(newData, jwt)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleAddPlaceSubmit = (newData) => {
    setIsLoading(true);
    const jwt = localStorage.getItem('jwt');
    api.addItem(newData, jwt)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Регистрация и Авторизация профиля
  const handleRegisterSignUp = (data) => {
    return auth
      .registerSignUp(data)
      .then(() => {
        setIsRegSuccessful(true);
        setStatusMessage({ message: 'Вы успешно зарегистрировались!' });
        handleInfoTooltip();
        navigate('/sign-in', { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setIsRegSuccessful(false);
        setStatusMessage({ message: 'Что-то пошло не так! Попробуйте ещё раз' })
        handleInfoTooltip();
      });
  };

  const handleAuthorizeSignIn = (data) => {
    return auth
      .authorizeSignIn(data)
      .then((data) => {
        setLoggedIn(true);
        localStorage.setItem('jwt', data.token);
        handleTokenCheck();
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        setStatusMessage({ message: 'Что-то пошло не так! Попробуйте ещё раз' })
        handleInfoTooltip();
      });
  };

  // Выход
  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    navigate('/sign-in', { replace: true });
    setLoggedIn(false);
    setCurrentUser({});
    setAuthEmail('');
  };

  // Проверка токена
  const handleTokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      return;
    }
    auth
      .getContent(jwt)
      .then((data) => {
        setAuthEmail(data.email);
        setCurrentUser(data)
        setLoggedIn(true);
        navigate('/', { replace: true });
      })
      .catch((err) => console.log(err));
    api
      .getInitialCards(jwt)
      .then((initialCards) => {
        setCards(initialCards)
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (loggedIn) {
      navigate('/', { replace: true });
    }
  }, [loggedIn, navigate]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Header
        loggedIn={loggedIn}
        userEmail={authEmail}
        onSignOut={handleSignOut}
      />
      <Routes>
        <Route path="/sign-in"
          element={
            <>
              <Login onLogin={handleAuthorizeSignIn} />
            </>
          } />
        <Route path="/sign-up"
          element={
            <>
              <Register onRegister={handleRegisterSignUp} />
            </>
          } />
        <Route path="/"
          element={
            <>
              <ProtectedRoute
                component={Main}
                loggedIn={loggedIn}
                onEditProfile={() => setIsEditProfilePopupOpen(true)}
                onAddPlace={() => setIsAddPlacePopupOpen(true)}
                onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDeleteClick={handleCardDeleteClick}
                cards={cards}
              />
            </>
          }
        />
      </Routes>
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        onLoading={isLoading}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        onLoading={isLoading}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        onLoading={isLoading}
      />
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />
      <ConfirmationDltPopup
        isOpen={isConfirmationDltPopupOpen}
        onClose={closeAllPopups}
        onSubmit={handleCardDelete}
        card={deletedItemId}
        onLoading={isLoading}
      />
      <InfoTooltip
        onClose={closeAllPopups}
        isOpen={isInfoTooltipOpen}
        isSuccess={isRegSuccessful}
        statusMessage={statusMessage}
      />
      <Footer />
    </div>
  </CurrentUserContext.Provider>
  );
}

export default App;
