import React from 'react';
import './FaveCard.scss';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
class FaveCard extends React.Component{
   state={
      status:"To Visit",
      statusClass:"fave-card__button-not-visited"
   }

   callVisited=(id)=>{
      axios.put(`${API_URL}/userBucketList/${id}`)
      .then(res=>{
         this.setState({
            status:"Visited",
            statusClass:"fave-card__button-visited"
         })
      })
      .catch(err=>console.log(err))
   }
   
   checkCardStatus=()=>{
      if(this.props.statusVisit === true){
         this.setState({
            status:"Visited",
            statusClass:"fave-card__button-visited"
         })
      }
   }

   componentDidMount=()=>{
      this.checkCardStatus();
   }

   render(){
      return(
         <div className="fave-card">
            <img className="fave-card__image" 
               alt="scenery" 
               src={this.props.image}
            />
            <div className="fave-card__info-wrapper"> 
               <h3 className="fave-card__name">
                  {this.props.name}
               </h3>
               <p className="fave-card__info">
                  {this.props.province}, {this.props.country}
               </p>
               <button className="fave-card__button-remove" 
                  onClick={()=>this.props.callDelete(this.props.id)}>
                  Remove
               </button>
               <button className={this.state.statusClass}
               onClick={()=>this.callVisited(this.props.id)}>
                  {this.state.status}
               </button>
            </div>
         </div>
      )
   }
}

export default FaveCard;
export {API_URL};