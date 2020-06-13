import React from 'react';
import deleteIcon from '../../assets/delete.svg';
import './FaveCard.scss';

function FaveCard(props){
   return(
      <div className="fave-card">
         <h2 className="fave-car__name">
            {props.name}
         </h2>
         <img className="fave-card__image" 
            alt="image" 
            src={props.image}
         />
         <p className="fave-card__info">
            {props.province}, {props.country}
         </p>
         <img className="fave-card__delete-icon"
            alt="delete icon"
            src={deleteIcon}
         />
      </div>
   )
}

export default FaveCard;