import React from 'react';
import './FaveCard.scss';
import axios from 'axios';
import firebase from 'firebase';
import { ComposableMap } from 'react-simple-maps';

const API_URL = process.env.REACT_APP_API_URL;

class FaveCard extends React.Component{

   state={
      status:"To Visit",
      commentForm:false,
      statusClass:"fave-card__button-not-visited",
      commentPlaceholder:"Leave a comment"
   }

   callVisited=(id)=>{
      axios.put(`${API_URL}/userBucketList/${id}`)
      .then(res=>{
         this.setState({
            status:"Visited",
            commentForm:true,
            statusClass:"fave-card__button-visited"
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
   }

   sendComment=(e)=>{
      e.preventDefault();
      let province = this.props.province.replace(/ +/g, '')
      let userComment ={
         author:firebase.auth().currentUser.displayName,
         comment:e.target.comment.value
      }
      axios
         .post(`${API_URL}/${province}/${this.props.id}`, userComment)
         .then(response=>{
            console.log(response.data)
         })
         .catch(err=>console.log(err))
   }

   cancelComment=(e)=>{
      e.preventDefault();
      this.setState({
         commentForm:false
      })
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
               {this.state.commentForm && 
                  <form className="form"onSubmit={this.sendComment} >
                     <label className="form__label-comment">
                        Comment
                     </label>
                     <textarea className="form__input-comment"
                        name="comment"
                        placeholder={this.state.commentPlaceholder}
                     >
                     </textarea>
                     <button className="form__button-submit" 
                        type="submit">
                        Submit
                     </button>
                     <button className="form__button-cancel" onClick={this.cancelComment}>
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