import '../App.css';
import { useState, useEffect } from 'react';
import { api } from "../utils/api";
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
 

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
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
          />
          <PopupWithForm 
            name='update-avatar' 
            title='Change profile picture' 
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            buttonText='Save'
          >  
            <input type="url" className="popup__input" name="avatar" defaultValue="" placeholder="Avatar link" required />
            <span className="popup__error"></span>    
          </PopupWithForm>
          <PopupWithForm 
            name='edit' 
            title='Edit profile' 
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            buttonText='Save'
          >
            <input type="text" className="popup__input"
              name="name" defaultValue="" minLength="2" maxLength="40" required />
            <span className="popup__error"></span>
            <input type="text" className="popup__input"
              name="job" defaultValue="" minLength="2" maxLength="200" required />
            <span className="popup__error"></span>
          </PopupWithForm>
          <PopupWithForm 
            name='add' 
            title='New place' 
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            buttonText='Create'
          >
            <input type="text" className="popup__input" name="name" defaultValue=""
              placeholder="Title" minLength="1" maxLength="30" required />
            <span className="popup__error"></span>
            <input type="url" className="popup__input" name="link" defaultValue="" placeholder="Image link" required />
            <span className="popup__error"></span>
          </PopupWithForm>
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
