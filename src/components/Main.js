import { useState, useEffect, useContext } from 'react';
import { api } from "../utils/api";
import Card from './Card'; 
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const [cards , setCards] = useState([]);
  const currentUser = useContext(CurrentUserContext); 

  useEffect(() => {
    api.getCards()    
    .then((result) => {
        setCards(result);
    })
    .catch((err) => console.log(err))
  },[]);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    api.changeLikes(card._id, !isLiked ? "PUT" : "DELETE").then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  }

  function handleCardDelete(card) {

    api.deleteCard(card._id).then(() => {
      const newCards = cards.filter((c) => c._id !== card._id);
      setCards(newCards);
    });
    
    
  }

  return(
    <main className="main">
        <section className="profile">
            <div 
                className="profile__avatar" 
                onClick={props.onEditAvatarClick}
                style={{ backgroundImage: `url(${currentUser.avatar})` }}
            >
              <div className="profile__avatar-cover"></div>    
            </div>
            <div className="profile__title">
              <span className="profile__name">{currentUser.name}</span>
              <button className="button profile__edit-button" aria-label="edit button"
                  onClick={props.onEditProfileClick}>
              <div className="profile__edit-image"></div>
              </button>
            </div>
            <p className="profile__job">{currentUser.about}</p>
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
                    onCardClick={props.onCardClick}
                    onCardLike={(e) => handleCardLike(card)}
                    onCardDelete={(e) => handleCardDelete(card)}
                  />
                );
              })
            }
          </ul>
        </section>
    </main> 
  );

 
}

export default Main