import React from 'react';
import './FaveCard.scss';

function FaveCard(props){
   return(
      <div className="fave-card">
         <img className="fave-card__image" 
            alt="image" 
            src={props.image}
         />
         <div className="fave-card__info-wrapper"> 
            <h3 className="fave-card__name">
               {props.name}
            </h3>
            <p className="fave-card__info">
               {props.province}, {props.country}
            </p>
            <button className="fave-card__button" 
               onClick={()=>props.callDelete(props.id)}>
               Remove
            </button>
         </div>
      </div>
   )
}

export default FaveCard;