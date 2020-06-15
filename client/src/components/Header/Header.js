import React from 'react';
import './Header.scss';
import {Link} from 'react-router-dom';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import menu from '../../assets/bars-solid.svg';
import {CSSTransition} from 'react-transition-group';

firebase.initializeApp({
  apiKey:"AIzaSyDC5y-XfZNA654X0Cs3PiSfPA9X3mkLVNE",
  authDomain:"capstone-22ea4.firebaseapp.com"
});

class Header extends React.Component{
   state={
      signIn:false,
      showNav:false,
      headerClass:"header"
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
        console.log("DATA", user)
      })
    }

    callMenu=(e)=>{
      e.preventDefault();
      if(this.state.showNav === false){
         this.setState({
            showNav:true,
            headerClass:"header header__open"
         })
      }else{
         this.setState({
            showNav:false,
            headerClass:"header"
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
               src={menu}
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
                  <button className="nav__button nav__button-sign-out"
                     onClick={()=>firebase.auth().signOut()}>
                     Sign out
                  </button>
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
                        <div className="nav__wrapper">
                           <h3 className="nav__sign-in-greeting">
                              Welcome Back!
                           </h3>
                           <p className="nav__sign-in-info">
                              Sign-In to Start
                           </p>
                           <StyledFirebaseAuth
                           uiConfig={this.uiConfig}
                           firebaseAuth={firebase.auth()}
                           />
                        </div>
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

