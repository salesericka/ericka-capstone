import React from "react";
import { ComposableMap, Geographies, Geography,ZoomableGroup, Marker } from "react-simple-maps";
import './MapChart.scss';
import Canada from '../../canada_provinces.json';
import axios from 'axios';
import LocationItem from '../../components/LocationItem/LocationItem';

const api_key="apikey=5ae2e3f221c38a28845f05b64e8e68287f5f1fa674ffcd6265b510f1"
class MapChart extends React.Component{
   state={
      name:"",
      info:"",
      longitude:-79.347015,
      latitude:43.651070,
      position:{
         coordinates:[-79.347015,43.651070],
         zoom:3
      },
      markers:[]
    }

   callName=(data)=>{
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
      console.log("GEO DATA",data)
      axios
         .get(`https://api.opentripmap.com/0.1/en/places/bbox?lon_min=-82&lon_max=-79&lat_min=45&lat_max=51&kinds=geological_formations&limit=50&apikey=5ae2e3f221c38a28845f05b64e8e68287f5f1fa674ffcd6265b510f1
         `)
         .then(response=>{
            console.log("RESPONSE DATA", response.data.features)
            this.setState({
               markers:response.data.features
            })
         })
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

                     {this.state.markers.map(mark=>{
                        return <Marker coordinates={[mark.geometry.coordinates[0],mark.geometry.coordinates[1]]} key={mark.id}>
                           <circle r={1} fill="#black" />
                        </Marker>
                     })}
                  </ZoomableGroup>
               </ComposableMap>
            </div>
            <aside className="map__information">
               <h1>
                  {this.state.name}
               </h1>
               {this.state.markers.map(place=>{
                  return <LocationItem/>
               })}
               
            </aside>
       </main>
      )
   }
}

export default MapChart;
