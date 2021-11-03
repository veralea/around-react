function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  return(
    <li className="card" >
      <button 
        type="button" 
        className="button card__delete-button" 
        aria-label="delete button"
        style={{display: "block"}}
      ></button>
      <img 
        className="card__picture" 
        src={props.card.link} 
        alt={props.card.name}
        onClick={handleClick}
      />
      <div className="card__caption">
        <p className="card__title">{props.card.name}</p>
        <div className="card__like-container">
          <button type="button" className="button card__like-button" aria-label="like button"></button>
          <span className="card__like-counter">{props.card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;