import React from "react";
import { ComposableMap, Geographies, Geography,ZoomableGroup, Marker } from "react-simple-maps";
import './MapChart.scss';
import Canada from '../../canada_provinces.json';
const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

class MapChart extends React.Component{
   state={
      name:"",
      info:"",
      longitude:-79.347015,
      latitude:43.651070,
      position:{
         coordinates:[-79.347015,43.651070],
         zoom:3
      }
    }
   callName=(data)=>{
      console.log("name",data)
      this.setState({
         name:data.name,
         info:data.cartodb_id
      })
   }
   handleMoveEnd=(position)=>{
      this.setState({
         position:position
      })
   }

   callClick=(data)=>{
      console.log(data)
   }

   render(){
      return(
         <main className="map">
            <div className="map__container">
               <ComposableMap>
                  <ZoomableGroup zoom={this.state.position.zoom} center={this.state.position.coordinates} onMoveEnd={()=>this.handleMoveEnd}>
                     <Geographies geography={Canada}>
                        {({ geographies }) =>
                           geographies.map(geo => <Geography 
                              key={geo.rsmKey} 
                              geography={geo} 
                              onMouseDown={()=>this.callClick(geo)}
                              onMouseEnter={()=>this.callName(geo.properties)}
                              style={
                                 {
                                    default:{
                                       fill:"#3c4245"
                                    },
                                    hover:{
                                       fill:"#5F6769"
                                    }
                                 }
                              }
                              />)
                        }
                     </Geographies>
                     <Marker coordinates={[this.state.longitude,this.state.latitude]}>
                        <circle r={2} fill="#DFCDC3" />
                     </Marker>
                  </ZoomableGroup>
               </ComposableMap>
            </div>
            <aside className="map__information">
               <h1>
                  {this.state.name}
               </h1>
               <p>
                  {this.state.info}
               </p>
            </aside>
       </main>
      )
   }
}

export default MapChart;
