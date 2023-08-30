import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupWithForm from "./PopupWithForm";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export default function Desktop(props) {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeletingAvatarPopupOpen, setIsDeletingAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [deletingCard, setDeletingCard] = React.useState(null);

  const currentUser = React.useContext(CurrentUserContext)

  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletingAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard(null);
  };
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  };
  const handleCardDelete = (card) => {
    setDeletingCard(card);
    setIsDeletingAvatarPopupOpen(true);
  };

  const handleCardDestroy = (event) => {
    event.preventDefault();
    props.onCardDestroy(deletingCard._id, () => {
      setDeletingCard(null);
      closeAllPopups();
    });
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    props.onCardLike(card._id, !isLiked)
  }

  const handleUpdateUser = (user) => {
    props.onUpdateUser(user, () => {
      closeAllPopups();
    })
  }

  const handleUpdateAvatar = (url) => {
    props.onUpdateUserAvatar(url, (newUser) => {
      closeAllPopups();
    })
  }

  const handleAddPlaceSubmit = (card) => {
    props.onAddPlaceSubmit(card, () => {
      closeAllPopups();
    })
  }

  const handleLogout = (event) => {
    event.preventDefault();
    props.onLogout();
  }

  return (
    <React.Fragment>
      <div className="page">
        <Header email={currentUser.email}>
          <a href="#" onClick={handleLogout}>Выйти</a>
        </Header>
        <Main
          cards={props.cards}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          handleCardClick={handleCardClick}
          handleCardLike={handleCardLike}
          handleCardDelete={handleCardDelete}
        />
        <Footer/>
      </div>
      <EditProfilePopup
        buttonText={props.isSaving ? 'Сохраняется...' : 'Сохранить'}
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <AddPlacePopup
        buttonText={props.isSaving ? 'Сохраняется...' : 'Сохранить'}
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}/>
      <PopupWithForm
        title="Вы уверены?"
        name="confirm"
        buttonText={props.isSaving ? 'Удаляется...' : 'Да'}
        isOpen={isDeletingAvatarPopupOpen}
        onClose={closeAllPopups}
        onSubmit={handleCardDestroy}
      />
      <EditAvatarPopup
        buttonText={props.isSaving ? 'Сохраняется...' : 'Сохранить'}
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <ImagePopup isOpen={isImagePopupOpen} card={selectedCard} onClose={closeAllPopups}/>
    </React.Fragment>
  );
}
