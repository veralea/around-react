import { useState, useEffect } from 'react';
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
    })
    .catch((err) => console.log(err));
    
    api.getCards()    
    .then((result) => {
        setCards(result);
    })
    .catch((err) => console.log(err))
  },[]);

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
    </main> 
  );

 
}

export default Main