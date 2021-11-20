import { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = useState();
  const [link, setLink] = useState();

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlaceSubmit({
      name: name,
      link: link
    })
  }
  
  return (
    <PopupWithForm 
      name='add' 
      title='New place' 
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText='Create'
      onSubmit={handleSubmit}
    >
      <input type="text" className="popup__input" name="name" defaultValue="" onChange = {handleNameChange}
        placeholder="Title" minLength="1" maxLength="30" required />
      <span className="popup__error"></span>
      <input type="url" className="popup__input" name="link" defaultValue="" onChange = {handleLinkChange}
        placeholder="Image link" required />
      <span className="popup__error"></span>
    </PopupWithForm>  
  );
}

export default AddPlacePopup;