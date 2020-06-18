import React from 'react';
import './Header.scss';
import {Link} from 'react-router-dom';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import menu from '../../assets/bars-solid.svg';
import close from '../../assets/close.svg';
import axios from 'axios';

firebase.initializeApp({
  apiKey:"AIzaSyDC5y-XfZNA654X0Cs3PiSfPA9X3mkLVNE",
  authDomain:"capstone-22ea4.firebaseapp.com"
});
const API_URL = process.env.REACT_APP_API_URL;
class Header extends React.Component{
   state={
      signIn:false,
      showNav:false,
      headerClass:"header",
      headerIcon:menu
   }
  
   uiConfig = {
      signInFlow: "popup",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
         signInSuccessWithAuthResult: () => false
      }
   }
    
   componentDidMount=()=>{
      firebase.auth().onAuthStateChanged(user=>{
        this.setState({
          signIn:!!user
        })
        let userData={
         userId:user.uid,
         list:[]
         }
         axios
         .post(`${API_URL}/userBucketList/user`,userData)
         .then(res=>{
            console.log(res.data)
         })
         .catch(err=>{
            console.log(err)
         })
      })
   }

   // addUser=()=>{
   //    let userData={
   //       userId:firebase.auth().currentUser.uid,
   //       list:[]
   //    }
   //    axios
   //       .post(`${API_URL}/userBucketList/user`,userData)
   //       .then(res=>{
   //          console.log(res.data)
   //       })
   //       .catch(err=>{
   //          console.log(err)
   //       })
   // }

   callMenu=(e)=>{
      e.preventDefault();
      if(this.state.showNav === false){
         this.setState({
            showNav:true,
            headerClass:"header header__open",
            headerIcon:close
         })
      }else{
         this.setState({
            showNav:false,
            headerClass:"header",
            headerIcon:menu
         })
      }
   }

   render(){
   return(
      <header className={this.state.headerClass}>
         {this.state.signIn ? (
            <>
               <img className="header__icon-menu" 
               alt="menu"
               src={this.state.headerIcon}
               onClick={this.callMenu}
               />

            {this.state.showNav && 
               <nav className="nav">
                  <div className="nav__wrapper">
                     <div className="nav__user-wrap-photo">
                        <img src={firebase.auth().currentUser.photoURL} alt=" " className="nav__user-photo"/>
                     </div>
                     <Link to='/userpage' className="link">
                        <h4 className="nav__user">
                           {firebase.auth().currentUser.displayName}
                        </h4>
                     </Link>
                  </div>
                  <div className="nav__link-wrapper">
                     <Link to="/" className="link">
                        <h4 className="nav__homepage">
                           Home
                        </h4>
                     </Link>
                     <Link to="/location" className="link">
                        <h4 className="nav__location">
                           Location
                        </h4>
                     </Link>
                     <Link to="/userpage" className="link">
                        <h4 className="nav__user-list">
                           Bucket List
                        </h4>
                     </Link>
                  </div>
                  <div className="nav__button-wrapper">
                     <button className="nav__button nav__button-sign-out"
                        onClick={()=>firebase.auth().signOut()}>
                        Sign out
                     </button>
                  </div>
               </nav>
            }
            </>

            ) : (
               <>
                  <button className="nav__button nav__button-sign-in" 
                     onClick={this.callMenu}>
                     Sign-In
                  </button>
                  {this.state.showNav && 
                     <nav className="nav">
                        <h3 className="nav__sign-in-greeting">
                           Welcome Back!
                        </h3>
                        <StyledFirebaseAuth
                        uiConfig={this.uiConfig}
                        firebaseAuth={firebase.auth()}
                        />
                     </nav>
                  }
               </>
            )
         }
      </header>
   )
   }
}
export default Header;
export {API_URL};