import React from 'react';
import './Map.scss';
import ReactTooltip from 'react-tooltip';
import Canada from "@svg-maps/canada";
import { SVGMap } from "react-svg-map";
const API_KEY = "5ae2e3f221c38a28845f05b64e8e68287f5f1fa674ffcd6265b510f1"
class Map extends React.Component {
   state={
      province:"",
      open:false,
      id:""
   }

   hoverThis=(event)=>{
      let name = event.target.getAttribute("name")
      let id = event.target.getAttribute("id")
      console.log("id of:",name, id)
      this.setState({
         province:name,
         id:id
      })
   }

   hoverOut=(e)=>{
      this.setState({
         province:"",
      })
   }

   showTourism=()=>{
      if(this.state.open === false){
         this.setState({
            open:true
         })
      }else{
         this.setState({
            open:false
         })
      }
   }

  render(){
   return (
      <main className="location" >
         <div className="location__map">
            <SVGMap 
               map={Canada} 
               onLocationMouseOver={this.hoverThis} 
               onLocationMouseOut={this.hoverOut}
               onLocationClick={this.showTourism}
            />
         </div>

         {this.state.open && 
            <aside className="location__tourism">
               <h1 className="location__province">
                  {this.state.province}
               </h1>
               
               <div className="location__card">
                  <h3 className="location__destination">
                     {this.state.id}
                  </h3>
                  <p className="location__details">
                     Lorem ipsum....location details....
                     alkdfjsaklfjsdklfjasdklfjsdklf
                  </p>
               </div>
            </aside>
         }

      </main> 
   );
  }
}

export default Map;
