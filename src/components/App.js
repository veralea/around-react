import '../App.css';
import { useState, useEffect } from 'react';
import api from "../utils/api";
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [cards , setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState(
    {
      name: 'Vera Lea', 
      about: 'Teacher', 
      avatar: 'https://cdn.pixabay.com/photo/2018/01/17/07/06/laptop-3087585_960_720.jpg', 
      _id: 'c77e00360c598eb801029d0f', 
      cohort: 'group-12'
    }
  );

  useEffect(() => {
    api.getCards()    
    .then((result) => {
        setCards(result);
    })
    .catch((err) => console.log(err))
  },[]);

  useEffect(() => {
    api.getUserInfo()    
    .then((result) => {
      setCurrentUser(result); 
    })
    .catch((err) => console.log(err));
  },[]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser({name, about}) {
    api.setUserInfo({name, about})
    .then((result) => {
      setCurrentUser(result);
      closeAllPopups();
    })
    .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(avatar) {
    api.setUserAvatar(avatar)
    .then((result) => {
      setCurrentUser(result);
      closeAllPopups();    
    })
    .catch((err) => console.log(err));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikes(card._id, !isLiked ? "PUT" : "DELETE").then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      const newCards = cards.filter((c) => c._id !== card._id);
      setCards(newCards);
    })
    .catch((err) => console.log(err));   
  }

  function handleAddPlaceSubmit(cardData) {
    
    api.addNewCard({cardData})
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => console.log(err));
  }

  return (
    <div className="page">
      <div className="page__content">
        <CurrentUserContext.Provider value={currentUser}>
          <Header />
          <Main 
            onEditProfileClick={handleEditProfileClick} 
            onAddPlaceClick={handleAddPlaceClick}
            onEditAvatarClick={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <EditAvatarPopup 
            isOpen={isEditAvatarPopupOpen} 
            onClose={closeAllPopups} 
            onUpdateAvatar={handleUpdateAvatar}
          />
          <EditProfilePopup 
            isOpen={isEditProfilePopupOpen} 
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup 
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlaceSubmit={handleAddPlaceSubmit}
          /> 
          <PopupWithForm 
              name='delete' 
              title='Are you sure?' 
              isOpen={false}
              onClose={closeAllPopups}
              buttonText='Yes'
          />
          <ImagePopup 
            card={selectedCard}
            isOpen={selectedCard ? true : false}
            onClose={closeAllPopups}
          />          
          <Footer />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
