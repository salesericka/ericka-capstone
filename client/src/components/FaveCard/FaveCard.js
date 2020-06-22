import React from 'react';
import './FaveCard.scss';
import axios from 'axios';
import firebase from 'firebase';

const API_URL = process.env.REACT_APP_API_URL;

class FaveCard extends React.Component{

   state={
      status:"Mark as visited",
      commentForm:false,
      statusClass:"fave-card__button-not-visited",
      imageCard:true,
      userLat:"",
      userLong:""
   }

   callVisited=(id)=>{
      const userId = firebase.auth().currentUser.uid
      axios.put(`${API_URL}/userBucketList/user/${userId}/${id}`)
      .then(res=>{
         this.setState({
            status:"Visited",
            commentForm:true,
            statusClass:"fave-card__button-visited",
            imageCard:false
         })
      })
      .catch(err=>console.log(err))
   }
   
   checkCardStatus=()=>{
      if(this.props.statusVisit === true){
         this.setState({
            status:"Visited",
            statusClass:"fave-card__button-visited",
         })
      }
   }

   componentDidMount=()=>{
      this.checkCardStatus();
      if (navigator.geolocation) {
         navigator.geolocation.watchPosition((position)=>{
           this.setState({
              userLat:position.coords.latitude,
              userLong:position.coords.longitude
           })          
         });
       }
   }

   sendComment=(e)=>{
      e.preventDefault();
      let province = this.props.province.replace(/ +/g, '')
      let userComment ={
         author:firebase.auth().currentUser.displayName,
         authorImg:firebase.auth().currentUser.photoURL,
         comment:e.target.comment.value,
      }
      axios
         .post(`${API_URL}/${province}/${this.props.id}`, userComment)
         .then(response=>{
            
         })
         .catch(err=>console.log(err))
         e.target.comment.value=""
         this.setState({
            commentForm:false,
            imageCard:true
         })
   }

   cancelComment=(e)=>{
      e.preventDefault();
      this.setState({
         commentForm:false,
         imageCard:true
      })
   }

   distanceCalculator=(lat1, lon1, lat2, lon2, unit)=>{
      if ((lat1 == lat2) && (lon1 == lon2)) {
         return 0;
      }
      else {
         var radlat1 = Math.PI * lat1/180;
         var radlat2 = Math.PI * lat2/180;
         var theta = lon1-lon2;
         var radtheta = Math.PI * theta/180;
         var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
         if (dist > 1) {
            dist = 1;
         }
         dist = Math.acos(dist);
         dist = dist * 180/Math.PI;
         dist = dist * 60 * 1.1515;
         if (unit=="K") { dist = dist * 1.609344 }
         return dist;
      }
   }

   getDistance=()=>{
      return Math.round(this.distanceCalculator(this.state.userLat,this.state.userLong,this.props.lat,this.props.long,"K"))
   }

   render(){
      return(
         <div className="fave-card">
             <div className="fave-card__info-wrapper"> 
               <div className="fave-card__detail-wrapper">
                  <h3 className="fave-card__name">
                     {this.props.name}
                  </h3>
                  <h5 className="fave-card__info">
                     {this.props.province}, {this.props.country}
                  </h5>
                  <h5 className="fave-card__distance fave-card__info">
                     Distance: <span className="fave-card__distance-unit" >{this.getDistance()} km</span>
                  </h5>
               </div>
               <button className={this.state.statusClass}
               onClick={()=>this.callVisited(this.props.id)}>
                  {this.state.status}
               </button>
               <button className="fave-card__button-remove" 
                  onClick={()=>this.props.callDelete(this.props.id)}>
                  X
               </button>
               

            </div>
            <div className="fave-card__image-wrapper">
               {this.state.imageCard && <img className="fave-card__image" 
                  alt="scenery" 
                  src={this.props.image}
               />}
               
            </div>
           
               {this.state.commentForm && 
                  <form className="form" onSubmit={this.sendComment} >
                     <label className="form__label-comment">
                        Comment
                     </label>
                     <textarea className="form__input-comment"
                        name="comment"
                        placeholder="Leave a comment"
                     >
                     </textarea>
                     <button className="form__button form__button-submit" 
                        type="submit">
                        Submit
                     </button>
                     <button className="form__button form__button-cancel" onClick={this.cancelComment}>
                        Cancel
                     </button>
                  </form>
               }
         </div>
      )
   }
}

export default FaveCard;
export {API_URL};