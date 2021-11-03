import '../App.css';
import { useState } from 'react';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

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
    setSelectedCard(card.link);
  }

  return (
    <div className="page">
      <div className="page__content">
        <Header />
        <Main 
          onEditProfileClick={handleEditProfileClick} 
          onAddPlaceClick={handleAddPlaceClick}
          onEditAvatarClick={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onClose={closeAllPopups}
          isEditProfilePopupOpen={isEditProfilePopupOpen}
          isAddPlacePopupOpen={isAddPlacePopupOpen}
          isEditAvatarPopupOpen={isEditAvatarPopupOpen}
          selectedCard={selectedCard}
        />
        <Footer />
      </div>
    </div>
  );
}

export default App;
