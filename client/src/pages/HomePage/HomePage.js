import React from 'react';
import './HomePage.scss';
import {Link} from 'react-router-dom';
class HomePage extends React.Component{
   render(){
      return(
         <main className="home">
            <Link to ="/location">
               <h1 className="home__start">
                  Start Exploring

               </h1>
            </Link>
         </main>
      )  
   }
}
export default HomePage;