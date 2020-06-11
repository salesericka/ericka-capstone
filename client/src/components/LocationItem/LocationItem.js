import React from 'react';
import './LocationItem.scss';

class LocationItem extends React.Component {
  
  render(){
    return (
      <div className="location__item" id={this.props.id}>
         <h3 className="location__name">
            {this.props.name}
         </h3>
         <div className="location__image-wrapper">
            <img className="location__image" src={this.props.image} alt="image"/>
          </div>
         <p className="location_about">
           {/* {this.props.description} */}
         </p>
      </div>
    );
  }
}

export default LocationItem;