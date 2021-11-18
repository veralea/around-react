import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlaceSubmit({
      name: e.target.elements.name.value,
      link: e.target.elements.link.value
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
      <input type="text" className="popup__input" name="name" defaultValue=""
        placeholder="Title" minLength="1" maxLength="30" required />
      <span className="popup__error"></span>
      <input type="url" className="popup__input" name="link" defaultValue="" placeholder="Image link" required />
      <span className="popup__error"></span>
    </PopupWithForm>  
  );
}

export default AddPlacePopup;