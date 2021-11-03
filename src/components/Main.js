import { useState, useEffect } from 'react';
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/api";
import Card from './Card'; 

function Main(props) {
  const [userName, setUserName] = useState();
  const [userDescription, setUserDescription] = useState();
  const [userAvatar , setUserAvatar] = useState();
  const [cards , setCards] = useState([]);  

  useEffect(() => {
    api.getUserInfo()    
    .then((result) => {
        setUserName(result.name);
        setUserDescription(result.about);
        setUserAvatar(result.avatar);
    });
    
    api.getCards()    
    .then((result) => {
        setCards(result);
    })
  },[userName, userDescription, userAvatar]);

  return(
    <main className="main">
        <section className="profile">
            <div 
                className="profile__avatar" 
                onClick={props.onEditAvatarClick}
                style={{ backgroundImage: `url(${userAvatar})` }}
            >
              <div className="profile__avatar-cover"></div>    
            </div>
            <div className="profile__title">
              <span className="profile__name">{userName}</span>
              <button className="button profile__edit-button" aria-label="edit button"
                  onClick={props.onEditProfileClick}>
              <div className="profile__edit-image"></div>
              </button>
            </div>
            <p className="profile__job">{userDescription}</p>
            <button className="button profile__add-button" aria-label="add button" 
              onClick={props.onAddPlaceClick}>
              <div className="profile__add-image"></div>
            </button>
        </section>
        <section>
          <ul className="cards-grid">
            {
              cards.map((card) => {
                return(
                  <Card 
                    key={card._id} 
                    card={card} 
                    onCardClick={props.onCardClick}/>
                );
              })
            }
          </ul>
        </section>
        <PopupWithForm 
          name='update-avatar' 
          title='Change profile picture' 
          isOpen={props.isEditAvatarPopupOpen}
          onClose={props.onClose}
          children={
            <>
              <input type="url" className="popup__input" name="avatar" defaultValue="" placeholder="Avatar link" required />
              <span className="popup__error"></span>
            </>
          }         
        />
        <PopupWithForm 
          name='edit' 
          title='Edit profile' 
          isOpen={props.isEditProfilePopupOpen}
          onClose={props.onClose}
          children={
            <>
              <input type="text" className="popup__input"
                name="name" defaultValue="" minLength="2" maxLength="40" required />
              <span className="popup__error"></span>
              <input type="text" className="popup__input"
                name="job" defaultValue="" minLength="2" maxLength="200" required />
              <span className="popup__error"></span>
            </>
          }        
        />
        <PopupWithForm 
          name='add' 
          title='New place' 
          isOpen={props.isAddPlacePopupOpen}
          onClose={props.onClose}
          children={
            <>
              <input type="text" className="popup__input" name="name" defaultValue=""
                placeholder="Title" minLength="1" maxLength="30" required />
              <span className="popup__error"></span>
              <input type="url" className="popup__input" name="link" defaultValue="" placeholder="Image link" required />
              <span className="popup__error"></span>
            </>
          }
        />
        <PopupWithForm 
            name='delete' 
            title='Are you sure?' 
            isOpen={false}
            onClose={props.onClose}
        />
        <ImagePopup 
          src={props.selectedCard}
          isOpen={props.selectedCard ? true : false}
          onClose={props.onClose}
        />
    </main>     
  );

 
}

export default Main