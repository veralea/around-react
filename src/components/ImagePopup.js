function ImagePopup(props) {
    return(
      <section 
        className={`popup popup_type_img ${props.isOpen ? 'popup_opened' : ''}`}
      >
        <div className="popup__container">
            <button 
              className="button popup__close-button" 
              aria-label="close button"
              onClick={props.onClose}
            ></button>
            <img className="popup__image" src={props.src} alt="no image" />
            <p className="popup__caption"></p>
        </div>
      </section>         
    );
}

export default ImagePopup;