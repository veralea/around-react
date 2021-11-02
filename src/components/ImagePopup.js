function ImagePopup() {
    return(
      <section className="popup popup_type_img">
        <div className="popup__container">
            <button className="button popup__close-button" aria-label="close button"></button>
            <img className="popup__image" src="#" alt="no image" />
            <p className="popup__caption"></p>
        </div>
      </section>         
    );
}

export default ImagePopup;