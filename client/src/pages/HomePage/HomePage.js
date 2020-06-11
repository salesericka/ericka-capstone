import React from 'react';
import './HomePage.scss';
import ReactTooltip from 'react-tooltip';

function HomePage(){

   return(
      <>
      <h1>
         Home Page
      </h1>
      <div data-tip="data">
         Hello!!
      </div>
      <ReactTooltip/>
      </>
   )
}

export default HomePage;