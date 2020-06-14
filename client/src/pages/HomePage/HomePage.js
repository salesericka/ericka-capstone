import React from 'react';
import './HomePage.scss';
import {Link} from 'react-router-dom';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Modal from 'react-modal';

Modal.setAppElement('#root');

firebase.initializeApp({
  apiKey:"AIzaSyDC5y-XfZNA654X0Cs3PiSfPA9X3mkLVNE",
  authDomain:"capstone-22ea4.firebaseapp.com"
});

class HomePage extends React.Component{

   state={
      signIn:false,
      showModal:false,
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
  
    handleModal=()=>{
      this.setState({
        showModal:!this.state.showModal
      })
    }
    redirectUser=()=>{
       window.location.pathname="/location"
    }
   render(){
      return(
         <main className="home">

            <h1 className="home__start"
               onClick={this.handleModal}>
               Start Exploring
            </h1>

            <Modal
               isOpen={this.state.showModal}
               onRequestClose={this.handleModal}
               className="modal"
            >
               {this.state.signIn ? (
               <>
                  {/* {this.redirectUser()} */}
               </>
               
               ) : (
                  <div className="sign-in">   
                     <StyledFirebaseAuth
                     uiConfig={this.uiConfig}
                     firebaseAuth={firebase.auth()}
                     />      
                  </div>
                  )
               }
            </Modal>
            <button onClick={()=>firebase.auth().signOut()}>
                  Sign out
                  </button>

         </main>

      )  
   }
}
// <h2>
// Welcome {firebase.auth().currentUser.displayName}
// </h2>
export default HomePage;